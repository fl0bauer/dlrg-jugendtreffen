import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface StepProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	disablePreviousStep?: boolean;
	onPreviousStep?: () => void;
	disableNextStep?: boolean;
	onNextStep?: () => void;
}
