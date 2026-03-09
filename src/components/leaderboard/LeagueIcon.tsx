import Box from "@mui/material/Box";

export type LeagueIconVariant =
  | "empty"
  | "locked"
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "emerald"
  | "ruby"
  | "sapphire"
  | "diamond"
  | "mythic";

export type LeagueIconSize = "small" | "medium" | "large";

export interface LeagueIconProps {
  /**
   * Visual variant of the leaderboard badge.
   */
  variant: LeagueIconVariant;
  /**
   * Size of the badge.
   *
   * - small: 32px
   * - medium: 64px
   * - large: 90px
   */
  size?: LeagueIconSize | number;
}

const variantToSrc: Record<LeagueIconVariant, string> = {
  empty: "/images/leaderboard/empty.svg",
  locked: "/images/leaderboard/locked.svg",
  iron: "/images/leaderboard/iron.svg",
  bronze: "/images/leaderboard/bronze.svg",
  silver: "/images/leaderboard/silver.svg",
  gold: "/images/leaderboard/gold.svg",
  platinum: "/images/leaderboard/platinum.svg",
  emerald: "/images/leaderboard/emerald.svg",
  ruby: "/images/leaderboard/ruby.svg",
  sapphire: "/images/leaderboard/sapphire.svg",
  diamond: "/images/leaderboard/diamond.svg",
  mythic: "/images/leaderboard/mythic.svg",
};

const sizeToPixels: Record<LeagueIconSize, number> = {
  small: 32,
  medium: 64,
  large: 90,
};

const LeagueIcon: React.FC<LeagueIconProps> = ({
  variant,
  size = "medium",
}) => {
  const dimension = typeof size === "number" ? size : sizeToPixels[size];

  return (
    <Box
      component="img"
      src={variantToSrc[variant]}
      alt={`${variant} leaderboard badge`}
      sx={{
        width: dimension,
        height: dimension,
        display: "block",
        objectFit: "contain",
      }}
    />
  );
};

export default LeagueIcon;
