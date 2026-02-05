"use client";

import { BasicNavbar, ContentContainer } from "@eduriam/ui-core";
import icons from "styles/icons";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";

import SignupForm from "components/molecules/SignupForm/SignupForm";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <BasicNavbar
        leftButton={{
          icon: icons.back,
          onClick: navigateWithTransition("/welcome", {
            direction: "back",
          }),
        }}
        color="transparent"
      />
      <ContentContainer width="small" justifyContent="space-between">
        <SignupForm />
      </ContentContainer>
    </Stack>
  );
};

export default SignupPage;
