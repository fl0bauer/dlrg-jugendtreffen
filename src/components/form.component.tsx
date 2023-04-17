import { FormGroupProps, FormProps } from "@/types/form.types";
import classNames from "classnames";

const styles = {
	form: "flex flex-col gap-8 p-8 bg-white border border-slate-200 rounded-md dark:bg-slate-900 dark:border-slate-800",
	group: {
		container: "grid gap-4",
		column: "grid-cols-1",
		columns: ["sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4", "sm:grid-cols-5", "sm:grid-cols-6", "sm:grid-cols-7", "sm:grid-cols-8", "sm:grid-cols-9", "sm:grid-cols-10", "sm:grid-cols-11", "sm:grid-cols-12"],
	},
};

export function Form({ children, className, onSubmit, ...props }: FormProps) {
	const classes = classNames(styles.form, className);

	return (
		<form
			className={classes}
			onSubmit={
				onSubmit
					? onSubmit
					: (event) => {
							event.stopPropagation();
							event.preventDefault();
					  }
			}
			{...props}
		>
			{children}
		</form>
	);
}

Form.Group = function Group({ children, columns, className, ...props }: FormGroupProps) {
	const classes = classNames(styles.group.container, styles.group.column, styles.group.columns[columns - 1], className);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
};
