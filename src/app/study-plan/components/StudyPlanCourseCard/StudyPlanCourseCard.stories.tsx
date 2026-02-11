import type { ComponentMeta, ComponentStory } from "@storybook/react";

import StudyPlanCourseCard, {
  type IStudyPlanCourseCard,
} from "./StudyPlanCourseCard";

export default {
  title: "study-plan/StudyPlanCourseCard",
  component: StudyPlanCourseCard,
  argTypes: {
    onPlayClick: { action: "play clicked" },
  },
} as ComponentMeta<typeof StudyPlanCourseCard>;

const Template: ComponentStory<typeof StudyPlanCourseCard> = (args) => (
  <StudyPlanCourseCard {...args} />
);

export const Base = Template.bind({});

Base.args = {
  title: "JavaScript",
  logoVariant: "JavaScript",
} as IStudyPlanCourseCard;

