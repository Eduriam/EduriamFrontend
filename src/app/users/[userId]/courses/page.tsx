"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

import { getVariantFromLogoId } from "components/courses/CourseLogo/CourseLogo";

import UsersAPI from "infrastructure/api/users/UsersAPI";

import CourseListItem from "../components/CourseListItem/CourseListItem";

export interface IUsersCoursesPage {
  params: {
    userId: string;
  };
}

function resolveCourseLogoVariant(
  name: string,
  logoId?: string,
): "HTML" | "JavaScript" {
  const mapped = getVariantFromLogoId(logoId);

  if (mapped) {
    return mapped;
  }

  return name.toLowerCase().includes("javascript") ? "JavaScript" : "HTML";
}

const UsersCoursesPage: React.FC<IUsersCoursesPage> = ({ params }) => {
  const { userProfile } = UsersAPI.useUser(params.userId);
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");

  const courses = userProfile?.courses ?? [];

  return (
    <PageRoot>
      <BasicNavbar
        header={t("userProfile.userCourses")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition(`/users/${params.userId}`, {
            direction: "back",
          }),
        }}
      />

      <ContentContainer width="small" justifyContent="flex-start">
        <Stack
          data-test="enrolled-courses-list-section"
          sx={{ width: "100%" }}
          spacing={3}
        >
          {courses.map((course, index, list) => (
            <Stack key={course.id} spacing={3}>
              <CourseListItem
                courseId={course.id}
                title={course.name}
                progress={course.userProgress ?? 0}
                variant={course.type}
                logoVariant={resolveCourseLogoVariant(
                  course.name,
                  course.logoId,
                )}
              />
              {index < list.length - 1 && <Divider />}
            </Stack>
          ))}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default UsersCoursesPage;
