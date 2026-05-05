"use client";

import { ContentContainer, PageRoot } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export interface ILoadingScreen {
  label?: string;
}

const LoadingScreen: React.FC<ILoadingScreen> = ({ label }) => {
  const { t } = useTranslation("common");
  const loadingLabel = label ?? t("loading");

  return (
    <PageRoot data-test="loading-screen">
      <ContentContainer width="small" justifyContent="center" spacing={4}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={8}
        >
          <CircularProgress color="primary" thickness={6} size={56} />
          <Typography variant="body1" color="text.secondary" textAlign="center">
            {loadingLabel}
          </Typography>
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default LoadingScreen;
