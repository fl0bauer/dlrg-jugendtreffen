import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import { Form } from "@/components/form.component";
import Input from "@/components/input.component";
import Button from "@/components/button.component";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { downloadExcel } from "@/lib/excel.lib";
import Spinner from "@/components/spinner.component";
import { ExportFormularProps } from "@/types/export-formular.types";
import { getExcelFromRegistrations } from "@/lib/export.formular.lib";

export default function ExportFormular({ registrations }: ExportFormularProps) {
	const { t } = useTranslation("export.formular");
	const [loading, setLoading] = useState(false);
	const { register, formState, getValues, reset } = useFormContext();

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const exportExcel = async (fileName: string) => {
		const excel = getExcelFromRegistrations(registrations, t);
		downloadExcel(excel, fileName);
	};

	return (
		<>
			<Form>
				<Form.Group columns={1}>
					<Input id="admin-export-file-name" label={getLabel("file-name")} error={getErrors("fileName")} required disabled={registrations.length === 0} {...register("fileName")} />
				</Form.Group>
				<Form.Group columns={1}>
					<Button
						onClick={async (event) => {
							setLoading(true);
							event.preventDefault();
							event.stopPropagation();

							await exportExcel(getValues("fileName"));
							reset();

							setLoading(false);
						}}
						disabled={!formState?.isValid || loading || registrations.length === 0}
					>
						{loading ? <Spinner color="blue" /> : <ArrowDownTrayIcon className="h-4 w-4 stroke-2" />}
						{t("export.label")}
					</Button>
				</Form.Group>
			</Form>
		</>
	);
}
