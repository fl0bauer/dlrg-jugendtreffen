import { CheckboxProps } from "@/types/checkbox.types";
import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";

const styles = {
	container: "flex flex-col gap-1",
	label: "block w-fit text-sm font-medium leading-6 text-gray-900 select-none",
	checkbox: "rounded-sm shadow-sm transition-all text-rose-500 focus:ring-rose-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-rose-400 select-none",
};

function Checkbox({ label, error, id, className, type, ...props }: CheckboxProps, ref?: LegacyRef<HTMLInputElement>) {
	const classes = classNames(styles.checkbox, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<input id={id} name={id} type="checkbox" className={classes} ref={ref} {...props} />
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLInputElement, CheckboxProps>(Checkbox);
