import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import { Topic } from "infrastructure/api/user/topics/Topics";

import CardList from "../CardList/CardList";

export interface ITopicList {
  topics: Array<Topic>;
  onTopicChange: (topicId: Id, enabled: boolean) => void;
}

const TopicList: React.FC<ITopicList> = ({ topics, onTopicChange }) => {
  return (
    <CardList>
      {topics.map((topic) => {
        return (
          <ListItem
            key={topic.id}
            secondaryAction={
              <Switch
                checked={topic.enabled}
                onClick={() => onTopicChange(topic.id, !topic.enabled)}
              />
            }
          >
            <ListItemText primary={topic.name} />
          </ListItem>
        );
      })}
    </CardList>
  );
};

export default TopicList;
