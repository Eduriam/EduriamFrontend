"use client";

import {
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

import CourseLogo from "components/courses/CourseLogo/CourseLogo";
import BackNavbar from "components/navigation/BackNavbar/BackNavbar";
import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { optimisticMutationOption } from "infrastructure/api/API";
import { ProductType } from "infrastructure/api/generated/models/productType";
import {
  UserProduct,
  UserProductsService,
} from "infrastructure/services/courses/UserProductsService";

const SettingsCoursesPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { enqueueSnackbar } = useSnackbar();
  const navigateWithTransition = useTransitionNavigationHandler();

  const { userProducts = [], mutate } = UserProductsService.useUserProducts();
  const [courseToDelete, setCourseToDelete] = useState<UserProduct | null>(
    null,
  );

  const displayedCourses = useMemo(
    () => userProducts.filter((course) => course.enrolled),
    [userProducts],
  );

  const handleDeleteCourse = async () => {
    if (!courseToDelete) {
      return;
    }

    const optimisticProducts = userProducts.filter(
      (course) => course.id !== courseToDelete.id,
    );

    await mutate(async () => {
      await UserProductsService.removeProduct(courseToDelete.id);
      enqueueSnackbar(t("settings.courses.removed"), {
        variant: "success",
      });
      return optimisticProducts;
    }, optimisticMutationOption(optimisticProducts));

    setCourseToDelete(null);
  };

  const getCoursePath = (course: UserProduct) =>
    course.type === ProductType.StudyPath
      ? `/learning-paths/${course.id}`
      : `/courses/${course.id}`;

  return (
    <PageRoot data-test="manage-courses-page">
      <PageNavigation
        topNavigation={
          <BackNavbar
            withTransition
            route="/settings"
            header={t("settings.items.courses")}
          />
        }
        mainNavigation="hidden"
      />

      <ContentContainer
        width="small"
        justifyContent="flex-start"
        paddingTop="small"
      >
        <Stack spacing={3} width="100%">
          {displayedCourses.map((course, index) => {
            const coursePath = getCoursePath(course);

            return (
              <Stack key={course.id} spacing={3}>
                <Box
                  role="button"
                  tabIndex={0}
                  data-test={`course-item-${course.id}`}
                  onClick={navigateWithTransition(coursePath)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2.5,
                    py: 1,
                    cursor: "pointer",
                  }}
                >
                  <CourseLogo variant={course.logoId} size="medium" />
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography variant="h6">{course.name}</Typography>
                  </Box>
                  <IconButton
                    icon="delete"
                    variant="text"
                    color="textPrimary"
                    size="medium"
                    data-test={`remove-course-${course.id}-button`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setCourseToDelete(course);
                    }}
                  />
                </Box>
                {index < displayedCourses.length - 1 ? <Divider /> : null}
              </Stack>
            );
          })}
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
