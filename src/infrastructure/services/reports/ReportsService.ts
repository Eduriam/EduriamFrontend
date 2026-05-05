import { getReports } from "infrastructure/api/generated/reports/reports";
import {
  ReportProblemType,
  type CreateReportModel,
} from "infrastructure/api/generated/models";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const reportsClient = getReports();

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

export class ReportsService {
  static async submitReport(payload: CreateReportModel): Promise<void> {
    try {
      await reportsClient.postApiReports(payload);
    } catch (error) {
      return toErrorCode(error);
    }
  }
}
