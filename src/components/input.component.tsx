import { InputProps } from "@/types/input.types";
import classNames from "classnames";

const styles = {
	container: "flex flex-col gap-1",
	label: "block w-fit text-sm font-medium leading-6 text-gray-900 select-none",
	input: "block bg-white rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-0 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-500 disabled:bg-gray-100 disabled:cursor-not-allowed",
};

export default function Input({ label, id, className, ...props }: InputProps) {
	const classes = classNames(styles.input, className);

	return (
		<div className={styles.container}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}
			<input id={id} name={id} className={classes} {...props} />
		</div>
	);
}
