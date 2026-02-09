"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";

export interface IStudySessionPage {}

const StudySessionPage: React.FC<IStudySessionPage> = () => {
  return (
    <PageRoot data-test="study-session-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Stack spacing={3} sx={{ py: 3 }}>
          <Header variant="page" text="Study session" />
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default StudySessionPage;


