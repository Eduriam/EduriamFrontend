"use client";

import {
  ContentContainer,
  FullscreenDialog,
  LargeButton,
} from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import { useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const DEFAULT_MINIMUM_VIEW_MS = 5000;
const DEFAULT_AD_STATUS_TIMEOUT_MS = 10000;
const DEFAULT_AD_REQUEST_RAF_ATTEMPTS = 30;
const AD_WIDTH_PX = 300;
const AD_HEIGHT_PX = 300;
const AD_READY_STATUSES = new Set(["filled", "unfilled"]);

function parseAdTestEnabled(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue === "on" || normalizedValue === "true";
}

export interface AdvertisementDialogProps {
  open: boolean;
  onContinue: () => void;
}

const AdvertisementDialog: React.FC<AdvertisementDialogProps> = ({
  open,
  onContinue,
}) => {
  const { t } = useTranslation("common");

  const adElementRef = useRef<HTMLModElement | null>(null);
  const adStatusResolvedRef = useRef(false);
  const adRequestSentRef = useRef(false);

  const [isMinimumViewElapsed, setIsMinimumViewElapsed] = useState(false);
  const [isAdReady, setIsAdReady] = useState(false);

  const adClient = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  const adSlot =
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT ||
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_DESKTOP ||
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_MOBILE;
  const isAdTestEnabled = parseAdTestEnabled(
    process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ADTEST,
  );

  const canContinue = isMinimumViewElapsed && isAdReady;

  useEffect(() => {
    if (!open) {
      setIsMinimumViewElapsed(false);
      setIsAdReady(false);
      adStatusResolvedRef.current = false;
      adRequestSentRef.current = false;
      return;
    }

    const minimumViewTimer = window.setTimeout(() => {
      setIsMinimumViewElapsed(true);
    }, DEFAULT_MINIMUM_VIEW_MS);

    const resolveAdStatus = () => {
      if (adStatusResolvedRef.current) {
        return;
      }

      adStatusResolvedRef.current = true;
      setIsAdReady(true);
    };

    const statusFallbackTimer = window.setTimeout(() => {
      resolveAdStatus();
    }, DEFAULT_AD_STATUS_TIMEOUT_MS);

    if (!adClient || !adSlot) {
      resolveAdStatus();

      return () => {
        window.clearTimeout(minimumViewTimer);
        window.clearTimeout(statusFallbackTimer);
      };
    }

    const adElement = adElementRef.current;
    if (!adElement) {
      resolveAdStatus();

      return () => {
        window.clearTimeout(minimumViewTimer);
        window.clearTimeout(statusFallbackTimer);
      };
    }

    const checkAdStatus = () => {
      const status = adElement.getAttribute("data-ad-status");

      if (status && AD_READY_STATUSES.has(status)) {
        resolveAdStatus();
      }
    };

    const observer = new MutationObserver(checkAdStatus);
    observer.observe(adElement, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });
    checkAdStatus();

    let requestAnimationFrameId: number | null = null;
    let attempts = 0;

    const requestAdWhenSlotIsRenderable = () => {
      if (adRequestSentRef.current) {
        return;
      }

      const slotWidth = adElement.offsetWidth;
      const slotHeight = adElement.offsetHeight;
      const isRenderable = slotWidth > 0 && slotHeight > 0;

      if (isRenderable) {
        adRequestSentRef.current = true;

        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          resolveAdStatus();
        }
        return;
      }

      if (attempts >= DEFAULT_AD_REQUEST_RAF_ATTEMPTS) {
        resolveAdStatus();
        return;
      }

      attempts += 1;
      requestAnimationFrameId = window.requestAnimationFrame(
        requestAdWhenSlotIsRenderable,
      );
    };

    requestAdWhenSlotIsRenderable();

    return () => {
      observer.disconnect();
      if (requestAnimationFrameId !== null) {
        window.cancelAnimationFrame(requestAnimationFrameId);
      }
      window.clearTimeout(minimumViewTimer);
      window.clearTimeout(statusFallbackTimer);
    };
  }, [adClient, adSlot, open]);

  return (
    <FullscreenDialog
      open={open}
      onClose={() => undefined}
      dataTest="advertisement-fullscreen-dialog"
    >
      <ContentContainer
        width="small"
        justifyContent="space-between"
        paddingTop="medium"
      >
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", mt: 6 }}>
          <Box
            sx={{
              width: "100%",
              maxWidth: AD_WIDTH_PX + 24,
              minHeight: AD_HEIGHT_PX + 24,
              bgcolor: "background.paper",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              {t("advertisementDialog.fallbackLabel")}
            </Typography>
            {adClient && adSlot ? (
              <ins
                ref={adElementRef}
                key={adSlot}
                className="adsbygoogle"
                style={{
                  display: "inline-block",
                  width: `${AD_WIDTH_PX}px`,
                  height: `${AD_HEIGHT_PX}px`,
                  position: "relative",
                  zIndex: 1,
                }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-adtest={isAdTestEnabled ? "on" : undefined}
              />
            ) : null}
          </Box>

          <Typography variant="body1" color="text.secondary" textAlign="center">
            {t("advertisementDialog.subtitle")}
          </Typography>
        </Stack>

        <LargeButton
          fullWidth
          disabled={!canContinue}
          onClick={onContinue}
          data-test="advertisement-continue-button"
        >
          {t("userActions.continue")}
        </LargeButton>
      </ContentContainer>
    </FullscreenDialog>
  );
};

export default AdvertisementDialog;
