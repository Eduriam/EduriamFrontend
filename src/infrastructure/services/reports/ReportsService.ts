import type { Id } from "domain/models/types/core";

import { getReports } from "infrastructure/api/generated/reports/reports";
import {
  ReportProblemType,
  ReportType,
  type CreateReportContextModel,
  type CreateReportModel,
} from "infrastructure/api/generated/models";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const reportsClient = getReports();

export interface ReportStudyBlockContext {
  studyBlockId: Id;
  userAnswer: string;
}

export interface ReportPayload {
  type: ReportType;
  problemTypeId: ReportProblemType;
  description?: string;
  context?: ReportStudyBlockContext;
}

const REPORT_PROBLEM_TYPE_VALUES = new Set<number>(
  Object.values(ReportProblemType),
);

export function parseReportProblemType(
  problemTypeId: string,
): ReportProblemType {
  const parsed = Number(problemTypeId);

  if (
    !Number.isInteger(parsed) ||
    !REPORT_PROBLEM_TYPE_VALUES.has(parsed)
  ) {
    throw new Error(`Unsupported report problem type: ${problemTypeId}`);
  }

  return parsed as ReportProblemType;
}

const toCreateReportContextModel = (
  context?: ReportStudyBlockContext,
): CreateReportContextModel | undefined => {
  if (!context) {
    return undefined;
  }

  return {
    studyBlockId: context.studyBlockId,
    // Generated model requires at least one character.
    answer: context.userAnswer?.trim().length ? context.userAnswer : " ",
  };
};

const toCreateReportModel = (payload: ReportPayload): CreateReportModel => {
  const context = toCreateReportContextModel(payload.context);

  return {
    type: payload.type,
    problemTypeId: payload.problemTypeId,
    ...(context ? { context } : {}),
  };
};

export class ReportsService {
  static async submitReport(payload: ReportPayload): Promise<void> {
    try {
      await reportsClient.postApiReports(toCreateReportModel(payload));
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
