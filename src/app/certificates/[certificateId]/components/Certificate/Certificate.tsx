"use client";

import { Divider, Header, Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface ICertificate {
  /** Full name of the certificate recipient. */
  userName: string;
  /** Name of the completed course. */
  courseName: string;
  /** Date when the course was completed (formatted string, e.g. "July 23, 2026"). */
  completedAt: string;
  /** Name of the signatory (e.g. CEO). */
  signatoryName?: string;
  /** Title/role of the signatory (e.g. "CEO of Company"). */
  signatoryTitle?: string;
  /** Optional data attribute for E2E tests. */
  "data-test"?: string;
}

const Certificate: React.FC<ICertificate> = ({
  userName,
  courseName,
  completedAt,
  signatoryName,
  signatoryTitle,
  "data-test": dataTest,
}) => {
  const { t } = useTranslation("common");

  return (
    <Box
      data-test={dataTest}
      sx={{
        backgroundColor: "background.default",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        maxWidth: "1000px",
        width: "100%",
      }}
    >
      <Stack
        spacing={25}
        sx={{
          px: 3,
          py: 8,
          alignItems: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Illustration name="eduriam-logo" width={32} height={32} />
          <Header
            variant="section"
            text={t("certificate.projectTitle")}
            align="center"
          />
        </Box>

        <Stack spacing={8} alignItems="center">
          <Header
            variant="subsection"
            text={t("certificate.certificateOfCompletion")}
            align="center"
          />

          <Typography variant="h3" align="center">
            {userName}
          </Typography>

          <Stack spacing={4} alignItems="center">
            <Typography variant="body1" align="center" color="text.secondary">
              {t("certificate.successfullyCompletedTheCourse")}
            </Typography>

            <Header variant="section" text={courseName} align="center" />

            <Typography variant="body1" align="center" color="text.secondary">
              {completedAt}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={8} alignItems="center">
          <Box sx={{ width: "100%", my: 1 }}>
            <Box
              component="img"
              src="/images/certificates/signature.svg"
              alt={t("certificate.signatureAlt") as string}
              sx={{
                height: 40,
                width: "auto",
                objectFit: "contain",
                mb: -4,
              }}
            />
            <Divider />
          </Box>

          <Stack spacing={0} alignItems="center">
            {signatoryName !== undefined && signatoryName !== null && (
              <Typography variant="body1" align="center" color="text.secondary">
                {signatoryName}
              </Typography>
            )}

            {signatoryTitle !== undefined && signatoryTitle !== null && (
              <Typography variant="body1" align="center" color="text.secondary">
                {signatoryTitle}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Certificate;
