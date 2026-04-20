"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { parseRequiredId } from "util/functions/api";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

import { getVariantFromLogoId } from "components/courses/CourseLogo/CourseLogo";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { UsersService } from "infrastructure/services/users/UsersService";

import CourseListItem from "../components/CourseListItem/CourseListItem";

export interface IUsersCoursesPage {
  params: {
    userId: string;
  };
}

function resolveCourseLogoVariant(
  name: string,
  logoId?: string | null,
): "HTML" | "JavaScript" {
  const mapped = getVariantFromLogoId(logoId ?? undefined);

  if (mapped) {
    return mapped;
  }

  return name.toLowerCase().includes("javascript") ? "JavaScript" : "HTML";
}

const UsersCoursesPage: React.FC<IUsersCoursesPage> = ({ params }) => {
  const router = useRouter();
  const userId = parseRequiredId(params.userId);
  const safeUserId = userId ?? 0;
  const { userProfile } = UsersService.useUser(safeUserId);
  const navigateWithTransition = useTransitionNavigationHandler();
  const { t } = useTranslation("common");

  const courses = userProfile?.courses ?? [];

  useEffect(() => {
    if (userId === null) {
      router.replace("/");
    }
  }, [router, userId]);

  return (
    <PageRoot>
      <PageNavigation
        topNavigation={
          <BasicNavbar
            header={t("userProfile.userCourses")}
            leftButton={{
              icon: "arrowLeft",
              onClick: navigateWithTransition(`/users/${safeUserId}`, {
                direction: "back",
              }),
            }}
          />
        }
        mainNavigation="hidden"
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
