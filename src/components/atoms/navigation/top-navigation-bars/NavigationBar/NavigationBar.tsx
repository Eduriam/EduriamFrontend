import { Icon, IconName } from "@eduriam/ui-core";
import theme from "styles/theme";

import { AppBarProps } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { SIDE_NAV_BAR_WIDTH } from "../../main-navigation-bars/SideNavigationBar/SideNavigationBar";

export interface INavigationBar {
  leftIconButton?: {
    onClick?: () => void;
    icon: IconName;
  };
  rightIconButton?: {
    onClick?: () => void;
    icon: IconName;
  };
  header?: string;
}

const NavigationBar: React.FC<INavigationBar & AppBarProps> = ({
  leftIconButton,
  rightIconButton,
  header,
  ...rest
}) => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: rest.color === "transparent" ? "none" : undefined,
        backgroundColor:
          rest.color === "transparent" ? "transparent" : "background.paper",
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
          {leftIconButton && (
            <IconButton onClick={leftIconButton.onClick}>
              <Icon name={leftIconButton.icon} />
            </IconButton>
          )}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{ pl: desktop ? `${SIDE_NAV_BAR_WIDTH - 64}px` : undefined }}
        >
          {header}
        </Typography>
        <Box>
          {rightIconButton && (
            <IconButton onClick={rightIconButton.onClick}>
              <Icon name={rightIconButton.icon} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
