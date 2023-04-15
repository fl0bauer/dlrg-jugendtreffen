import { ComponentPropsWithoutRef, ReactElement } from "react";
import { TooltipProps } from "@/types/tooltip.types";

export interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
	label?: string;
	error?: string;
	tooltip?: ReactElement<TooltipProps>;
}
