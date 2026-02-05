"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import icons from "styles/icons";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import LoginForm from "components/molecules/LoginForm/LoginForm";

export interface ILoginPage {}

const LoginPage: React.FC<ILoginPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="login-page">
      <BasicNavbar
        leftButton={{
          icon: icons.back,
          onClick: navigateWithTransition("/welcome", {
            direction: "back",
          }),
        }}
      />
      <ContentContainer width="small" justifyContent="flex-start" spacing={16}>
        <LoginForm
          onForgotPasswordClick={navigateWithTransition("/forgot-password")}
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default LoginPage;
