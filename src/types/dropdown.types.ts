import { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from "react";
import { TooltipProps } from "@/types/tooltip.types";

export interface DropdownProps extends PropsWithChildren<ComponentPropsWithoutRef<"select">> {
	label?: string;
	error?: string;
	tooltip?: ReactElement<TooltipProps>;
}
