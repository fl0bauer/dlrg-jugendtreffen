import { FrameProps } from "@/types/frame.types";
import classNames from "classnames";

const styles = {
	container: "flex flex-col isolate bg-slate-50 min-h-screen py-12 px-6 sm:py-24 lg:px-8 dark:bg-slate-950",
	innerContainer: "flex flex-col flex-grow max-w-5xl mx-auto w-full",
	background: {
		container: "absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]",
	},
};

export default function Frame({ children, className, ...props }: FrameProps) {
	const classes = classNames(styles.container, className);

	return (
		<div className={classes} {...props}>
			<div className={styles.innerContainer}>{children}</div>
		</div>
	);
}
