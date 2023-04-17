import classNames from "classnames";
import { StepperIndicatorProps, StepperIndicatorStepProps, StepperProps, StepProps } from "@/types/stepper.types";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { cs } from "@/lib/styles.lib";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const styles = {
	stepperContainer: "flex flex-col gap-8",
	stepContainer: "flex flex-col gap-8",
	buttons: "flex flex-col gap-4 justify-end sm:flex-row",
	indicator: {
		list: "flex items-center gap-3 bg-white border border-slate-200 rounded-md p-4 overflow-y-auto select-none dark:bg-slate-900 dark:border-slate-800",
		prefix: {
			active: "hidden items-center justify-center w-5 h-5 text-xs border border-blue-600 bg-blue-50 rounded-full shrink-0 sm:flex dark:border-blue-300 dark:bg-blue-500 dark:bg-opacity-25",
			inactive: "hidden items-center justify-center w-5 h-5 text-xs border border-slate-500 rounded-full shrink-0 sm:flex dark:border-slate-400",
		},
		icon: "w-4 h-4 stroke-2",
		item: {
			active: "flex items-center gap-2 text-blue-600 font-medium dark:text-blue-400",
			inactive: "flex items-center gap-2 text-slate-500 dark:text-slate-400",
		},
	},
};

export function Stepper({ children, previousStepButton, nextStepButton, submitButton, className, ...props }: StepperProps) {
	const [step, setStep] = useState(0);

	const isCurrentStep = (index: number) => step === index;
	const hasPreviousStep = (index: number) => index > 0;
	const hasNextStep = (index: number) => index < Children.toArray(children).length - 1;

	const previousStep = () => setStep(step - 1);
	const nextStep = () => setStep(step + 1);

	return (
		<div className={styles.stepperContainer}>
			<Stepper.Indicator>
				{Children.map(children, (child, index) => (
					<Stepper.IndicatorStep prefix={`${index + 1}`} active={isCurrentStep(index)} showArrows={hasNextStep(index)}>
						{child.props?.label}
					</Stepper.IndicatorStep>
				))}
			</Stepper.Indicator>

			{Children.map(children, (child, index) => {
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

				const classes = classNames(cs(styles.stepContainer, isCurrentStep(index)), cs("hidden", !isCurrentStep(index)), className);

				return (
					<div className={classes} {...props}>
						{child}

						<div className={styles.buttons}>
							{hasPreviousStep(step) && PreviousStepButton}
							{hasNextStep(step) ? NextStepButton : SubmitButton}
						</div>
					</div>
				);
			})}
		</div>
	);
}

Stepper.Step = function Step({ children, disablePreviousStep, disableNextStep, onPreviousStep, onNextStep, ...props }: StepProps) {
	return <div {...props}>{children}</div>;
};

Stepper.Indicator = function StepperIndicator({ children, className, ...props }: StepperIndicatorProps) {
	const classes = classNames(styles.indicator.list, className);

	return (
		<ol className={classes} {...props}>
			{children}
		</ol>
	);
};

Stepper.IndicatorStep = function StepperIndicatorStep({ children, prefix = "", active = false, showArrows = false, className, ...props }: StepperIndicatorStepProps) {
	const ref = useRef<HTMLLIElement>(null);

	useEffect(() => {
		if (!active || !ref.current) return;

		ref.current.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
	}, [active]);

	if (active) {
		const classes = classNames(styles.indicator.item.active, className);

		return (
			<li className={classes} ref={ref} {...props}>
				<span className={styles.indicator.prefix.active}>{prefix}</span>
				{children}
				{showArrows && <ArrowRightIcon className={styles.indicator.icon} />}
			</li>
		);
	}

	const classes = classNames(styles.indicator.item.inactive, className);

	return (
		<li className={classes} {...props}>
			<span className={styles.indicator.prefix.inactive}>{prefix}</span>
			{children}
			{showArrows && <ArrowRightIcon className={styles.indicator.icon} />}
		</li>
	);
};
