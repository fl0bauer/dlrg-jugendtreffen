import { DropdownProps } from "@/types/dropdown.types";
import classNames from "classnames";
import { forwardRef, LegacyRef } from "react";

const styles = {
	container: "flex flex-col gap-1",
	label: "flex items-center gap-0.5 w-fit text-sm font-medium leading-6 text-slate-900 select-none",
	tooltip: "ml-1",
	required: "text-rose-600",
	select: "block bg-white border border-slate-200 rounded-md py-1.5 px-3 text-slate-900 outline-0 transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 disabled:bg-slate-100 disabled:border-slate-100 disabled:cursor-not-allowed",
	error: "block w-fit text-xs text-rose-400 select-none",
};

function Dropdown({ children, label, tooltip, error, id, className, required, ...props }: DropdownProps, ref?: LegacyRef<HTMLSelectElement>) {
	const classes = classNames(styles.select, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label} {required && <span className={styles.required}>*</span>}
					<div className={styles.tooltip}>{tooltip}</div>
				</label>
			)}
			<select id={id} name={id} className={classes} ref={ref} {...props}>
				{children}
			</select>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
}

export default forwardRef<HTMLSelectElement, DropdownProps>(Dropdown);
