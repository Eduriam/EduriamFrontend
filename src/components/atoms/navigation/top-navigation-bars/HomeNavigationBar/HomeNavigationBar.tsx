import { useTranslation } from "i18n/client";
import icons from "styles/icons";
import theme from "styles/theme";

import { AppBarProps } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import IconContainer from "components/atoms/IconContainer/IconContainer";
import Streak from "components/atoms/Streak/Streak";

import useAuth from "infrastructure/services/AuthProvider";

import { IDrawerController } from "../../drawer/DrawerContainer/DrawerContainer";
import { SIDE_NAV_BAR_WIDTH } from "../../main-navigation-bars/SideNavigationBar/SideNavigationBar";

export interface IHomeNavigationBar extends IDrawerController {}

const HomeNavigationBar: React.FC<IHomeNavigationBar & AppBarProps> = ({
  onDrawerOpen,
  ...rest
}) => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const { t } = useTranslation("common");
  const { user } = useAuth();

  function completedTodaysStudySession(lastSessionDate?: Date | null) {
    if (lastSessionDate === null || lastSessionDate === undefined) {
      return false;
    }

    const today = new Date();
    const date = new Date(lastSessionDate);

    return (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: rest.color === "transparent" ? "none" : undefined,
        backgroundColor: "background.paper",
      }}
      {...rest}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton onClick={onDrawerOpen}>
            <IconContainer name={icons.menu} />
          </IconButton>
        </Box>
        {user && (
          <Typography
            variant="subtitle1"
            sx={{ pl: desktop ? `${SIDE_NAV_BAR_WIDTH}px` : undefined }}
          >
            {t(`levels.${user.lastViewedStudyMapLevel ?? 0}`)}
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Streak
            streak={user?.streak}
            completedDailyGoal={completedTodaysStudySession(
              user?.lastSessionDate,
            )}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HomeNavigationBar;
