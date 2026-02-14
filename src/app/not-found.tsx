"use client";

import {
  ContentContainer,
  Header,
  Illustration,
  LargeButton,
  PageRoot,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

import Stack from "@mui/material/Stack";

export default function NotFound() {
  const { t } = useTranslation("common");
  const navigateWithTransition = useTransitionNavigationHandler();

  return (
    <PageRoot data-test="not-found-page">
      <ContentContainer width="small" justifyContent="space-between">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={16}
          flexGrow={1}
        >
          <Illustration name="magnifyingGlass" width={200} height={200} />
          <Header variant="section" text={t("404.header")} align="center" />
        </Stack>

        <LargeButton
          variant="contained"
          fullWidth
          onClick={navigateWithTransition("/")}
          data-test="not-found-home-button"
        >
          {t("404.backToHome")}
        </LargeButton>
      </ContentContainer>
    </PageRoot>
  );
}
