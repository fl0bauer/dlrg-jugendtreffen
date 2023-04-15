import { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from "react";

export interface StepperProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	children: ReactElement<StepProps> | ReactElement<StepProps>[];
	previousStepButton: JSX.Element;
	nextStepButton: JSX.Element;
	submitButton: JSX.Element;
}

export interface StepProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	label: string;
	disablePreviousStep?: boolean;
	onPreviousStep?: () => void;
	disableNextStep?: boolean;
	onNextStep?: () => void;
}

export interface StepperIndicatorProps extends PropsWithChildren<ComponentPropsWithoutRef<"ol">> {
	children: ReactElement<StepperIndicatorStepProps> | ReactElement<StepperIndicatorStepProps>[];
}

export interface StepperIndicatorStepProps extends PropsWithChildren<ComponentPropsWithoutRef<"li">> {
	prefix?: string;
	active?: boolean;
	showArrows?: boolean;
}
