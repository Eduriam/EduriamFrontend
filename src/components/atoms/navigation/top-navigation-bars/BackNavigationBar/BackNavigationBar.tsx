import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useRouter } from "next/navigation";

import { AppBarProps } from "@mui/material";

import NavigationBar from "components/atoms/navigation/top-navigation-bars/NavigationBar/NavigationBar";

export interface IBackNavigationBar {
  header?: string;
}

const BackNavigationBar: React.FC<IBackNavigationBar & AppBarProps> = ({
  header,
  ...rest
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <NavigationBar
      header={header ? t(`navigation.${header}`) : undefined}
      leftIconButton={{
        icon: icons.back,
        onClick: () => {
          router.back();
        },
      }}
      color="default"
      {...rest}
    />
  );
};

export default BackNavigationBar;
