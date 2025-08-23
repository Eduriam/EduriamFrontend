"use client";

import ContentContainer from "components/layouts/ContentContainer/ContentContainer";
import UnauthenticatedOnlyRoute from "components/layouts/authentication/UnauthenticatedOnlyRoute/UnauthenticatedOnlyRoute";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <UnauthenticatedOnlyRoute>
      <ContentContainer>{children}</ContentContainer>
    </UnauthenticatedOnlyRoute>
  );
};

export default Layout;
