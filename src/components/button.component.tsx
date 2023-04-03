import classNames from "classnames";
import { ButtonProps, ButtonVariant } from "@/types/button.types";
import { ComponentStyles, Styled } from "@/types/styled.type";
import { cs } from "@/lib/styles.lib";

const styles: ComponentStyles<{ variant: Styled<ButtonVariant> }> = {
	base: "inline-flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold select-none rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
	disabled: "text-white bg-gray-200 cursor-not-allowed",
	variant: {
		primary: "text-white bg-rose-600 shadow-md hover:bg-rose-500 focus-visible:outline-rose-500",
		secondary: "text-rose-500 bg-rose-100 hover:bg-rose-200 focus-visible:outline-rose-500",
	},
};

export default function Button({ children, variant = "primary", disabled, className, ...props }: ButtonProps) {
	const classes = classNames(styles.base, cs(styles.variant[variant], !disabled), cs(styles.disabled, !!disabled), className);

	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
}
