import Box from "@mui/material/Box";

export type CourseLogoVariant = "HTML" | "JavaScript";

export type CourseLogoSize = "large" | "small";

const LOGO_ID_TO_VARIANT: Record<string, CourseLogoVariant> = {
  html: "HTML",
  javascript: "JavaScript",
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
   * Size of the logo. Large corresponds to 64px, small to 24px.
   *
   * Matches the Figma variants.
   */
  size?: CourseLogoSize;
}

const variantToSrc: Record<CourseLogoVariant, string> = {
  HTML: "/images/course-logo/html.svg",
  JavaScript: "/images/course-logo/javascript.svg",
};

const sizeToPixels: Record<CourseLogoSize, number> = {
  large: 64,
  small: 24,
};

const CourseLogo: React.FC<CourseLogoProps> = ({ variant, size = "large" }) => {
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
