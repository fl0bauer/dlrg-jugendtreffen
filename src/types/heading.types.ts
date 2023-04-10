import { ComponentPropsWithoutRef } from "react";

export interface HeadingProps extends ComponentPropsWithoutRef<"div"> {
	heading: string;
	description: string;
}
