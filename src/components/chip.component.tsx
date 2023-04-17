import { ChipProps } from "@/types/chip.types";
import classNames from "classnames";

const styles = {
	base: "w-fit text-xs font-medium select-none border rounded-full px-2 py-0.5",
	amber: "text-amber-800 border-amber-400 bg-amber-200 dark:text-amber-300 dark:border-amber-500 dark:bg-amber-700 dark:bg-opacity-25",
	cyan: "text-cyan-800 border-cyan-400 bg-cyan-200 dark:text-cyan-300 dark:border-cyan-500 dark:bg-cyan-700 dark:bg-opacity-25",
	fuchsia: "text-fuchsia-800 border-fuchsia-400 bg-fuchsia-200 dark:text-fuchsia-300 dark:border-fuchsia-500 dark:bg-fuchsia-700 dark:bg-opacity-25",
};

export default function Chip({ children, color, className, ...props }: ChipProps) {
	const classes = classNames(styles.base, styles[color], className);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
