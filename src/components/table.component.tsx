import { TableBodyProps, TableColumnProps, TableHeadColumnProps, TableHeadProps, TableProps, TableRowProps } from "@/types/table.types";
import classNames from "classnames";

const styles = {
	table: "overflow-hidden w-full text-sm text-left text-gray-500 rounded-md select-none shadow",
	thead: "text-xs text-gray-700 bg-gray-50",
	tbody: "bg-white",
	row: "bg-white border-t",
	column: {
		thead: "px-6 py-3",
		tbody: "px-6 py-3",
	},
};

export function Table({ children, className, ...props }: TableProps) {
	const classes = classNames(styles.table, className);
	return (
		<table className={classes} {...props}>
			{children}
		</table>
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
