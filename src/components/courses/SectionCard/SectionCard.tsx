"use client";

import { Card, Header, IconButton } from "@eduriam/ui-core";

import { Stack } from "@mui/material";

export interface ISectionCard {
  /** Section title (e.g. "Basics"). */
  title: string;
  /** Whether the section content is expanded. */
  expanded: boolean;
  /** Called when the card is clicked to toggle expand/collapse. */
  onToggle: () => void;
  /** Optional data attribute for E2E tests. */
  "data-test"?: string;
}

const SectionCard: React.FC<ISectionCard> = ({
  title,
  expanded,
  onToggle,
  "data-test": dataTest,
}) => {
  return (
    <Card
      variant="clickable"
      paddingX="medium"
      paddingY="large"
      onClick={onToggle}
      data-test={dataTest}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        gap={4}
        sx={{
          width: "100%",
        }}
      >
        <IconButton
          variant="contained"
          size="small"
          icon={expanded ? "arrowDown" : "arrowRight"}
          color="textPrimary"
        />
        <Header variant="section" text={title} />
      </Stack>
    </Card>
  );
};

export default SectionCard;
