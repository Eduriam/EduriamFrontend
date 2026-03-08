import { Modify } from "domain/models/utils/modify";
import { parseQueryParams } from "util/functions/api";

import API, { FetchHook } from "infrastructure/api/API";
import useAuthenticatedAPI from "infrastructure/api/hooks/useAuthenticatedAPI";

import { Topic } from "./Topics";

export interface TopicParams {
  category?: "main" | "extra";
}

const TopicsAPI = {
  URI: (courseId: Id) => `user/courses/${courseId}/topics`,

  useTopics(
    courseId: Id,
    params: TopicParams = {},
  ): Modify<FetchHook<Array<Topic>>, { topics: Array<Topic> }> {
    const { data, ...rest } = useAuthenticatedAPI<Array<Topic>>(
      `${this.URI(courseId)}?${parseQueryParams(params)}`,
    );
    return { topics: data, ...rest };
  },

  async enableTopic(courseId: Id, topicId: Id): Promise<void> {
    return API.put(`${this.URI(courseId)}/${topicId}`, {});
  },

  async disableTopic(courseId: Id, topicId: Id): Promise<void> {
    return API.delete(`${this.URI(courseId)}/${topicId}`);
  },
};

export default TopicsAPI;


