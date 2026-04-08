import { Modify } from "domain/models/utils/modify";

import { FetchHook } from "infrastructure/api/API";
import type {
  StudySessionCreateModel,
  StudySessionModel,
  StudySessionResultCreateModel,
} from "infrastructure/api/generated/models";
import { getUsers } from "infrastructure/api/generated/users/users";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";
import { toErrorCode } from "infrastructure/services/utils/toErrorCode";

const usersClient = getUsers();

const buildStudySessionKey = (payload: StudySessionCreateModel): string => {
  const query = new URLSearchParams();

  if (payload.lessonId !== null && payload.lessonId !== undefined) {
    query.set("lessonId", String(payload.lessonId));
  }

  if (payload.courseId !== null && payload.courseId !== undefined) {
    query.set("courseId", String(payload.courseId));
  }

  if (payload.mode !== null && payload.mode !== undefined) {
    query.set("mode", String(payload.mode));
  }

  const queryParams = query.toString();
  return queryParams
    ? `users/me/study-sessions?${queryParams}`
    : "users/me/study-sessions";
};

const useStudySessionQuery = (
  payload: StudySessionCreateModel,
): Modify<FetchHook<StudySessionModel>, { studySession: StudySessionModel }> => {
  const { data, ...rest } = useAuthenticatedAPI<StudySessionModel>(
    buildStudySessionKey(payload),
    async () => StudySessionService.createStudySession(payload),
  );

  return { studySession: data, ...rest };
};

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

  useStudySession(
    payload: StudySessionCreateModel,
  ): Modify<FetchHook<StudySessionModel>, { studySession: StudySessionModel }> {
    return useStudySessionQuery(payload);
  },
};
