"use client";

import { useTranslation } from "i18n/client";
import theme from "styles/theme";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Container, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const desktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth="sm" sx={{ justifyContent: "center", display: "flex" }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ pt: 8 }}
      >
        <Box>
          <Image
            src={"/images/404-image.svg"}
            alt="404"
            width={desktop ? 500 : 350}
            height={desktop ? 332 : 232}
          />
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 8, mt: 4 }}>
          {t("404.header")}
        </Typography>
        <Button onClick={() => router.push("/")} variant="contained">
          {t("404.backToHome")}
        </Button>
      </Box>{" "}
    </Container>
  );
}
