"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

export interface IReviewPage {}

const ReviewPage: React.FC<IReviewPage> = () => {
  return (
    <PageRoot data-test="review-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Header variant="page" text="review page" />
      </ContentContainer>
    </PageRoot>
  );
};

export default ReviewPage;
