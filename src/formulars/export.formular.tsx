import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import { Form } from "@/components/form.component";
import Input from "@/components/input.component";
import Button from "@/components/button.component";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { downloadExcel, toExcel } from "@/lib/excel.lib";
import Spinner from "@/components/spinner.component";
import { ExportFormularProps } from "@/types/export-formular.types";

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
		const toName = (firstName: string, lastName: string) => `${firstName} ${lastName}`;
		const formatDate = (birthdate: string) => {
			const [year, month, day] = birthdate.split("-");
			return `${day}.${month}.${year}`;
		};

		const getKey = (sheet: string, field: string) => t(`export.sheets.${sheet}.fields.${field}`);

		const excel = toExcel([
			{
				sheetName: t("export.sheets.registrations.name"),
				data: registrations.map((registration) => ({
					[getKey("registrations", "association")]: registration.location.association,
					[getKey("registrations", "district")]: registration.location.district,
					[getKey("registrations", "local")]: registration.location.local,
					[getKey("registrations", "name")]: toName(registration.supervisor.firstName, registration.supervisor.lastName),
					[getKey("registrations", "address")]: registration.supervisor.address,
					[getKey("registrations", "birthdate")]: formatDate(registration.supervisor.birthday),
					[getKey("registrations", "phone")]: registration.supervisor.phone,
					[getKey("registrations", "email")]: registration.supervisor.email,
					[getKey("registrations", "account-owner")]: registration.bank.accountOwner,
					[getKey("registrations", "account-owner-address")]: registration.bank.address,
					[getKey("registrations", "credit-institution")]: registration.bank.creditInstitution,
					[getKey("registrations", "iban")]: registration.bank.iban,
				})),
			},
			{
				sheetName: t("export.sheets.participants.name"),
				data: [
					...registrations.map((registration) => ({
						[getKey("participants", "role")]: t("export.sheets.participants.options.main-supervisor"),
						[getKey("participants", "association")]: registration.location.association,
						[getKey("participants", "district")]: registration.location.district,
						[getKey("participants", "local")]: registration.location.local,
						[getKey("participants", "name")]: toName(registration.supervisor.firstName, registration.supervisor.lastName),
						[getKey("participants", "birthdate")]: formatDate(registration.supervisor.birthday),
						[getKey("participants", "shirt-size")]: registration.supervisor.shirtSize,
						[getKey("participants", "hoodie-size")]: registration.supervisor.hoodieSize,
						[getKey("participants", "vegetarian-food")]: registration.supervisor.vegetarianFood ? t("export.sheets.participants.options.yes") : t("export.sheets.participants.options.no"),
						[getKey("participants", "notes")]: registration.supervisor.notes,
					})),
					...registrations
						.map((registration) => registration.participants.map((participant) => ({ ...participant, location: registration.location })))
						.flat()
						.sort((a, b) => (b.isSecondarySupervisor ? 1 : -1))
						.map((participant) => ({
							[getKey("participants", "role")]: participant.isSecondarySupervisor ? t("export.sheets.participants.options.supervisor") : t("export.sheets.participants.options.participant"),
							[getKey("participants", "association")]: participant.location.association,
							[getKey("participants", "district")]: participant.location.district,
							[getKey("participants", "local")]: participant.location.local,
							[getKey("participants", "name")]: toName(participant.firstName, participant.lastName),
							[getKey("participants", "birthdate")]: formatDate(participant.birthday),
							[getKey("participants", "shirt-size")]: participant.shirtSize,
							[getKey("participants", "hoodie-size")]: participant.hoodieSize,
							[getKey("participants", "vegetarian-food")]: participant.vegetarianFood ? t("export.sheets.participants.options.yes") : t("export.sheets.participants.options.no"),
							[getKey("participants", "notes")]: participant.notes,
						})),
				],
			},
		]);

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
