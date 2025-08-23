import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import UsersAPI from "infrastructure/api/users/UsersAPI";

import UsersList from "../lists/UsersList/UsersList";

export interface IUserSearchResults {
  searchPrompt: string;
}

const UserSearchResults: React.FC<IUserSearchResults> = ({ searchPrompt }) => {
  const { users } = UsersAPI.useUsers({
    searchName: searchPrompt.toLowerCase(),
  });
  const { t } = useTranslation("common");

  return (
    <>
      {users && users.length > 0 ? (
        <UsersList users={users} />
      ) : searchPrompt ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2">{t("search.noUsersFound")}</Typography>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default UserSearchResults;
