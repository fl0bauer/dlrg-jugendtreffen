import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";
import { InputProps } from "@/types/input.types";

const styles = {
	container: "flex flex-col gap-1",
	label: "block w-fit text-sm font-medium leading-6 text-gray-900 select-none",
	required: "text-rose-600",
	input: "block bg-white rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-rose-400 select-none",
};

function Input({ label, error, id, className, required, ...props }: InputProps, ref?: LegacyRef<HTMLInputElement>) {
	const classes = classNames(styles.input, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label} {required && <span className={styles.required}>*</span>}
				</label>
			)}
			<input id={id} name={id} className={classes} ref={ref} {...props} />
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
