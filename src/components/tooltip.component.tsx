import { TooltipProps } from "@/types/tooltip.types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

const styles = {
	container: "relative group cursor-help",
	content: "hidden absolute bottom-6 left-2 bg-white border border-slate-200 shadow p-4 rounded-md group-hover:flex dark:bg-slate-800 dark:border-slate-700",
	icon: "h-4 w-4 text-blue-500 stroke-2 hover:text-blue-300 dark:text-blue-400 dark:hover:text-blue-200",
};

export default function Tooltip({ children, className, ...props }: TooltipProps) {
	const classes = classNames(styles.content, className);

	return (
		<div className={styles.container} {...props}>
			<div className={classes}>{children}</div>
			<InformationCircleIcon className={styles.icon} />
		</div>
	);
}
