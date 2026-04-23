"use client";

import { Card, IconButton } from "@eduriam/ui-core";

import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import CourseLogo, {
  type CourseLogoVariant,
} from "components/courses/CourseLogo/CourseLogo";

export interface IStudyPlanCourseCard {
  /**
   * Title of the course shown in the card.
   */
  title: string;
  /**
   * Visual variant of the course logo.
   */
  logoVariant: CourseLogoVariant;
  /**
   * Called when the primary action (play button) is clicked.
   */
  onPlayClick?: () => void;
  /**
   * Called when the center card area is clicked (between handle and play button).
   */
  onCourseClick?: () => void;
  /**
   * Optional data attribute applied to the root card element for e2e tests.
   */
  "data-test"?: string;
  /**
   * Optional data attribute applied to the primary learn button for e2e tests.
   */
  "data-test-learn-button"?: string;
  /**
   * Optional data attribute applied to the clickable center area for e2e tests.
   */
  "data-test-course-click-area"?: string;
}

const StudyPlanCourseCard: React.FC<IStudyPlanCourseCard> = ({
  title,
  logoVariant,
  onPlayClick,
  onCourseClick,
  "data-test": dataTest,
  "data-test-learn-button": dataTestLearnButton,
  "data-test-course-click-area": dataTestCourseClickArea,
}) => {
  const isCourseAreaClickable =
    onCourseClick !== undefined && onCourseClick !== null;

  return (
    <Card paddingX="small" paddingY="medium" data-test={dataTest}>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          sx={{ flex: 1, minWidth: 0 }}
        >
          <IconButton
            icon="dragIndicator"
            variant="text"
            size="small"
            disabled
          />
          <Stack
            component={isCourseAreaClickable ? "button" : "div"}
            type={isCourseAreaClickable ? "button" : undefined}
            direction="row"
            spacing={3}
            alignItems="center"
            data-test={dataTestCourseClickArea}
            onClick={onCourseClick}
            sx={{
              border: 0,
              background: "transparent",
              appearance: "none",
              p: 0,
              m: 0,
              flex: 1,
              minWidth: 0,
              cursor: isCourseAreaClickable ? "pointer" : "default",
              textAlign: "left",
              color: "text.primary",
              font: "inherit",
            }}
          >
            <CourseLogo variant={logoVariant} size="medium" />

            <Typography
              variant="h6"
              component="span"
              noWrap
              sx={{
                ml: 1,
                color: "text.primary",
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>

        {onPlayClick !== undefined && onPlayClick !== null && (
          <IconButton
            icon="play"
            variant="contained"
            size="medium"
            data-test={dataTestLearnButton}
            onClick={(event) => {
              event.stopPropagation();
              onPlayClick();
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
          />
        )}
      </Stack>
    </Card>
  );
};

export default StudyPlanCourseCard;
