import type { ICertificateLockedDrawer } from "./CertificateLockedDrawer";

export const mockCertificateLockedDrawerProps: ICertificateLockedDrawer = {
  open: false,
  onClose: () => {},
  "data-test": "certificate-locked-drawer",
  "data-test-continue": "certificate-locked-drawer-continue",
};
