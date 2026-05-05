import { action } from "@storybook/addon-actions";

import type { ICertificateLockedDrawer } from "./CertificateLockedDrawer";

export const mockCertificateLockedDrawerProps: ICertificateLockedDrawer = {
  open: false,
  onClose: action("onClose"),
  "data-test": "certificate-locked-drawer",
  "data-test-continue": "certificate-locked-drawer-continue",
};
