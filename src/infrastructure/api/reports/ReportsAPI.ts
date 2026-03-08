import API from "infrastructure/api/API";

export type ReportType = "GENERAL" | "STUDY_BLOCK";

// Union type of report contexts
export type ReportContext = ReportStudyBlockContext;

export interface ReportStudyBlockContext {
  studyBlockId: Id;
  userAnswer: string;
}

export interface ReportPayload {
  type: ReportType;
  problemTypeId: string;
  description?: string;
  context?: ReportContext;
}

const ReportsAPI = {
  URI: "reports",

  async submitReport(payload: ReportPayload): Promise<void> {
    await API.post(this.URI, payload);
  },
};

export default ReportsAPI;
