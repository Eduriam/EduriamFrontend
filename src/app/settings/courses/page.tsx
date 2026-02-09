"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

import Stack from "@mui/material/Stack";

export interface IManageCoursesPage {}

const ManageCoursesPage: React.FC<IManageCoursesPage> = () => {
  return (
    <PageRoot data-test="manage-courses-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Stack spacing={3} sx={{ py: 3 }}>
          <Header variant="page" text="Manage courses" />
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default ManageCoursesPage;

