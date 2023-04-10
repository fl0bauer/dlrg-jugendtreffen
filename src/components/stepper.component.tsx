import classNames from "classnames";
import { StepperProps } from "@/types/stepper.types";
import { Children, cloneElement, useState } from "react";

const styles = {
	container: "flex flex-col gap-12",
	buttons: "flex gap-4 justify-end",
};

export default function Stepper({ children, previousStepButton, nextStepButton, submitButton, className, ...props }: StepperProps) {
	const [step, setStep] = useState(0);

	const isCurrentStep = (index: number) => step === index;
	const hasPreviousStep = (index: number) => index > 0;
	const hasNextStep = (index: number) => index < Children.toArray(children).length - 1;

	const previousStep = () => setStep(step - 1);
	const nextStep = () => setStep(step + 1);

	const classes = classNames(styles.container, className);

	return (
		<div className={classes} {...props}>
			{Children.map(children, (child, index) => {
				if (!isCurrentStep(index)) return <></>;

				const PreviousStepButton = cloneElement(previousStepButton, {
					onClick: () => {
						child.props?.onPreviousStep && child.props.onPreviousStep();
						previousStep();
					},
					disabled: child.props?.disablePreviousStep || false,
				});

				const NextStepButton = cloneElement(nextStepButton, {
					onClick: () => {
						child.props?.onNextStep && child.props.onNextStep();
						nextStep();
					},
					disabled: child.props?.disableNextStep || false,
				});

				const SubmitButton = cloneElement(submitButton, {
					onClick: () => {
						child.props?.onNextStep && child.props.onNextStep();
					},
					disabled: child.props?.disableNextStep || false,
				});

				return (
					<>
						{child}

						<div className={styles.buttons}>
							{hasPreviousStep(step) && PreviousStepButton}
							{hasNextStep(step) ? NextStepButton : SubmitButton}
						</div>
					</>
				);
			})}
		</div>
	);
}
