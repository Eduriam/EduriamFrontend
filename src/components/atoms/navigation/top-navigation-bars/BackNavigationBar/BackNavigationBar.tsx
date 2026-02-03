import { BasicNavbar } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";

import { useRouter } from "next/navigation";

import { AppBarProps } from "@mui/material";

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
    <BasicNavbar
      header={header ? t(`navigation.${header}`) : undefined}
      leftButton={{
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
