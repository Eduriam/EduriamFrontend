"use client";

import { IconButton, type IconName, Illustration } from "@eduriam/ui-core";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export type ShopNavbarLeftButton = {
  icon: IconName;
  onClick: () => void;
  dataTest?: string;
};

export interface ShopNavbarProps {
  leftButton?: ShopNavbarLeftButton;
  balance?: number;
  balanceDataTest?: string;
}

const ShopNavbar: React.FC<ShopNavbarProps> = ({
  leftButton,
  balance = 0,
  balanceDataTest = "virtual-currency-balance-section",
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "background.default",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          alignItems: "center",
          display: "flex",
          height: "64px",
          justifyContent: "space-between",
          minHeight: "64px",
          margin: "0 auto",
          maxWidth: 1000,
          width: "100%",
          px: 3,
          [theme.breakpoints.up("sm")]: {
            px: 4,
          },
        }}
      >
        <Box sx={{ minWidth: 40, display: "flex", alignItems: "center" }}>
          {leftButton ? (
            <IconButton
              icon={leftButton.icon}
              variant="text"
              color="textPrimary"
              onClick={leftButton.onClick}
              data-test={leftButton.dataTest}
            />
          ) : null}
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          data-test={balanceDataTest}
        >
          <Illustration name="coin" width={24} height={24} />
          <Typography
            variant="body1"
            fontWeight={700}
            sx={{ color: "coin.main" }}
          >
            {balance}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ShopNavbar;
