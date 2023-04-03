/**
 * Converts Styles into a parsable object for the `classnames` library
 * @link https://github.com/JedWatson/classnames#usage
 * @param styles string of classes
 * @param condition flag
 */
export function conditionalStyles(styles: string, condition: boolean) {
	return { [styles]: condition };
}

export { conditionalStyles as cs };
