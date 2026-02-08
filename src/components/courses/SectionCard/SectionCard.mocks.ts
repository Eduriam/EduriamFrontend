import { action } from "@storybook/addon-actions";

import type { ISectionCard } from "./SectionCard";

export const mockSectionCardProps: ISectionCard = {
  title: "Basics",
  expanded: false,
  onToggle: action("onToggle"),
};
