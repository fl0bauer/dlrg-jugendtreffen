import { TableBodyProps, TableColumnProps, TableHeadColumnProps, TableHeadProps, TableProps, TableRowProps } from "@/types/table.types";
import classNames from "classnames";

const styles = {
	container: "border border-slate-200 rounded-md overflow-y-auto dark:border-slate-700",
	table: "w-full text-sm text-left text-slate-600 select-none dark:text-slate-300",
	thead: "text-xs whitespace-nowrap text-slate-700 bg-slate-50 dark:bg-slate-900 dark:text-slate-300",
	tbody: "bg-white dark:bg-slate-800 dark:text-slate-400",
	row: "odd:bg-white even:bg-slate-50 border-t border-t-slate-200 dark:even:bg-slate-900 dark:odd:bg-slate-900 dark:border-t-slate-800",
	column: {
		thead: "px-6 py-3",
		tbody: "px-6 py-3",
	},
};

export function Table({ children, className, ...props }: TableProps) {
	const classes = classNames(styles.container, className);
	return (
		<div className={classes}>
			<table className={styles.table} {...props}>
				{children}
			</table>
		</div>
	);
}

Table.Head = function TableHead({ children, className, ...props }: TableHeadProps) {
	const classes = classNames(styles.thead, className);
	return (
		<thead className={classes} {...props}>
			<tr>{children}</tr>
		</thead>
	);
};

Table.HeadColumn = function TableHeadColumn({ children, className, ...props }: TableHeadColumnProps) {
	const classes = classNames(styles.column.thead, className);
	return (
		<th scope="col" className={classes} {...props}>
			{children}
		</th>
	);
};

Table.Body = function TableBody({ children, className, ...props }: TableBodyProps) {
	const classes = classNames(styles.tbody, className);
	return (
		<tbody className={classes} {...props}>
			{children}
		</tbody>
	);
};

Table.Row = function TableRow({ children, className, ...props }: TableRowProps) {
	const classes = classNames(styles.row, className);
	return (
		<tr className={classes} {...props}>
			{children}
		</tr>
	);
};

Table.Column = function TableColumn({ children, className, ...props }: TableColumnProps) {
	const classes = classNames(styles.column.tbody, className);
	return (
		<td scope="row" className={classes} {...props}>
			{children}
		</td>
	);
};
