import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";
import { InputProps } from "@/types/input.types";

const styles = {
	container: "flex flex-col gap-1",
	label: "flex items-center gap-0.5 w-fit text-sm font-medium leading-6 text-slate-900 select-none",
	tooltip: "ml-1",
	required: "text-rose-600",
	input: "block bg-white border border-slate-200 rounded-md py-1.5 px-3 text-slate-900 outline-0 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 disabled:bg-slate-100 disabled:border-slate-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-rose-400 select-none",
};

function Input({ label, error, tooltip, id, className, required, ...props }: InputProps, ref?: LegacyRef<HTMLInputElement>) {
	const classes = classNames(styles.input, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label} {required && <span className={styles.required}>*</span>}
					<div className={styles.tooltip}>{tooltip}</div>
				</label>
			)}
			<input id={id} name={id} className={classes} ref={ref} {...props} />
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
