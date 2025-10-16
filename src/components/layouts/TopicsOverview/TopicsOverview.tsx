import { TabBarPanel } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useState } from "react";

import Box from "@mui/material/Box";

import TopicList from "components/atoms/lists/TopicList/TopicList";

import { optimisticMutationOption } from "infrastructure/api/API";
import { Topic } from "infrastructure/api/user/topics/Topics";
import TopicsAPI from "infrastructure/api/user/topics/TopicsAPI";

export interface ITopicsOverview {
  courseId: Id;
}

const TopicsOverview: React.FC<ITopicsOverview> = ({ courseId }) => {
  const { t } = useTranslation("common");
  const [value, setValue] = useState<string>("main");
  const { topics: mainTopics, mutate: mutateMainTopics } = TopicsAPI.useTopics(
    courseId,
    { category: "main" },
  );
  const { topics: extraTopics, mutate: mutateExtraTopics } =
    TopicsAPI.useTopics(courseId, { category: "extra" });

  const updateMainTopics = (topicId: Id, enabled: boolean) => {
    const newTopics = mainTopics.map((topic) => {
      if (topic.id === topicId) {
        return { ...topic, enabled };
      } else {
        return topic;
      }
    });

    mutateMainTopics(async () => {
      try {
        if (enabled) {
          await TopicsAPI.enableTopic(courseId, topicId);
        } else {
          await TopicsAPI.disableTopic(courseId, topicId);
        }
      } catch (err) {
        return Promise.reject(err);
      }

      return newTopics;
    }, optimisticMutationOption<Array<Topic>>(newTopics));
  };

  const updateExtraTopics = (topicId: Id, enabled: boolean) => {
    const newTopics = mainTopics.map((topic) => {
      if (topic.id === topicId) {
        return { ...topic, enabled };
      } else {
        return topic;
      }
    });

    mutateExtraTopics(async () => {
      try {
        if (enabled) {
          await TopicsAPI.enableTopic(courseId, topicId);
        } else {
          await TopicsAPI.disableTopic(courseId, topicId);
        }
      } catch (err) {
        return Promise.reject(err);
      }

      return newTopics;
    }, optimisticMutationOption<Array<Topic>>(newTopics));
  };

  return (
    <>
      {courseId ? (
        <Box sx={{ width: "100%" }}>
          <TabBarPanel
            onChange={(value) => setValue(value as string)}
            tabs={[
              {
                id: "main",
                name: t("topics.main"),
              },
              {
                id: "extra",
                name: t("topics.extra"),
              },
            ]}
            panelContent={
              value === "main"
                ? mainTopics && (
                    <TopicList
                      topics={mainTopics}
                      onTopicChange={(id, enabled) =>
                        updateMainTopics(id, enabled)
                      }
                    />
                  )
                : value === "extra"
                  ? extraTopics && (
                      <TopicList
                        topics={extraTopics}
                        onTopicChange={(id, enabled) =>
                          updateExtraTopics(id, enabled)
                        }
                      />
                    )
                  : undefined
            }
            value={value}
          />
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default TopicsOverview;
