import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface FormProps extends PropsWithChildren<ComponentPropsWithoutRef<"form">> {}

export interface FormGroupProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	columns: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}
