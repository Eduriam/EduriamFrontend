"use client";

import HelpCategoriesOverview from "components/layouts/HelpCategoriesOverview/HelpCategoriesOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IHelpPage {}

const HelpPage: React.FC<IHelpPage> = () => {
  const { user } = useAuth();

  return (
    <>{user && <HelpCategoriesOverview courseId={user.selectedCourse.id} />}</>
  );
};

export default HelpPage;
