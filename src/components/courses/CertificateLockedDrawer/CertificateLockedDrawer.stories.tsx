import { ComponentMeta, ComponentStory } from "@storybook/react";

import CertificateLockedDrawer, {
  type ICertificateLockedDrawer,
} from "./CertificateLockedDrawer";
import { mockCertificateLockedDrawerProps } from "./CertificateLockedDrawer.mocks";

export default {
  title: "courses/CertificateLockedDrawer",
  component: CertificateLockedDrawer,
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the drawer is open",
    },
    onClose: { action: "close" },
  },
} as ComponentMeta<typeof CertificateLockedDrawer>;

const Template: ComponentStory<typeof CertificateLockedDrawer> = (args) => (
  <CertificateLockedDrawer {...args} />
);

export const Open = Template.bind({});

Open.args = {
  ...mockCertificateLockedDrawerProps,
  open: true,
} as ICertificateLockedDrawer;
