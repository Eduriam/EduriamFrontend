import Box from "@mui/material/Box";

export type CourseLogoVariant = "HTML" | "JavaScript" | "CSS";

export type CourseLogoSize = "large" | "medium" | "small";

const LOGO_ID_TO_VARIANT: Record<string, CourseLogoVariant> = {
  html: "HTML",
  javascript: "JavaScript",
  css: "CSS",
};

/**
 * Maps a course logoId (e.g. from API) to a CourseLogo variant.
 * Returns undefined if logoId is not recognized.
 */
export function getVariantFromLogoId(
  logoId: string | undefined,
): CourseLogoVariant | undefined {
  if (!logoId) {
    return undefined;
  }
  return LOGO_ID_TO_VARIANT[logoId.toLowerCase()];
}

export interface CourseLogoProps {
  /**
   * Visual variant of the logo.
   */
  variant: CourseLogoVariant;
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

const variantToSrc: Record<CourseLogoVariant, string> = {
  HTML: "/images/course-logo/html.svg",
  JavaScript: "/images/course-logo/javascript.svg",
  CSS: "/images/course-logo/css.svg",
};

const sizeToPixels: Record<CourseLogoSize, number> = {
  large: 100,
  medium: 64,
  small: 24,
};

const CourseLogo: React.FC<CourseLogoProps> = ({
  variant,
  size = "medium",
}) => {
  const dimension = sizeToPixels[size];

  return (
    <Box
      component="img"
      src={variantToSrc[variant]}
      alt={`${variant} logo`}
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
