import { FormGroupProps, FormProps } from "@/types/form.types";
import classNames from "classnames";

const styles = {
	form: "flex flex-col gap-8 p-8 bg-white border border-slate-200 rounded-md",
	group: {
		container: "grid gap-4",
		columns: ["grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5", "grid-cols-6", "grid-cols-7", "grid-cols-8", "grid-cols-9", "grid-cols-10", "grid-cols-11", "grid-cols-12"],
	},
};

export function Form({ children, className, ...props }: FormProps) {
	const classes = classNames(styles.form, className);

	return (
		<form className={classes} {...props}>
			{children}
		</form>
	);
}

Form.Group = function Group({ children, columns, className, ...props }: FormGroupProps) {
	const classes = classNames(styles.group.container, styles.group.columns[columns - 1], className);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
};
