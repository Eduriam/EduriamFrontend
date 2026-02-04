"use client";

import { BasicNavbar, ContentContainer } from "@eduriam/ui-core";
import icons from "styles/icons";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";

import LoginForm from "components/molecules/LoginForm/LoginForm";

export interface ILoginPage {}

const LoginPage: React.FC<ILoginPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <Stack data-test="login-page" sx={{ minHeight: "100vh" }}>
      <BasicNavbar
        leftButton={{
          icon: icons.back,
          onClick: navigateWithTransition("/welcome", {
            direction: "back",
          }),
        }}
        color="transparent"
      />
      <ContentContainer width="small" sx={{ flexGrow: 1 }}>
        <LoginForm
          onForgotPasswordClick={navigateWithTransition("/forgot-password")}
        />
      </ContentContainer>
    </Stack>
  );
};

export default LoginPage;
