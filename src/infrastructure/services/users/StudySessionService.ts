import type {
  StudySessionCreateModel,
  StudySessionModel,
  StudySessionResultCreateModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import { invalidateCurrentUser } from "infrastructure/services/users/currentUserState";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const createStudySessionRequests = new Map<
  string,
  Promise<StudySessionModel>
>();

const getStudySessionRequestKey = (payload: StudySessionCreateModel): string =>
  JSON.stringify({
    courseId: payload.courseId ?? null,
    lessonId: payload.lessonId ?? null,
    mode: payload.mode ?? null,
  });

export const StudySessionService = {
  createStudySession(
    payload: StudySessionCreateModel,
  ): Promise<StudySessionModel> {
    const requestKey = getStudySessionRequestKey(payload);
    const existingRequest = createStudySessionRequests.get(requestKey);

    if (existingRequest) {
      return existingRequest;
    }

    const request = (async () => {
      try {
        const response = await usersClient.postApiUsersMeStudySessions(payload);
        if (!response.data) {
          throw new Error("Study session response is empty.");
        }

        await invalidateCurrentUser();
        return response.data;
      } catch (error) {
        return toErrorCode(error);
      } finally {
        createStudySessionRequests.delete(requestKey);
      }
    })();

    createStudySessionRequests.set(requestKey, request);
    return request;
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
      await invalidateCurrentUser();
    } catch (error) {
      return toErrorCode(error);
    }
  },
};
