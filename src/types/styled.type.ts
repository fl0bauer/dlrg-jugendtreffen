export type Styled<T extends string> = Record<T, string>;

export type ComponentStyles<T> = T & {
	base: string;
	disabled: string;
};
