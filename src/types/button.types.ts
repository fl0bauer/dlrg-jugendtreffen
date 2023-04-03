import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends PropsWithChildren<ComponentPropsWithoutRef<"button">> {
	variant?: ButtonVariant;
}
