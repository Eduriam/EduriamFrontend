"use client";

import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import IconContainer from "components/atoms/IconContainer/IconContainer";
import SimpleCard from "components/atoms/cards/SimpleCard/SimpleCard";
import CardGrid from "components/layouts/CardGrid/CardGrid";

import { default as UserCoursesAPI } from "infrastructure/api/user/courses/UserCoursesAPI";
import useAuth from "infrastructure/services/AuthProvider";

export interface ICoursesPage {}

const CoursesPage: React.FC<ICoursesPage> = () => {
  const { user, revalidateUser } = useAuth();
  const { t: tCommon } = useTranslation("common");
  const router = useRouter();
  const { courses } = UserCoursesAPI.useUserCourses();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            {tCommon("navigation.myCourses")}
          </Typography>
          <IconButton onClick={() => router.push("/select-course")}>
            <IconContainer name={icons.add} />
          </IconButton>
        </Box>

        {courses && user && (
          <CardGrid
            align="left"
            cards={courses.map((course) => {
              return {
                component: SimpleCard,
                props: {
                  header: course.name,
                  imageUrl: course.thumbnailUrl,
                  highlightCard: user.selectedCourse.id === course.id,
                  highlightVariant: "outlined",
                  onClick: async () => {
                    await UserCoursesAPI.selectCourse(course.id);
                    await revalidateUser();
                    router.push("/");
                  },
                },
              };
            })}
          />
        )}
      </Box>
    </Box>
  );
};

export default CoursesPage;
