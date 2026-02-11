import type { ComponentMeta, ComponentStory } from "@storybook/react";

import StudyPreview, { type IStudyPreviewProps } from "./StudyPreview";
import { mockStudyPreviewProps } from "./StudyPreview.mocks";

export default {
  title: "home/StudyPreview",
  component: StudyPreview,
  argTypes: {},
} as ComponentMeta<typeof StudyPreview>;

const Template: ComponentStory<typeof StudyPreview> = (args) => (
  <StudyPreview {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockStudyPreviewProps,
} as IStudyPreviewProps;
