import type {
  StudySessionCreateModel,
  StudySessionModel,
  StudySessionResultCreateModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

export const StudySessionService = {
  async createStudySession(
    payload: StudySessionCreateModel,
  ): Promise<StudySessionModel> {
    try {
      const response = await usersClient.postApiUsersMeStudySessions(payload);
      if (!response.data) {
        throw new Error("Study session response is empty.");
      }

      return response.data;
    } catch (error) {
      return toErrorCode(error);
    }
  },

  async submitStudySessionResult(
    sessionId: string,
    payload: StudySessionResultCreateModel,
  ): Promise<void> {
    try {
      await usersClient.postApiUsersMeStudySessionsSessionIdResults(
        sessionId,
        payload,
      );
    } catch (error) {
      return toErrorCode(error);
    }
  },
};
