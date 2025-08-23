import { useCallback, useEffect, useRef, useState } from "react";

import Box from "@mui/material/Box";

import FeedPaginationPage from "../FeedPaginationPage/FeedPaginationPage";

export interface IFeedOverview {}

const FeedOverview: React.FC<IFeedOverview> = () => {
  const loader = useRef(null);
  const [pageCounter, setPageCounter] = useState(1);
  const [pagewithDivider, setPageWithDivider] = useState<number | undefined>(
    undefined,
  );

  const pages = [];
  for (let i = 0; i < pageCounter; i++) {
    pages.push(
      <FeedPaginationPage
        key={i}
        index={i}
        onDividerDisplayed={() => setPageWithDivider(i)}
        displayDivider={pagewithDivider === i || pagewithDivider === undefined}
      />,
    );
  }

  // Source: https://medium.com/suyeonme/react-how-to-implement-an-infinite-scroll-749003e9896a
  const handleObserver = useCallback(
    (entries: Array<IntersectionObserverEntry>) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPageCounter((prev) => prev + 1);
      }
    },
    [],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {pages}
      </Box>
      <Box ref={loader} />
    </Box>
  );
};

export default FeedOverview;
