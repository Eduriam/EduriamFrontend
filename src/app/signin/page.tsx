"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import SigninForm from "components/molecules/SigninForm/SigninForm";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

export interface ISigninPage {}

const SigninPage: React.FC<ISigninPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="signin-page">
      <PageNavigation
        topNavigation={<BackNavbar withTransition route="/welcome" />}
        mainNavigation="hidden"
      />
      <ContentContainer
        width="small"
        justifyContent="flex-start"
        spacing={16}
        paddingTop="small"
      >
        <SigninForm
          onForgotPasswordClick={navigateWithTransition("/forgot-password")}
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default SigninPage;
