import { Illustration, type IllustrationName } from "@eduriam/ui-core";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface IValuePropositionListItemProps {
  /**
   * Main label displayed next to the illustration.
   */
  title: string;
  /**
   * Optional supporting text shown under the title.
   */
  description?: string;
  /**
   * Name of the illustration from `@eduriam/ui-core`.
   */
  illustrationName: IllustrationName;
}

const ValuePropositionListItem: React.FC<IValuePropositionListItemProps> = ({
  title,
  description,
  illustrationName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        px: "4px",
        py: "16px",
        width: "100%",
        maxWidth: 345,
      }}
      data-test="value-proposition-list-item"
    >
      <Box
        sx={{
          width: "64px",
          height: "64px",
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Illustration name={illustrationName} width={64} height={64} />
      </Box>

      <Box
        sx={{
          flex: "1 0 0",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            lineHeight: 1,
            fontWeight: 400,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: 1,
              fontWeight: 400,
              color: "text.secondary",
            }}
          >
            {description}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ValuePropositionListItem;
