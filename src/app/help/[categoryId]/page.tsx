"use client";

import HelpArticlesOverview from "components/layouts/HelpArticlesOverview/HelpArticlesOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IHelpArticlesPage {
  params: {
    categoryId: string;
  };
}

const HelpArticlesPage: React.FC<IHelpArticlesPage> = ({ params }) => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <HelpArticlesOverview
          courseId={user.selectedCourse.id}
          categoryId={params.categoryId}
        />
      )}
    </>
  );
};

export default HelpArticlesPage;
