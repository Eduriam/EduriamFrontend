import { Icon } from "@eduriam/ui-core";

import Image from "next/image";

import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

export interface IPopup {
  header?: string;
  subheader?: string;
  text?: string;
  imageUrl?: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  displayCloseButton: boolean;
  open?: boolean;
  onClose?: () => void;
}

const Popup: React.FC<IPopup> = ({
  header,
  subheader,
  text,
  imageUrl,
  primaryAction,
  secondaryAction,
  displayCloseButton,
  open,
  onClose,
}) => {
  const theme = useTheme();

  return (
    <Dialog open={open ?? false} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle1">{header}</Typography>
        {displayCloseButton && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            }}
          >
            <Icon name="close" />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 280,
        }}
      >
        {imageUrl && (
          <Image src={imageUrl} alt="image" width={180} height={180} />
        )}
        <DialogContentText
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle2">{subheader}</Typography>
          <Typography variant="body1">{text}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
        {secondaryAction && (
          <Button onClick={secondaryAction.onClick} variant="text">
            {secondaryAction.text}
          </Button>
        )}
        {primaryAction && (
          <Button onClick={primaryAction.onClick} autoFocus variant="contained">
            {primaryAction.text}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
