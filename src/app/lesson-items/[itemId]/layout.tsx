"use client";

import ContentContainer from "components/layouts/ContentContainer/ContentContainer";
import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <ProtectedRoute>
      <ContentContainer>{children}</ContentContainer>
    </ProtectedRoute>
  );
};

export default Layout;
