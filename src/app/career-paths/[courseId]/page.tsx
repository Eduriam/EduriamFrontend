"use client";

import { ContentContainer, Header, PageRoot } from "@eduriam/ui-core";

import { useParams } from "next/navigation";

import Stack from "@mui/material/Stack";

import CoursesAPI from "infrastructure/api/courses/CoursesAPI";

export interface ICareerPathPage {}

const CareerPathPage: React.FC<ICareerPathPage> = () => {
  const params = useParams<{ courseId: Id }>();
  const { course } = CoursesAPI.useCourse(params.courseId ?? "");

  return (
    <PageRoot data-test="career-path-page">
      <ContentContainer width="small" justifyContent="flex-start">
        <Stack spacing={3} sx={{ py: 3 }}>
          {course && (
            <Header variant="page" text={course.name} />
          )}
        </Stack>
      </ContentContainer>
    </PageRoot>
  );
};

export default CareerPathPage;
