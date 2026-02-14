"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";

export interface IStudyPage {}

const StudyPage: React.FC<IStudyPage> = () => {
  return (
    <PageRoot data-test="study-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Stack spacing={3} sx={{ py: 3 }}>
          <Header variant="page" text="Study session" />
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default StudyPage;
