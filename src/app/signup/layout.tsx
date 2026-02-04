"use client";

import UnauthenticatedOnlyRoute from "components/layouts/authentication/UnauthenticatedOnlyRoute/UnauthenticatedOnlyRoute";

export interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return <UnauthenticatedOnlyRoute>{children}</UnauthenticatedOnlyRoute>;
};

export default Layout;
