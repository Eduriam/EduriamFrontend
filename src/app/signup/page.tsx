"use client";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";

import SignupForm from "components/molecules/SignupForm/SignupForm";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  return (
    <PageRoot data-test="signup-page">
      <PageNavigation
        topNavigation={<BackNavbar withTransition route="/welcome" />}
        mainNavigation="hidden"
      />
      <ContentContainer width="small" justifyContent="space-between">
        <SignupForm />
      </ContentContainer>
    </PageRoot>
  );
};

export default SignupPage;
