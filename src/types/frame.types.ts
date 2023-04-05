import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface FrameProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	heading?: string;
	description?: string;
}
