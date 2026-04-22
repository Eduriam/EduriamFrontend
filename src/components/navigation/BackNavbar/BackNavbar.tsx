"use client";

import { BasicNavbar } from "@eduriam/ui-core";
import { useRouter } from "next/navigation";
import useTransitionNavigationHandler from "util/hooks/useTransitionNavigationHandler";

type BasicNavbarProps = React.ComponentProps<typeof BasicNavbar>;

export interface IBackNavbarProps extends Omit<BasicNavbarProps, "leftButton"> {
  withTransition: boolean;
  route?: string;
  useRouterBack?: boolean;
  leftButtonDataTest?: string;
}

const BackNavbar: React.FC<IBackNavbarProps> = ({
  withTransition,
  route,
  useRouterBack = false,
  leftButtonDataTest,
  ...basicNavbarProps
}) => {
  const router = useRouter();
  const navigateWithTransition = useTransitionNavigationHandler();

  const handleBackClick = () => {
    if (!route || useRouterBack) {
      router.back();
      return;
    }

    if (withTransition) {
      navigateWithTransition(route, { direction: "back" })();
      return;
    }

    router.push(route);
  };

  return (
    <BasicNavbar
      {...basicNavbarProps}
      leftButton={{
        icon: "arrowLeft",
        onClick: handleBackClick,
        dataTest: leftButtonDataTest,
      }}
    />
  );
};

export default BackNavbar;
