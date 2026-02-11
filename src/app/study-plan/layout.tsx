"use client";

import ProtectedRoute from "components/layouts/authentication/ProtectedRoute/ProtectedRoute";

export interface IStudyPlanLayout {
  children: React.ReactNode;
}

const StudyPlanLayout: React.FC<IStudyPlanLayout> = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default StudyPlanLayout;

