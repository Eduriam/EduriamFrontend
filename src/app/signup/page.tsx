"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import icons from "styles/icons";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import SignupForm from "components/molecules/SignupForm/SignupForm";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="signup-page">
      <BasicNavbar
        leftButton={{
          icon: icons.back,
          onClick: navigateWithTransition("/welcome", {
            direction: "back",
          }),
        }}
      />
      <ContentContainer width="small" justifyContent="space-between">
        <SignupForm />
      </ContentContainer>
    </PageRoot>
  );
};

export default SignupPage;
