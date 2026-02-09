import { useTranslation } from "i18n/client";

import { useSearchParams } from "next/navigation";

import NavigationBar from "components/atoms/navigation/top-navigation-bars/NavigationBar/NavigationBar";

import { IDrawerController } from "../../drawer/DrawerContainer/DrawerContainer";

export interface ILessonsNavigationBar extends IDrawerController {}

const LessonsNavigationBar: React.FC<ILessonsNavigationBar> = ({
  onDrawerOpen,
}) => {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const lessonType = searchParams?.get("type");

  return (
    <NavigationBar
      header={t(`lessons.${lessonType?.toLowerCase()}`)}
      leftIconButton={{
        icon: "menu",
        onClick: onDrawerOpen,
      }}
      color="default"
    />
  );
};

export default LessonsNavigationBar;
