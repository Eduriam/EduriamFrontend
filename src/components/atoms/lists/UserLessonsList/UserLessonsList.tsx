import { Icon } from "@eduriam/ui-core";

import { useRouter } from "next/navigation";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CardList from "../CardList/CardList";

export interface ListItem {
  id: Id;
  url: string;
  name: string;
  secondaryName?: string;
  imageUrl?: string;
}

export interface IUserLessonsList {
  lessons: Array<ListItem>;
}

const UserLessonsList: React.FC<IUserLessonsList> = ({ lessons }) => {
  const router = useRouter();

  return (
    <CardList>
      {lessons.map((link) => {
        return (
          <ListItem
            key={link.id}
            secondaryAction={
              <IconButton
                onClick={() => router.push(`/lessons/${link.id}/update`)}
              >
                <Icon name="settings" />
              </IconButton>
            }
          >
            <ListItemButton component="a" onClick={() => router.push(link.url)}>
              {link.imageUrl && (
                <ListItemAvatar>
                  <Avatar src={link.imageUrl} variant="rounded" />
                </ListItemAvatar>
              )}
              <ListItemText
                primary={link.name}
                secondary={link.secondaryName ?? undefined}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </CardList>
  );
};

export default UserLessonsList;
