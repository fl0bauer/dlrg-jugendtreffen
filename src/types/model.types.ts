import { ComponentPropsWithoutRef, PropsWithChildren, ReactElement } from "react";

export interface ModelProps extends PropsWithChildren<ComponentPropsWithoutRef<"div">> {
	children: [ReactElement<ModelIconProps>, ReactElement<ModelTitleProps>, ReactElement<ModelTextProps>];
}

export interface ModelIconProps extends PropsWithChildren<ComponentPropsWithoutRef<"span">> {}
export interface ModelTitleProps extends PropsWithChildren<ComponentPropsWithoutRef<"h2">> {}
export interface ModelTextProps extends PropsWithChildren<ComponentPropsWithoutRef<"p">> {}
