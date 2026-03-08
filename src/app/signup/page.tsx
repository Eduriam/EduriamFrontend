"use client";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import SignupForm from "components/molecules/SignupForm/SignupForm";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="signup-page">
      <PageNavigation topNavigation={<BasicNavbar
        leftButton={{
          icon: "chevronLeft",
          onClick: navigateWithTransition("/welcome", {
            direction: "back",
          }),
        }}
      />} mainNavigation="hidden" />
      <ContentContainer width="small" justifyContent="space-between">
        <SignupForm />
      </ContentContainer>
    </PageRoot>
  );
};

export default SignupPage;
