import { StepProps } from "@/types/step.types";

export default function Step({ children, disablePreviousStep, disableNextStep, onPreviousStep, onNextStep, ...props }: StepProps) {
	return <div {...props}>{children}</div>;
}
