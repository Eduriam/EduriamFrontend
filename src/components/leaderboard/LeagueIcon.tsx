import Box from "@mui/material/Box";

export type LeagueIconVariant =
  | "Empty"
  | "Locked"
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Emerald"
  | "Ruby"
  | "Sapphire"
  | "Diamond"
  | "Mythic";

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
  size?: LeagueIconSize;
}

const variantToSrc: Record<LeagueIconVariant, string> = {
  Empty: "/images/leaderboard/empty.svg",
  Locked: "/images/leaderboard/locked.svg",
  Iron: "/images/leaderboard/iron.svg",
  Bronze: "/images/leaderboard/bronze.svg",
  Silver: "/images/leaderboard/silver.svg",
  Gold: "/images/leaderboard/gold.svg",
  Platinum: "/images/leaderboard/platinum.svg",
  Emerald: "/images/leaderboard/emerald.svg",
  Ruby: "/images/leaderboard/ruby.svg",
  Sapphire: "/images/leaderboard/sapphire.svg",
  Diamond: "/images/leaderboard/diamond.svg",
  Mythic: "/images/leaderboard/mythic.svg",
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
  const dimension = sizeToPixels[size];

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
