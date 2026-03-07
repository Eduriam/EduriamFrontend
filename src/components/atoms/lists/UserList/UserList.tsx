"use client";

import { Icon } from "@eduriam/ui-core";
import { buildShopAvatar } from "app/shop/utils/avatar";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Avatar from "components/avatar/Avatar";

import { UserSummary } from "infrastructure/api/users/Users";

export interface IUserList {
  items: Array<UserSummary>;
  currentUserId?: Id;
  onUserClick: (userId: Id) => void;
  onFollowToggle?: (userId: Id, isFollowed: boolean) => void;
  "data-test"?: string;
}

const UserList: React.FC<IUserList> = ({
  items,
  currentUserId,
  onUserClick,
  onFollowToggle,
  "data-test": dataTest,
}) => {
  return (
    <Stack data-test={dataTest} sx={{ width: "100%", mt: 1 }} spacing={1}>
      {items.map((item, index) => (
        <Stack key={item.id} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 1, px: 0.5 }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                minWidth: 0,
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => onUserClick(item.id)}
            >
              <Avatar
                definition={buildShopAvatar(item.avatarDefinition)}
                size={64}
                alt={item.name}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1" noWrap>
                  {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" noWrap>
                  @{item.username}
                </Typography>
              </Box>
            </Stack>

            {item.id !== currentUserId && onFollowToggle && (
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  onFollowToggle(item.id, !item.isFollowed);
                }}
              >
                <Icon name={item.isFollowed ? "unfollow" : "follow"} />
              </IconButton>
            )}
          </Stack>

          {index < items.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  );
};

export default UserList;

