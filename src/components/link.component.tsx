import { LinkProps } from "@/types/link.types";
import { forwardRef, LegacyRef } from "react";
import classNames from "classnames";

const styles = {
	base: "text-blue-500 underline-offset-4 dark:text-blue-400 hover:underline",
};

function Link({ children, className, ...props }: LinkProps, ref?: LegacyRef<HTMLAnchorElement>) {
	const classes = classNames(styles.base, className);

	return (
		<a className={classes} ref={ref} {...props}>
			{children}
		</a>
	);
}

export default forwardRef<HTMLAnchorElement, LinkProps>(Link);
