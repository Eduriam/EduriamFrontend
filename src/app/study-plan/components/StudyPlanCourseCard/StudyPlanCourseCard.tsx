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
   * Optional data attribute applied to the root card element for e2e tests.
   */
  "data-test"?: string;
  /**
   * Optional data attribute applied to the primary learn button for e2e tests.
   */
  "data-test-learn-button"?: string;
}

const StudyPlanCourseCard: React.FC<IStudyPlanCourseCard> = ({
  title,
  logoVariant,
  onPlayClick,
  "data-test": dataTest,
  "data-test-learn-button": dataTestLearnButton,
}) => {
  return (
    <Card paddingX="small" paddingY="medium" data-test={dataTest}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Stack direction="row" spacing={0} alignItems="center">
          <IconButton
            icon="dragIndicator"
            variant="text"
            size="small"
            disabled
          />
          <Stack direction="row" spacing={3} alignItems="center">
            <CourseLogo variant={logoVariant} size="medium" />

            <Typography
              variant="h6"
              component="span"
              noWrap
              sx={{
                ml: 1,
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Stack>

        <IconButton
          icon="play"
          variant="contained"
          size="medium"
          data-test-learn-button={dataTestLearnButton}
          onClick={onPlayClick}
        />
      </Stack>
    </Card>
  );
};

export default StudyPlanCourseCard;
