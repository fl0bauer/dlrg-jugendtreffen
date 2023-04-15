import { CheckboxProps } from "@/types/checkbox.types";
import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";

const styles = {
	container: "flex flex-col gap-1",
	innerContainer: "flex items-center gap-2",
	label: "flex items-center gap-0.5 w-fit text-sm font-medium leading-6 text-slate-900 select-none",
	tooltip: "ml-1",
	required: "text-rose-600",
	checkbox: "rounded shadow-sm transition-all text-blue-600 border border-slate-200 focus:ring-blue-600 disabled:bg-slate-100 disabled:border-slate-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-rose-400 select-none",
};

function Checkbox({ label, error, tooltip, id, className, type, required, ...props }: CheckboxProps, ref?: LegacyRef<HTMLInputElement>) {
	const classes = classNames(styles.checkbox, className);

	return (
		<div className={styles.container}>
			<div className={styles.innerContainer}>
				<input id={id} name={id} type="checkbox" className={classes} ref={ref} {...props} />
				{label && (
					<label htmlFor={id} className={styles.label}>
						{label} {required && <span className={styles.required}>*</span>}
						<div className={styles.tooltip}>{tooltip}</div>
					</label>
				)}
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);
