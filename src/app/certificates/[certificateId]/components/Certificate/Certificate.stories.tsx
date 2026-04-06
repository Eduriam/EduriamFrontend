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
    createdAt: {
      control: "text",
      description: "Certificate issuance date",
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
