import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export interface PremiumBenefitsProps {
  dataTest?: string;
}

type BenefitItem = {
  id: string;
  titleKey: string;
  free: boolean;
  premium: boolean;
};

const PREMIUM_COLUMN_WIDTH = 80;
const BENEFITS_COLUMNS_GAP = 8;
const BENEFIT_ROW_VERTICAL_PADDING = 4;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X = 16;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y = 4;

const PREMIUM_INNER_BOX_WIDTH = 89;
const PREMIUM_INNER_BOX_TOP = 56;
const PREMIUM_INNER_BOX_BOTTOM = 8;

const BENEFITS: BenefitItem[] = [
  {
    id: "daily-learning",
    titleKey: "premium.benefits.dailyLearning",
    free: true,
    premium: true,
  },
  {
    id: "unlimited-learning",
    titleKey: "premium.benefits.unlimitedLearning",
    free: false,
    premium: true,
  },
  {
    id: "no-ads",
    titleKey: "premium.benefits.noAds",
    free: false,
    premium: true,
  },
  {
    id: "smart-reviews",
    titleKey: "premium.benefits.smartReviews",
    free: false,
    premium: true,
  },
  {
    id: "certificates",
    titleKey: "premium.benefits.certificates",
    free: false,
    premium: true,
  },
];

const PremiumBenefits: React.FC<PremiumBenefitsProps> = ({ dataTest }) => {
  const { t } = useTranslation("common");

  return (
    <Box sx={{ position: "relative", width: "100%" }} data-test={dataTest}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: BENEFITS.length }).map((_, dividerIndex) => (
          <Box
            key={`long-divider-${dividerIndex}`}
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${((dividerIndex + 1) / (BENEFITS.length + 1)) * 100}%`,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y,
          right: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X,
          width:
            PREMIUM_COLUMN_WIDTH + PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2,
          height: `calc(100% + ${PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y * 2}px)`,
          borderRadius: 4,
          backgroundImage:
            "linear-gradient(92.290608deg, rgb(255, 233, 181) 6.5812%, rgb(255, 170, 65) 93.315%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: PREMIUM_INNER_BOX_TOP,
            bottom: PREMIUM_INNER_BOX_BOTTOM,
            right:
              (PREMIUM_COLUMN_WIDTH +
                PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2 -
                PREMIUM_INNER_BOX_WIDTH) /
              2,
            width: PREMIUM_INNER_BOX_WIDTH,
            borderRadius: 4,
            bgcolor: "background.default",
            overflow: "hidden",
            zIndex: 3,
          }}
        ></Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: BENEFITS.length - 1 }).map((_, dividerIndex) => (
          <Box
            key={`premium-inner-divider-${dividerIndex}`}
            sx={{
              position: "absolute",
              right:
                -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X +
                (PREMIUM_COLUMN_WIDTH +
                  PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2 -
                  PREMIUM_INNER_BOX_WIDTH) /
                  2 +
                4,
              width: PREMIUM_INNER_BOX_WIDTH - 8,
              top: `${((dividerIndex + 2) / (BENEFITS.length + 1)) * 100}%`,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          />
        ))}
      </Box>
      <Stack spacing={0} sx={{ position: "relative", zIndex: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `1fr ${PREMIUM_COLUMN_WIDTH}px ${PREMIUM_COLUMN_WIDTH}px`,
            columnGap: BENEFITS_COLUMNS_GAP,
            alignItems: "center",
            py: BENEFIT_ROW_VERTICAL_PADDING,
          }}
        >
          <Typography variant="body1" fontWeight={700}>
            {t("premium.table.benefits")}
          </Typography>
          <Typography variant="body1" fontWeight={700} align="center">
            {t("premium.table.free")}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={700}
            align="center"
            color="common.black"
          >
            {t("premium.table.premium")}
          </Typography>
        </Box>

        {BENEFITS.map((benefit) => (
          <Box
            key={benefit.id}
            sx={{
              display: "grid",
              gridTemplateColumns: `1fr ${PREMIUM_COLUMN_WIDTH}px ${PREMIUM_COLUMN_WIDTH}px`,
              columnGap: BENEFITS_COLUMNS_GAP,
              alignItems: "center",
              py: BENEFIT_ROW_VERTICAL_PADDING,
            }}
          >
            <Typography variant="body1">{t(benefit.titleKey)}</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {benefit.free ? (
                <Illustration name="check" width={22} height={22} />
              ) : (
                <Illustration name="cross" width={22} height={22} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {benefit.premium ? (
                <Illustration name="check" width={22} height={22} />
              ) : (
                <Illustration name="cross" width={22} height={22} />
              )}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default PremiumBenefits;
