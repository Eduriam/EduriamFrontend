"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import { useSnackbar } from "notistack";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import { useMemo, useState } from "react";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { optimisticMutationOption } from "infrastructure/api/API";
import type { UserCourse } from "infrastructure/api/user/courses/UserCourses";
import UserCoursesAPI from "infrastructure/api/user/courses/UserCoursesAPI";

const logoTextByLogoId: Record<string, string> = {
  html: "HTML",
  javascript: "JS",
};

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
        paddingTop="none"
      >
        <Stack spacing={1} width="100%">
          {displayedCourses.map((course, index) => (
            <Stack key={course.id} spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  py: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "background.paper",
                    color: "text.primary",
                    fontWeight: 700,
                  }}
                >
                  {(
                    (course.logoId
                      ? logoTextByLogoId[course.logoId]
                      : undefined) ?? course.name
                  ).slice(0, 2)}
                </Avatar>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  {course.name}
                </Typography>
                <Box
                  role="button"
                  tabIndex={0}
                  data-test={`remove-course-${course.id}-button`}
                  onClick={() => setCourseToDelete(course)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setCourseToDelete(course);
                    }
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    color: "error.main",
                  }}
                >
                  <DeleteOutlineIcon />
                </Box>
              </Box>
              {index < displayedCourses.length - 1 ? <Divider /> : null}
            </Stack>
          ))}
        </Stack>
      </ContentContainer>

      <Drawer
        anchor="bottom"
        open={Boolean(courseToDelete)}
        onClose={() => setCourseToDelete(null)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            p: 3,
          },
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h5" textAlign="center">
              {t("settings.courses.removeTitle")}
            </Typography>
            <Typography variant="body1" textAlign="center">
              {t("settings.courses.removeDescription")}
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => setCourseToDelete(null)}
              data-test="cancel-remove-course-button"
            >
              {t("userActions.cancel")}
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => {
                void handleDeleteCourse();
              }}
              data-test="confirm-remove-course-button"
            >
              {t("settings.courses.remove")}
            </Button>
          </Stack>
        </Stack>
      </Drawer>
    </PageRoot>
  );
};

export default SettingsCoursesPage;
