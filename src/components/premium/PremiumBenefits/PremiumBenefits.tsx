import { Illustration } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";

import Box from "@mui/material/Box";
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

const FREE_COLUMN_WIDTH = { xs: 72, sm: 80 };
const PREMIUM_COLUMN_WIDTH = { xs: 72, sm: 80 };
const BENEFITS_COLUMNS_GAP = { xs: 6, sm: 8 };
const BENEFIT_ROW_VERTICAL_PADDING = 4;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X = 16;
const PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y = 4;

const PREMIUM_INNER_BOX_WIDTH = { xs: 82, sm: 89 };
const BENEFITS_GRID_TEMPLATE_COLUMNS = {
  xs: `minmax(0, 1fr) ${FREE_COLUMN_WIDTH.xs}px ${PREMIUM_COLUMN_WIDTH.xs}px`,
  sm: `minmax(0, 1fr) ${FREE_COLUMN_WIDTH.sm}px ${PREMIUM_COLUMN_WIDTH.sm}px`,
};

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
          top: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y,
          right: -PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X,
          width: {
            xs:
              PREMIUM_COLUMN_WIDTH.xs + PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2,
            sm:
              PREMIUM_COLUMN_WIDTH.sm + PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_X * 2,
          },
          height: `calc(100% + ${PREMIUM_COLUMN_HIGHLIGHT_OVERFLOW_Y * 2}px)`,
          borderRadius: 4,
          backgroundImage:
            "linear-gradient(92.290608deg, rgb(255, 233, 181) 6.5812%, rgb(255, 170, 65) 93.315%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: BENEFITS_GRID_TEMPLATE_COLUMNS,
          columnGap: BENEFITS_COLUMNS_GAP,
          position: "relative",
        }}
      >
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{
            minWidth: 0,
            overflowWrap: "break-word",
            py: BENEFIT_ROW_VERTICAL_PADDING,
            zIndex: 4,
          }}
        >
          {t("premium.table.benefits")}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={700}
          align="center"
          sx={{
            minWidth: 0,
            overflowWrap: "break-word",
            py: BENEFIT_ROW_VERTICAL_PADDING,
            zIndex: 4,
          }}
        >
          {t("premium.table.free")}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={700}
          align="center"
          color="common.black"
          sx={{
            minWidth: 0,
            overflowWrap: "break-word",
            py: BENEFIT_ROW_VERTICAL_PADDING,
            zIndex: 4,
          }}
        >
          {t("premium.table.premium")}
        </Typography>

        <Box
          sx={{
            alignSelf: "stretch",
            bgcolor: "background.default",
            borderRadius: 4,
            gridColumn: 3,
            gridRow: `2 / span ${BENEFITS.length}`,
            justifySelf: "center",
            pointerEvents: "none",
            width: PREMIUM_INNER_BOX_WIDTH,
            zIndex: 3,
          }}
        />

        {BENEFITS.map((benefit, benefitIndex) => {
          const gridRow = benefitIndex + 2;

          return (
            <Box
              key={`${benefit.id}-divider`}
              sx={{
                alignSelf: "start",
                borderTop: "1px solid",
                borderColor: "divider",
                gridColumn: "1 / 4",
                gridRow,
                mr: {
                  xs: `${PREMIUM_COLUMN_WIDTH.xs}px`,
                  sm: `${PREMIUM_COLUMN_WIDTH.sm}px`,
                },
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          );
        })}

        {BENEFITS.slice(1).map((benefit, benefitIndex) => {
          const gridRow = benefitIndex + 3;

          return (
            <Box
              key={`${benefit.id}-premium-divider`}
              sx={{
                alignSelf: "start",
                borderTop: "1px solid",
                borderColor: "divider",
                gridColumn: 3,
                gridRow,
                justifySelf: "center",
                pointerEvents: "none",
                width: {
                  xs: PREMIUM_INNER_BOX_WIDTH.xs - 8,
                  sm: PREMIUM_INNER_BOX_WIDTH.sm - 8,
                },
                zIndex: 4,
              }}
            />
          );
        })}

        {BENEFITS.map((benefit, benefitIndex) => {
          const gridRow = benefitIndex + 2;

          return (
            <Box
              key={`${benefit.id}-label`}
              sx={{
                alignItems: "center",
                alignSelf: "stretch",
                display: "flex",
                gridColumn: 1,
                gridRow,
                minWidth: 0,
                py: BENEFIT_ROW_VERTICAL_PADDING,
                zIndex: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{ minWidth: 0, overflowWrap: "break-word" }}
              >
                {t(benefit.titleKey)}
              </Typography>
            </Box>
          );
        })}

        {BENEFITS.map((benefit, benefitIndex) => {
          const gridRow = benefitIndex + 2;

          return (
            <Box
              key={`${benefit.id}-free`}
              sx={{
                alignItems: "center",
                alignSelf: "stretch",
                display: "flex",
                gridColumn: 2,
                gridRow,
                justifyContent: "center",
                minWidth: 0,
                py: BENEFIT_ROW_VERTICAL_PADDING,
                zIndex: 4,
              }}
            >
              {benefit.free ? (
                <Illustration name="check" width={22} height={22} />
              ) : (
                <Illustration name="cross" width={22} height={22} />
              )}
            </Box>
          );
        })}

        {BENEFITS.map((benefit, benefitIndex) => {
          const gridRow = benefitIndex + 2;

          return (
            <Box
              key={`${benefit.id}-premium`}
              sx={{
                alignItems: "center",
                alignSelf: "stretch",
                display: "flex",
                gridColumn: 3,
                gridRow,
                justifyContent: "center",
                minWidth: 0,
                py: BENEFIT_ROW_VERTICAL_PADDING,
                zIndex: 4,
              }}
            >
              {benefit.premium ? (
                <Illustration name="check" width={22} height={22} />
              ) : (
                <Illustration name="cross" width={22} height={22} />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PremiumBenefits;
