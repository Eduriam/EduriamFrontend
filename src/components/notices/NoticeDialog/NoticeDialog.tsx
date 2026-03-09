import {
  ContentContainer,
  FullscreenDialog as CoreFullscreenDialog,
  Icon,
  type IconName,
  LargeButton,
} from "@eduriam/ui-core";

import { type ReactNode } from "react";

import { Stack } from "@mui/material";

import KeyPress from "components/atoms/KeyPress/KeyPress";

interface NoticeDialogButton {
  onClick?: () => void;
  text?: string;
  icon?: IconName;
  disabled?: boolean;
  dataTest?: string;
}

export interface NoticeDialogProps {
  children?: ReactNode;
  navbar?: ReactNode;
  "data-test"?: string;
  primaryButton?: NoticeDialogButton;
  secondaryButton?: NoticeDialogButton;
  transitionDuration?: unknown;
}

const NoticeDialog: React.FC<NoticeDialogProps> = ({
  children,
  navbar,
  "data-test": dataTest,
  primaryButton,
  secondaryButton,
}) => {
  return (
    <CoreFullscreenDialog open onClose={() => undefined} dataTest={dataTest}>
      {navbar}

      <ContentContainer
        width="small"
        justifyContent="space-between"
        paddingTop="medium"
      >
        <KeyPress onPress={() => primaryButton?.onClick?.()} keys={["Enter"]} />

        {children}

        <Stack spacing={2}>
          {primaryButton ? (
            <LargeButton
              fullWidth
              disabled={primaryButton.disabled}
              onClick={() => primaryButton.onClick?.()}
              endIcon={
                primaryButton.icon ? (
                  <Icon name={primaryButton.icon} />
                ) : undefined
              }
              data-test={primaryButton.dataTest}
            >
              {primaryButton.text}
            </LargeButton>
          ) : null}

          {secondaryButton ? (
            <LargeButton
              variant="text"
              fullWidth
              disabled={secondaryButton.disabled}
              onClick={() => secondaryButton.onClick?.()}
              endIcon={
                secondaryButton.icon ? (
                  <Icon name={secondaryButton.icon} />
                ) : undefined
              }
              data-test={secondaryButton.dataTest}
            >
              {secondaryButton.text}
            </LargeButton>
          ) : null}
        </Stack>
      </ContentContainer>
    </CoreFullscreenDialog>
  );
};

export default NoticeDialog;
