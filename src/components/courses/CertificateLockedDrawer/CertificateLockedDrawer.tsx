"use client";

import { Drawer, Illustration, LargeButton, Paragraph } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ICertificateLockedDrawer {
  /** Whether the drawer is open. */
  open: boolean;
  /** Called when the drawer should close (e.g. backdrop click or continue button). */
  onClose: () => void;
  /** Optional data attribute for the drawer (E2E tests). */
  "data-test"?: string;
  /** Optional data attribute for the continue button (E2E tests). */
  "data-test-continue"?: string;
}

const CertificateLockedDrawer: React.FC<ICertificateLockedDrawer> = ({
  open,
  onClose,
  "data-test": dataTest,
  "data-test-continue": dataTestContinue,
}) => {
  const { t } = useTranslation("common");

  return (
    <Drawer open={open} onClose={onClose} data-test={dataTest}>
      <Stack spacing={8} sx={{ width: "100%", textAlign: "center" }}>
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ width: "100%", paddingY: 8 }}
        >
          <Illustration name="certificate" width={160} height={160} />
          <Typography variant="h4" align="center">
            {t("certificateLockedDrawer.title")}
          </Typography>
          <Paragraph text={t("certificateLockedDrawer.description")} />
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <LargeButton onClick={onClose} data-test={dataTestContinue} fullWidth>
            {t("certificateLockedDrawer.continue")}
          </LargeButton>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default CertificateLockedDrawer;
