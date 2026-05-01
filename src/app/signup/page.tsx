"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";

import SignupForm from "components/molecules/SignupForm/SignupForm";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  return (
    <PageRoot data-test="signup-page">
      <PageNavigation
        topNavigation={<BackNavbar withTransition route="/welcome" />}
        mainNavigation="hidden"
      />
      <ContentContainer
        width="small"
        justifyContent="space-between"
        paddingTop="small"
      >
        <SignupForm />
      </ContentContainer>
    </PageRoot>
  );
};

export default SignupPage;
