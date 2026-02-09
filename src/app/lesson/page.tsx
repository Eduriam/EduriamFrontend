"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";

export interface ILessonPage {}

const LessonPage: React.FC<ILessonPage> = () => {
  return (
    <PageRoot data-test="lesson-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Stack spacing={3} sx={{ py: 3 }}>
          <Header variant="page" text="Lesson" />
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default LessonPage;

