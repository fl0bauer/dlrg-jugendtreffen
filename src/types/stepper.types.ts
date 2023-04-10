import { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from "react";
import { StepProps } from "@/types/step.types";

export interface StepperProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	children: ReactElement<StepProps> | ReactElement<StepProps>[];
	previousStepButton: JSX.Element;
	nextStepButton: JSX.Element;
	submitButton: JSX.Element;
}
