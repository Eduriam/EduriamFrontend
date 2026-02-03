import { action } from "@storybook/addon-actions";

import { IGoogleSignupButton } from "./GoogleSignupButton";

const base: IGoogleSignupButton = {
  text: "Continue with Google",
  onClick: action("onClick"),
};

export const mockGoogleSignupButtonProps = {
  base,
};
