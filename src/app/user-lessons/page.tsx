"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import ContentContainer from "components/layouts/ContentContainer/ContentContainer";
import CustomLessonsOverview from "components/layouts/CustomLessonsOverview/CustomLessonsOverview";

import useAuth from "infrastructure/services/AuthProvider";

export interface IUserLessonsPage {}

const UserLessonsPage: React.FC<IUserLessonsPage> = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role === "USER") {
      router.push("/subscription");
    }
  }, [user, router]);

  return (
    <ContentContainer>
      {user && <CustomLessonsOverview courseId={user.selectedCourse.id} />}
    </ContentContainer>
  );
};

export default UserLessonsPage;
