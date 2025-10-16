import { FullWidthButton, Icon } from "@eduriam/ui-core";
import theme from "styles/theme";

import { ReactNode } from "react";

import { DialogProps } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import KeyPress from "../KeyPress/KeyPress";
import ImageCard from "../cards/ImageCard/ImageCard";

export interface IFullscreenDialog {
  header1?: string;
  imageUrl?: string;
  header2?: string;
  text?: string;
  children?: ReactNode;
  primaryButton?: {
    onClick?: () => void;
    text?: string;
    icon?: string;
  };
  secondaryButton?: {
    onClick?: () => void;
    text?: string;
    icon?: string;
  };
  maxWidth?: "sm" | "md";
}

const FullscreenDialog: React.FC<
  IFullscreenDialog & Omit<DialogProps, "open" | "fullScreen">
> = ({
  primaryButton,
  secondaryButton,
  imageUrl,
  header1,
  header2,
  text,
  children,
  maxWidth = "sm",
  ...rest
}) => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Dialog fullScreen open={true} {...rest}>
      <Container
        maxWidth={maxWidth}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pt: desktop ? 12 : 4,
          mb: 4,
        }}
      >
        <KeyPress onPress={() => primaryButton?.onClick?.()} keys={["Enter"]} />
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {header1}
        </Typography>

        {imageUrl && <ImageCard url={imageUrl} />}

        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {header2}
        </Typography>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          {text}
        </Typography>

        {children}

        <Box display="flex" flexDirection="column" sx={{ mt: 8 }}>
          {secondaryButton && (
            <FullWidthButton
              variant="text"
              bottomOffset
              onClick={() => secondaryButton.onClick?.()}
              endIcon={
                secondaryButton.icon ? (
                  <Icon name={secondaryButton.icon} />
                ) : undefined
              }
            >
              {secondaryButton.text}
            </FullWidthButton>
          )}
          {primaryButton && (
            <FullWidthButton
              onClick={() => primaryButton.onClick?.()}
              endIcon={
                primaryButton.icon ? (
                  <Icon name={primaryButton.icon} />
                ) : undefined
              }
            >
              {primaryButton.text}
            </FullWidthButton>
          )}
        </Box>
      </Container>
    </Dialog>
  );
};

export default FullscreenDialog;
