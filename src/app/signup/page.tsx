"use client";

import theme from "styles/theme";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

import SignupForm from "components/molecules/SignupForm/SignupForm";

export interface ISignupPage {}

const SignupPage: React.FC<ISignupPage> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth="xs" sx={{ pt: 3 }}>
      <Box>
        {desktop ? (
          <Card sx={{ textAlign: "center" }}>
            <SignupForm />
          </Card>
        ) : (
          <SignupForm />
        )}
      </Box>
    </Container>
  );
};

export default SignupPage;
