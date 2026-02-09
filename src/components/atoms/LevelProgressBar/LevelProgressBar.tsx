import { Icon } from "@eduriam/ui-core";
import theme from "styles/theme";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface ILevelProgressBar {
  progress: number; // Number between 0 and 100
}

const LevelProgressBar: React.FC<ILevelProgressBar> = ({ progress }) => {
  const mobileIconSizes = ["30px", "40px", "54px", "40px", "30px"];
  const desktopIconSizes = ["40px", "50px", "64px", "50px", "40px"];

  function fillStar(starIndex: number) {
    return (5 * progress) / 100 >= starIndex + 1;
  }

  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  function renderStars() {
    const iconSizes = desktop ? desktopIconSizes : mobileIconSizes;

    return iconSizes.map((size, i) => (
      <>
        {fillStar(i) ? (
          <Icon
            key={i}
            sx={{
              fontSize: size,
              textShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              color: "#FFD700",
            }}
            name="star"
          />
        ) : (
          <Icon
            key={i}
            sx={{
              fontSize: size,
              color: "#383838",
            }}
            name="star"
          />
        )}
      </>
    ));
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {renderStars()}
    </Box>
  );
};

export default LevelProgressBar;
