import type { ComponentMeta, ComponentStory } from "@storybook/react";

import CourseLogo, {
  type CourseLogoProps,
  type CourseLogoVariant,
} from "./CourseLogo";

export default {
  title: "courses/CourseLogo",
  component: CourseLogo,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["html", "javascript", "css"] satisfies CourseLogoVariant[],
      },
    },
    size: {
      control: {
        type: "inline-radio",
        options: ["large", "small"],
      },
    },
  },
} as ComponentMeta<typeof CourseLogo>;

const Template: ComponentStory<typeof CourseLogo> = (args) => (
  <CourseLogo {...args} />
);

export const Default: ComponentStory<typeof CourseLogo> = Template.bind({});
Default.args = {
  variant: "html",
  size: "large",
} as CourseLogoProps;
