import { ComponentMeta, ComponentStory } from "@storybook/react";

import Certificate, { type ICertificate } from "./Certificate";
import { mockCertificateProps } from "./Certificate.mocks";

export default {
  title: "courses/Certificate",
  component: Certificate,
  argTypes: {
    userName: {
      control: "text",
      description: "Full name of the certificate recipient",
    },
    courseName: {
      control: "text",
      description: "Name of the completed course",
    },
    completedAt: {
      control: "text",
      description: "Date when the course was completed",
    },
    signatoryName: {
      control: "text",
      description: "Name of the signatory",
    },
    signatoryTitle: {
      control: "text",
      description: "Title/role of the signatory",
    },
  },
} as ComponentMeta<typeof Certificate>;

const Template: ComponentStory<typeof Certificate> = (args) => (
  <Certificate {...args} />
);

export const Default = Template.bind({});

Default.args = {
  ...mockCertificateProps,
} as ICertificate;

export const WithoutSignatory = Template.bind({});

WithoutSignatory.args = {
  ...mockCertificateProps,
  signatoryName: undefined,
  signatoryTitle: undefined,
} as ICertificate;
