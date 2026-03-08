"use client";

import {
  BasicNavbar,
  ContentContainer,
  Drawer,
  IconButton,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CourseLogo, {
  getVariantFromLogoId,
} from "components/courses/CourseLogo/CourseLogo";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { UserCourse } from "infrastructure/api/user/courses/UserCourses";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";

const SettingsCoursesPage: React.FC = () => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const { enqueueSnackbar } = useSnackbar();

  const { courses = [], mutate } = UserCoursesAPI.useUserCourses();
  const [courseToDelete, setCourseToDelete] = useState<UserCourse | null>(null);

  const displayedCourses = useMemo(
    () => courses.filter((course) => course.enrolled),
    [courses],
  );

  const handleDeleteCourse = async () => {
    if (!courseToDelete) {
      return;
    }

    const optimisticCourses = courses.filter(
      (course) => course.id !== courseToDelete.id,
    );

    await mutate(async () => {
      await UserCoursesAPI.removeCourse(courseToDelete.id);
      enqueueSnackbar(t("settings.courses.removed"), {
        variant: "success",
      });
      return optimisticCourses;
    }, optimisticMutationOption(optimisticCourses));

    setCourseToDelete(null);
  };

  return (
    <PageRoot data-test="manage-courses-page">
      <BasicNavbar
        header={t("settings.items.courses")}
        leftButton={{
          icon: "arrowLeft",
          onClick: navigateWithTransition("/settings", { direction: "back" }),
        }}
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
      >
        <Stack spacing={3} width="100%">
          {displayedCourses.map((course, index) => (
            <Stack key={course.id} spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  py: 1,
                }}
              >
                <CourseLogo
                  variant={getVariantFromLogoId(course.logoId) ?? "HTML"}
                  size="medium"
                />
                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography variant="h6">{course.name}</Typography>
                </Box>
                <IconButton
                  icon="delete"
                  variant="text"
                  color="textPrimary"
                  size="medium"
                  data-test={`remove-course-${course.id}-button`}
                  onClick={() => setCourseToDelete(course)}
                />
              </Box>
              {index < displayedCourses.length - 1 ? <Divider /> : null}
            </Stack>
          ))}
        </Stack>
      </ContentContainer>

      <Drawer
        open={Boolean(courseToDelete)}
        onClose={() => setCourseToDelete(null)}
      >
        <Stack spacing={14}>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              {t("settings.courses.removeTitle")}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {t("settings.courses.removeDescription")}
            </Typography>
          </Stack>

          <Stack spacing={2} alignItems="center">
            <LargeButton
              variant="contained"
              onClick={() => setCourseToDelete(null)}
              data-test="cancel-remove-course-button"
            >
              {t("userActions.cancel")}
            </LargeButton>

            <LargeButton
              variant="text"
              onClick={() => {
                void handleDeleteCourse();
              }}
              data-test="confirm-remove-course-button"
              color="error"
              fullWidth
            >
              {t("settings.courses.remove")}
            </LargeButton>
          </Stack>
        </Stack>
      </Drawer>
    </PageRoot>
  );
};

export default SettingsCoursesPage;
