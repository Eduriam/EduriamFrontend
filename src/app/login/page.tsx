"use client";

import theme from "styles/theme";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

import LoginForm from "components/molecules/LoginForm/LoginForm";

export interface ILoginPage {}

const LoginPage: React.FC<ILoginPage> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container data-test="login-page" maxWidth="xs" sx={{ pt: 3 }}>
      <Box>
        {desktop ? (
          <Card sx={{ textAlign: "center" }}>
            <LoginForm />
          </Card>
        ) : (
          <LoginForm />
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
