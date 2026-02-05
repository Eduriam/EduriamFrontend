import Box from "@mui/material/Box";

export type CourseLogoVariant = "HTML" | "JavaScript";

export type CourseLogoSize = "large" | "small";

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
