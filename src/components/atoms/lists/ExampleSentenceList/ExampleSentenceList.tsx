import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import ListenIconButton from "components/atoms/ListenIconButton/ListenIconButton";

import { ExampleSentence } from "infrastructure/api/user/courses/lesson-items/LessonItems";

import CardList from "../CardList/CardList";

export interface IExampleSentenceList {
  items: Array<ExampleSentence>;
}

const ExampleSentenceList: React.FC<IExampleSentenceList> = ({ items }) => {
  return (
    <CardList>
      {items.map((item) => {
        return (
          <ListItem
            key={item.id}
            secondaryAction={
              item.audioUrl ? (
                <ListenIconButton audioLink={item.audioUrl} />
              ) : undefined
            }
            sx={{ px: 2 }}
          >
            <ListItemText primary={item.textL2} secondary={item.textL1} />
          </ListItem>
        );
      })}
    </CardList>
  );
};

export default ExampleSentenceList;
