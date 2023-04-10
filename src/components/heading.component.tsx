import { HeadingProps } from "@/types/heading.types";
import classNames from "classnames";

const styles = {
	container: "flex flex-col text-center select-none",
	heading: "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl",
	description: "text-lg leading-8 text-gray-600",
};

export default function Heading({ heading, description, className, ...props }: HeadingProps) {
	const classes = classNames(styles.container, className);

	return (
		<div className={classes} {...props}>
			<h2 className={styles.heading}>{heading}</h2>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
