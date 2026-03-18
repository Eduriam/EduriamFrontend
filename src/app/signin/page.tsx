"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import SigninForm from "components/molecules/SigninForm/SigninForm";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

export interface ISigninPage {}

const SigninPage: React.FC<ISigninPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="signin-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            leftButton={{
              icon: "chevronLeft",
              onClick: navigateWithTransition("/welcome", {
                direction: "back",
              }),
            }}
          />
        }
        mainNavigation="hidden"
      />
      <ContentContainer width="small" justifyContent="flex-start" spacing={16}>
        <SigninForm
          onForgotPasswordClick={navigateWithTransition("/forgot-password")}
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default SigninPage;
