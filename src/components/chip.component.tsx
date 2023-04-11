import { ChipProps } from "@/types/chip.types";
import classNames from "classnames";

const styles = {
	base: "w-fit text-xs font-medium select-none border rounded-full px-2 py-0.5",
	amber: "text-amber-800 border-amber-400 bg-amber-200",
	cyan: "text-cyan-800 border-cyan-400 bg-cyan-200",
};

export default function Chip({ children, color, className, ...props }: ChipProps) {
	const classes = classNames(styles.base, styles[color], className);

	return (
		<div className={classes} {...props}>
			{children}
		</div>
	);
}
