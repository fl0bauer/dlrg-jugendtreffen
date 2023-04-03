import { DropdownProps } from "@/types/dropdown.types";
import classNames from "classnames";

const styles = {
	container: "flex flex-col gap-1",
	label: "block text-sm font-medium leading-6 text-gray-900 select-none",
	select: "block bg-white rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
};

export default function Dropdown({ children, label, className, ...props }: DropdownProps) {
	const classes = classNames(styles.select, className);

	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<select className={classes} {...props}>
				{children}
			</select>
		</div>
	);
}
