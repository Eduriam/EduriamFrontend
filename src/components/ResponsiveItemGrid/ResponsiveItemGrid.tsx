"use client";

import type { ReactNode } from "react";

import Box from "@mui/material/Box";

export interface IResponsiveItemGrid {
  children: ReactNode;
  gap?: number;
  "data-test"?: string;
}

const FOUR_COLUMN_MIN_WIDTH = 380;

const ResponsiveItemGrid: React.FC<IResponsiveItemGrid> = ({
  children,
  gap = 1.5,
  "data-test": dataTest,
}) => {
  return (
    <Box
      data-test={dataTest}
      sx={{
        display: "grid",
        gap,
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        "> *": {
          minWidth: 0,
        },
        width: "100%",
        [`@media (min-width: ${FOUR_COLUMN_MIN_WIDTH}px)`]: {
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveItemGrid;
