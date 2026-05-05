"use client";

import { BasicNavbar, ContentContainer, PageRoot } from "@eduriam/ui-core";
import { parseId } from "util/functions/api";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import PageNavigation from "components/navigation/PageNavigation/PageNavigation";

import { CertificatesService } from "infrastructure/services/certificates/CertificatesService";

import Certificate from "./components/Certificate/Certificate";

export interface ICertificatePage {}

const CertificatePage: React.FC<ICertificatePage> = () => {
  const router = useRouter();
  const params = useParams();
  const certificateId = parseId(params?.certificateId);

  const { certificate } = CertificatesService.useCertificate(certificateId ?? 0);

  useEffect(() => {
    if (certificateId === undefined) {
      router.replace("/courses");
    }
  }, [certificateId, router]);

  const handleClose = () => {
    // Prefer going back in history when possible; fall back to courses list.
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/courses");
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return;
    }

    const shareUrl = window.location.href;
    const title = "Eduriam certificate";
    const text = certificate
      ? `${certificate.userName} - ${certificate.productName}`
      : "Check out this Eduriam certificate";

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      } catch {
        // Ignore errors (user cancelled or share not available).
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch {
        // Silently ignore clipboard failures.
      }
    }
  };

  return (
    <PageRoot data-test="certificate-page">
      <PageNavigation
        topNavigation={
          <BasicNavbar
            leftButton={{
              icon: "close",
              onClick: handleClose,
            }}
            rightButton={{
              icon: "share",
              onClick: handleShare,
            }}
          />
        }
        mainNavigation="hidden"
      />
      <ContentContainer
        width="medium"
        justifyContent="flex-start"
        paddingTop="small"
      >
        <Certificate
          userName={certificate?.userName ?? ""}
          courseName={certificate?.productName ?? ""}
          createdAt={certificate?.createdAt ?? ""}
          data-test="certificate-section"
        />
      </ContentContainer>
    </PageRoot>
  );
};

export default CertificatePage;
