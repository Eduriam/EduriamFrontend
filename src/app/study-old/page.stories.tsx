import { ComponentMeta, ComponentStory } from "@storybook/react";

import Layout from "./layout";
import StudyPage, { IStudyPage } from "./page";
import { mockStudyPageProps } from "./page.mocks";

export default {
  title: "pages/StudyPage",
  component: StudyPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof StudyPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StudyPage> = (args) => (
  <Layout {...args}>
    <StudyPage {...args} />
  </Layout>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Base.args = {
  ...mockStudyPageProps.base,
} as IStudyPage;
