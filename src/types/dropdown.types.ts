import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface DropdownProps extends PropsWithChildren<ComponentPropsWithoutRef<"select">> {
	label?: string;
}
