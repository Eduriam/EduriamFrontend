import { ComponentMeta, ComponentStory } from "@storybook/react";

import GoogleAdsense, { IGoogleAdsense } from "./GoogleAdsense";
import { mockGoogleAdsenseProps } from "./GoogleAdsense.mocks";

export default {
  title: "atoms/GoogleAdsense",
  component: GoogleAdsense,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof GoogleAdsense>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GoogleAdsense> = (args) => (
  <GoogleAdsense {...args} />
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockGoogleAdsenseProps.base,
} as IGoogleAdsense;
