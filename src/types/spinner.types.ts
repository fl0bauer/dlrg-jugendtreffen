import { ComponentPropsWithoutRef } from "react";

export interface SpinnerProps extends ComponentPropsWithoutRef<"svg"> {
	color: "blue";
	screenReaderText?: string;
}
