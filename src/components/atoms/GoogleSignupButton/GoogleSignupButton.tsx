import Image from "next/image";

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const googleLogo = "/images/illustrations/google-logo.svg";

export interface IGoogleSignupButton {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: number | string;
}

const GoogleSignupButton: React.FC<IGoogleSignupButton> = ({
  text = "Continue with Google",
  onClick,
  disabled = false,
  width = 357,
}) => {
  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      sx={{
        width,
        height: 48,
        borderRadius: "16px",
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderColor: "#e5e5e5",
        borderTopWidth: "2px",
        borderLeftWidth: "2px",
        borderRightWidth: "2px",
        borderBottomWidth: "4px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "23px",
        overflow: "hidden",
        padding: 0,
        textTransform: "none",
        "&.Mui-disabled": {
          opacity: 0.6,
        },
      }}
    >
      <Image
        alt=""
        aria-hidden
        src={googleLogo}
        width={28}
        height={28}
        style={{ display: "block", flexShrink: 0 }}
      />
      <Typography
        component="span"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "16px",
          color: "#000000",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};

export default GoogleSignupButton;
