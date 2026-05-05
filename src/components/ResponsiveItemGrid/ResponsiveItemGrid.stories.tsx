import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Box from "@mui/material/Box";

import ResponsiveItemGrid, {
  type IResponsiveItemGrid,
} from "./ResponsiveItemGrid";

export default {
  title: "components/ResponsiveItemGrid",
  component: ResponsiveItemGrid,
} as ComponentMeta<typeof ResponsiveItemGrid>;

const Template: ComponentStory<typeof ResponsiveItemGrid> = (args) => (
  <ResponsiveItemGrid {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: Array.from({ length: 8 }, (_, index) => (
    <Box
      key={index}
      sx={{
        aspectRatio: "1 / 1",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}
    />
  )),
} as IResponsiveItemGrid;
