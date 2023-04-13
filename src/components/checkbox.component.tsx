import { CheckboxProps } from "@/types/checkbox.types";
import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";

const styles = {
	container: "flex flex-col gap-1",
	label: "block w-fit text-sm font-medium leading-6 text-gray-900 select-none",
	required: "text-rose-600",
	checkbox: "rounded-sm shadow-sm transition-all text-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-indigo-400 select-none",
};

function Checkbox({ label, error, id, className, type, required, ...props }: CheckboxProps, ref?: LegacyRef<HTMLInputElement>) {
	const classes = classNames(styles.checkbox, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label} {required && <span className={styles.required}>*</span>}
				</label>
			)}
			<input id={id} name={id} type="checkbox" className={classes} ref={ref} {...props} />
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);
