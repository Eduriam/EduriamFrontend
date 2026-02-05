import type { ComponentMeta, ComponentStory } from "@storybook/react";

import CareerPathCard, { ICareerPathCard } from "./CareerPathCard";
import { mockCareerPathCardProps } from "./CareerPathCard.mocks";

export default {
  title: "courses/CareerPathCard",
  component: CareerPathCard,
  argTypes: {},
} as ComponentMeta<typeof CareerPathCard>;

const Template: ComponentStory<typeof CareerPathCard> = (args) => (
  <CareerPathCard {...args} />
);

export const Default = Template.bind({});
export const Enrolled = Template.bind({});

Default.args = {
  ...mockCareerPathCardProps.default,
} as ICareerPathCard;

Enrolled.args = {
  ...mockCareerPathCardProps.enrolled,
} as ICareerPathCard;
