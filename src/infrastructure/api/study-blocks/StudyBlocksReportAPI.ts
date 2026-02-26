import API from "infrastructure/api/API";

export interface StudyBlockReportBody {
  problemTypeId: string;
  description: string;
}

const StudyBlocksReportAPI = {
  URI: (studyBlockId: Id) => `study-blocks/${studyBlockId}/report`,

  async reportStudyBlock(
    studyBlockId: Id,
    payload: StudyBlockReportBody,
  ): Promise<void> {
    await API.post(this.URI(studyBlockId), payload);
  },
};

export default StudyBlocksReportAPI;

