"use client";

import { useTranslation } from "i18n/client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import FullWidthButton from "components/atoms/FullWidthButton/FullWidthButton";

export interface ISubscribedPage {}

const SubscribedPage: React.FC<ISubscribedPage> = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {t("subscribed.thankYou")}
      </Typography>

      <Box>
        <Image
          src={"/images/subscription/subscribed.svg"}
          alt="Subscribed"
          width={400}
          height={265}
        />
      </Box>

      <Typography variant="body1" sx={{ textAlign: "center", mb: 8 }}>
        {t("subscribed.subscriptionActivated")}
      </Typography>

      <FullWidthButton onClick={() => router.push("/")}>
        {t("userActions.continue")}
      </FullWidthButton>
    </Box>
  );
};

export default SubscribedPage;
