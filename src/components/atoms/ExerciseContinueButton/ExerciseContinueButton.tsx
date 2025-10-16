import { FullWidthButton, Icon } from "@eduriam/ui-core";
import { useTranslation } from "i18n/client";
import icons from "styles/icons";

export interface IExerciseContinueButton {
  onClick: () => void;
  state: "DISABLED" | "CHECK" | "CONTINUE";
}

const ExerciseContinueButton: React.FC<IExerciseContinueButton> = ({
  onClick,
  state,
}) => {
  const { t } = useTranslation("common");

  return (
    <FullWidthButton
      onClick={onClick}
      disabled={state === "DISABLED"}
      endIcon={state === "CONTINUE" ? <Icon name={icons.next} /> : undefined}
    >
      {t(state === "CONTINUE" ? "exercise.continue" : "exercise.check")}
    </FullWidthButton>
  );
};

export default ExerciseContinueButton;
