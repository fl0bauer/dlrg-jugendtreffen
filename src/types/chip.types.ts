import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface ChipProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	color: "amber" | "cyan";
}
