"use client";

import type { Id } from "domain/models/types/core";
import { ProgressBar } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CourseLogo, {
  type CourseLogoVariant,
} from "components/courses/CourseLogo/CourseLogo";
import { ProductType } from "infrastructure/api/generated/models/productType";

export interface ICourseListItem {
  courseId: Id;
  title: string;
  progress?: number;
  variant?: ProductType;
  logoVariant?: CourseLogoVariant;
  "data-test"?: string;
}

const CourseListItem: React.FC<ICourseListItem> = ({
  courseId,
  title,
  progress = 0,
  variant = ProductType.Course,
  logoVariant = "HTML",
  "data-test": dataTest,
}) => {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();
  const clampedProgress = Math.max(0, Math.min(100, progress));
  const coursePath =
    variant === ProductType.StudyPath
      ? `/learning-paths/${courseId}`
      : `/courses/${courseId}`;

  return (
    <Box
      onClick={navigateWithTransition(coursePath)}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        py: 1,
        cursor: "pointer",
      }}
      data-test={dataTest}
    >
      <CourseLogo variant={logoVariant} size="medium" />

      <Box
        sx={{
          minWidth: 0,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "22px",
              lineHeight: "28px",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>

          {variant === ProductType.StudyPath && (
            <Typography variant="body2" color="text.secondary">
              {t("courses.learningPathLabel")}
            </Typography>
          )}
        </Box>

        <ProgressBar value={clampedProgress} size="medium" />
      </Box>
    </Box>
  );
};

export default CourseListItem;
