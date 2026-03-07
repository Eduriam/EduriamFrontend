import { Icon } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";

import { useRouter } from "next/navigation";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import Avatar from "components/avatar/Avatar";

import { UserSummary } from "infrastructure/api/users/Users";
import useAuth from "infrastructure/services/AuthProvider";

import CardList from "../CardList/CardList";

export interface IUsersList {
  users: Array<UserSummary>;
  onFollow?: (userId: Id) => void;
  onUnfollow?: (userId: Id) => void;
}

const UsersList: React.FC<IUsersList> = ({ users, onFollow, onUnfollow }) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <CardList>
      {users &&
        users.map((userItem, i) => {
          return (
            <ListItem
              sx={{ pr: 2 }}
              key={i}
              secondaryAction={
                userItem.id !== user?.id && onFollow && onUnfollow ? (
                  userItem.isFollowed ? (
                    <IconButton onClick={() => onUnfollow(userItem.id)}>
                      <Icon name="unfollow" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => onFollow(userItem.id)}>
                      <Icon name="follow" />
                    </IconButton>
                  )
                ) : undefined
              }
            >
              <ListItemButton
                component="a"
                onClick={() => router.push(`/users/${userItem.id}`)}
              >
                <ListItemAvatar>
                  <Avatar
                    definition={userItem.avatarDefinition ?? buildShopAvatar()}
                    size={40}
                    alt={userItem.name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={userItem.name}
                  secondary={`@${userItem.username}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
    </CardList>
  );
};

export default UsersList;
