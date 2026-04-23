import Box from "@mui/material/Box";

export type CourseLogoId = "html" | "javascript" | "css";
export type CourseLogoVariant = CourseLogoId;

export type CourseLogoSize = "large" | "medium" | "small";

export interface CourseLogoProps {
  /**
   * Logo identifier matching the logo file name in /public/images/course-logo.
   * Falls back to "javascript" when missing or unsupported.
   */
  variant?: string | null;
  /**
   * Size of the logo.
   * - large: 100px
   * - medium: 64px
   * - small: 24px
   *
   * Matches the Figma variants.
   */
  size?: CourseLogoSize;
}

const sizeToPixels: Record<CourseLogoSize, number> = {
  large: 100,
  medium: 64,
  small: 24,
};

function isCourseLogoId(value: string): value is CourseLogoId {
  return value === "html" || value === "javascript" || value === "css";
}

function resolveLogoId(variant: CourseLogoProps["variant"]): CourseLogoId {
  if (variant && isCourseLogoId(variant)) {
    return variant;
  }

  return "javascript";
}

const CourseLogo: React.FC<CourseLogoProps> = ({
  variant,
  size = "medium",
}) => {
  const dimension = sizeToPixels[size];
  const logoId = resolveLogoId(variant);

  return (
    <Box
      component="img"
      src={`/images/course-logo/${logoId}.svg`}
      alt={`${logoId} logo`}
      sx={{
        width: dimension,
        height: dimension,
        display: "block",
        objectFit: "contain",
      }}
    />
  );
};

export default CourseLogo;
