import { ModelIconProps, ModelProps, ModelTitleProps } from "@/types/model.types";
import classNames from "classnames";

const styles = {
	model: "flex flex-col items-center gap-2 p-8 text-center bg-white border border-slate-200 rounded-md min-w-[45%] select-none dark:bg-slate-900 dark:border-slate-800",
	icon: "flex items-center justify-center mb-4 flex-shrink-0 h-10 w-10 rounded-full",
	title: "text-slate-900 text-2xl font-medium dark:text-slate-300",
	text: "text-slate-700 dark:text-slate-400",
};

export function Model({ children, className, ...props }: ModelProps) {
	const classes = classNames(styles.model, className);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}

Model.Icon = function ModelIcon({ children, className, ...props }: ModelIconProps) {
	const classes = classNames(styles.icon, className);

	return (
		<span className={classes} {...props}>
			{children}
		</span>
	);
};

Model.Title = function ModelTitle({ children, className, ...props }: ModelTitleProps) {
	const classes = classNames(styles.title, className);

	return (
		<h2 className={classes} {...props}>
			{children}
		</h2>
	);
};

Model.Text = function ModelTitle({ children, className, ...props }: ModelTitleProps) {
	const classes = classNames(styles.text, className);

	return (
		<p className={classes} {...props}>
			{children}
		</p>
	);
};
