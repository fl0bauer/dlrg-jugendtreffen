import { ComponentPropsWithoutRef } from "react";

export interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
	label?: string;
	error?: string;
}
