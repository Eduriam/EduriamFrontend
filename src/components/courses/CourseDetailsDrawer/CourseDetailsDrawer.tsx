"use client";

import { Chip, Drawer, LargeButton, Paragraph } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface PrerequisiteItem {
  courseId: Id;
  courseName: string;
  completed?: boolean;
}

export interface ICourseDetailsDrawer {
  open: boolean;
  onClose: () => void;
  prerequisites?: PrerequisiteItem[];
  description?: string;
}

const CourseDetailsDrawer: React.FC<ICourseDetailsDrawer> = ({
  open,
  onClose,
  prerequisites = [],
  description = "",
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleManageCourses = () => {
    onClose();
    router.push("/settings/courses");
  };

  const drawerContent = (
    <Stack spacing={9} alignItems="center">
      <Typography variant="h4">{t("courseDetailsDrawer.title")}</Typography>

      {prerequisites.length > 0 && (
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          <Typography variant="h5">
            {t("courseDetailsDrawer.prerequisites")}
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            sx={{ mt: 1 }}
            useFlexGap
          >
            {prerequisites.map((item) => (
              <Link
                key={item.courseId}
                href={`/courses/${item.courseId}`}
                style={{ textDecoration: "none" }}
              >
                <Chip
                  label={item.courseName}
                  color={item.completed ? "chipGreen" : "neutral"}
                  icon={item.completed ? "check" : "arrowRight"}
                  variant="outlined"
                  component="span"
                />
              </Link>
            ))}
          </Stack>
        </Stack>
      )}

      {description && (
        <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
          <Typography variant="h5">
            {t("courseDetailsDrawer.description")}
          </Typography>
          <Paragraph text={description} />
        </Stack>
      )}

      <Stack spacing={4} sx={{ width: "100%" }}>
        <LargeButton
          variant="text"
          color="primary"
          onClick={handleManageCourses}
          data-test="manage-courses-button"
        >
          {t("courseDetailsDrawer.manageCourses")}
        </LargeButton>
        <LargeButton
          variant="contained"
          color="primary"
          onClick={onClose}
          data-test="course-details-drawer-close"
        >
          {t("courseDetailsDrawer.close")}
        </LargeButton>
      </Stack>
    </Stack>
  );

  return (
    <Drawer open={open} onClose={onClose} data-test="course-details-drawer">
      {drawerContent}
    </Drawer>
  );
};

export default CourseDetailsDrawer;
