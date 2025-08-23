"use client";

import { Container } from "@mui/material";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <ProtectedRoute>
      <Container
        maxWidth="sm"
        sx={{ justifyContent: "center", display: "flex" }}
      >
        {children}
      </Container>
    </ProtectedRoute>
  );
};

export default Layout;
