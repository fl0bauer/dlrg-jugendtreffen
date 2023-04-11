import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface TableProps extends PropsWithChildren<ComponentPropsWithoutRef<"table">> {}

export interface TableHeadProps extends PropsWithChildren<ComponentPropsWithoutRef<"thead">> {}

export interface TableHeadColumnProps extends PropsWithChildren<ComponentPropsWithoutRef<"th">> {}

export interface TableBodyProps extends PropsWithChildren<ComponentPropsWithoutRef<"tbody">> {}

export interface TableRowProps extends PropsWithChildren<ComponentPropsWithoutRef<"tr">> {}

export interface TableColumnProps extends PropsWithChildren<ComponentPropsWithoutRef<"th">> {}
