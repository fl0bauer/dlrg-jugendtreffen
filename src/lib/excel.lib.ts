import * as XLSX from "xlsx";
import { WorkBook } from "xlsx";
import FileSaver from "file-saver";

export function toExcel(sheets: { data: unknown[]; sheetName: string }[]) {
	const Sheets: WorkBook["Sheets"] = {};

	sheets.forEach((sheet) => {
		Sheets[sheet.sheetName] = XLSX.utils.json_to_sheet(sheet.data);
	});

	return XLSX.write(
		{
			Sheets,
			SheetNames: sheets.map((sheet) => sheet.sheetName),
		},
		{
			bookType: "xlsx",
			type: "array",
		}
	);
}

export function downloadExcel<T extends BlobPart>(excel: T, fileName: string) {
	const type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
	const blob = new Blob([excel], { type });
	FileSaver.saveAs(blob, `${fileName}.xlsx`);
}
