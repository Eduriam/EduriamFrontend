import { action } from "@storybook/addon-actions";

import { IChangePasswordForm } from "./ChangePasswordForm";

const base: IChangePasswordForm = {
  onPasswordChanged: action("onPasswordChanged"),
  resetToken: "dfafnklfnlkgsjf",
  userId: 1001,
};

export const mockChangePasswordFormProps = {
  base,
};
