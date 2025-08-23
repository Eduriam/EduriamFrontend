import theme from "styles/theme";

import { MouseEvent } from "react";

import { ButtonProps } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface IFullWidthButton {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  buttonVariant?: "right" | "wrong";
  children?: React.ReactNode;
  bottomOffset?: boolean;
}

const FullWidthButton: React.FC<IFullWidthButton & ButtonProps> = ({
  children,
  onClick,
  buttonVariant,
  bottomOffset,
  ...rest
}) => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {desktop ? (
        <Button
          onClick={(e) => onClick?.(e)}
          variant="contained"
          size="large"
          fullWidth
          sx={{ maxWidth: "300px", alignSelf: "center" }}
          {...rest}
        >
          {children}
        </Button>
      ) : (
        <>
          {/* Toolbar creates the right offset so that Button doesn't overlay the page content */}
          <Toolbar sx={{ zIndex: 0 }} />

          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              zIndex: 1,
              backgroundColor: "white",
            }}
          >
            <Button
              onClick={(e) => onClick?.(e)}
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                borderRadius: 0,
                height: "56px",
              }}
              color={
                buttonVariant === "right"
                  ? "success"
                  : buttonVariant === "wrong"
                    ? "error"
                    : "primary"
              }
              {...rest}
            >
              {children}
            </Button>
            {bottomOffset && <Toolbar />}
          </Box>
        </>
      )}
    </>
  );
};

export default FullWidthButton;
