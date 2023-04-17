import useTranslation from "next-translate/useTranslation";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import { Table } from "@/components/table.component";
import Button from "@/components/button.component";
import { CheckIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Chip from "@/components/chip.component";
import { Participant, ParticipantsFormularProps, ParticipantsTableProps } from "@/types/participants-formular.types";
import Checkbox from "@/components/checkbox.component";
import Dropdown from "@/components/dropdown.component";
import { SIZES } from "@/config/clothing.config";
import { Form } from "@/components/form.component";
import NextImage from "next/image";
import Tooltip from "@/components/tooltip.component";
import { ReactElement } from "react";
import { formatDate, getAge } from "@/lib/date.lib";

const styles = {
	container: "flex flex-col gap-8",
	link: "font-medium text-blue-600 cursor-pointer hover:underline dark:text-blue-300",
	linkDisabled: "font-medium text-slate-400 cursor-not-allowed dark:text-slate-500",
	actions: "flex flex-col gap-4 sm:flex-row sm:self-end",
	table: {
		container: "overflow-x-auto",
		columns: {
			lead: "font-medium text-slate-900 whitespace-nowrap dark:text-slate-200",
		},
	},
};

function ParticipantsTable({ preSelectedSupervisor, participants, onRemoveParticipant }: ParticipantsTableProps) {
	const { t } = useTranslation("participants.formular");

	const Check = <CheckIcon className="h-4 w-4 text-green-500 dark:text-green-300" />;
	const Cross = <XMarkIcon className="h-4 w-4 text-rose-500 dark:text-rose-300" />;

	const Row = ({ participant, role, actions }: { participant: Participant; role: ReactElement; actions: ReactElement }) => (
		<Table.Row>
			<Table.Column>{role}</Table.Column>
			<Table.Column className={styles.table.columns.lead}>
				{participant.firstName} {participant.lastName}
			</Table.Column>
			<Table.Column>{formatDate(participant.birthday)}</Table.Column>
			<Table.Column>{participant.shirtSize || "-"}</Table.Column>
			<Table.Column>{participant.hoodieSize || "-"}</Table.Column>
			<Table.Column>{participant.vegetarianFood ? Check : Cross}</Table.Column>
			<Table.Column className="whitespace-nowrap overflow-hidden max-w-[128px] text-ellipsis" title={participant.notes}>
				{participant.notes || "-"}
			</Table.Column>
			<Table.Column>{actions}</Table.Column>
		</Table.Row>
	);

	return (
		<div className={styles.table.container}>
			<Table className="max-h-72 overflow-y-auto">
				<Table.Head className="sticky top-0">
					<Table.HeadColumn>{t("table.labels.roles")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.name")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.birthday")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.shirt-size")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.hoodie-size")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.vegetarian-food")}</Table.HeadColumn>
					<Table.HeadColumn className="max-w-[128px]">{t("table.labels.notes")}</Table.HeadColumn>
					<Table.HeadColumn>{t("table.labels.actions")}</Table.HeadColumn>
				</Table.Head>

				<Table.Body>
					<Row participant={preSelectedSupervisor} role={<Chip color="fuchsia">{t("table.roles.main-supervisor")}</Chip>} actions={<a className={styles.linkDisabled}>{t("table.actions.delete")}</a>} />

					{participants
						.map((participant, index) => ({
							isSecondarySupervisor: participant.isSecondarySupervisor,
							row: (
								<Row
									key={index}
									participant={participant}
									role={participant.isSecondarySupervisor ? <Chip color="amber">{t("table.roles.supervisor")}</Chip> : <Chip color="cyan">{t("table.roles.participant")}</Chip>}
									actions={
										<a className={styles.link} onClick={() => onRemoveParticipant(index)}>
											{t("table.actions.delete")}
										</a>
									}
								/>
							),
						}))
						.sort((a, b) => (b.isSecondarySupervisor ? 1 : -1))
						.map((component) => component.row)}
				</Table.Body>
			</Table>
		</div>
	);
}

export default function ParticipantsFormular({ supervisor }: ParticipantsFormularProps) {
	const { t } = useTranslation("participants.formular");
	const { control, register, formState, getValues, setValue, watch } = useFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: "participants" });

	const getLabel = (name: string) => t(`inputs.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const isAge = (requiredAge: number) => {
		const age = getAge(watch("birthday"), process.env.NEXT_PUBLIC_BIRTHDAY_ORIENTATION_DATE);
		return age >= requiredAge;
	};
	const getParticipant = () => ({ firstName: getValues("firstName"), lastName: getValues("lastName"), birthday: getValues("birthday"), shirtSize: getValues("shirtSize"), hoodieSize: getValues("hoodieSize"), vegetarianFood: getValues("vegetarianFood"), notes: getValues("notes") } as Participant);
	const appendParticipant = (isSecondarySupervisor: boolean) => append({ ...getParticipant(), isSecondarySupervisor });
	const clearValues = () => {
		["firstName", "lastName", "birthday", "shirtSize", "hoodieSize", "notes"].forEach((field) => setValue(field, ""));
		["vegetarianFood"].forEach((field) => setValue(field, false));
	};

	return (
		<div className={styles.container}>
			<ParticipantsTable preSelectedSupervisor={supervisor} participants={fields as ParticipantsTableProps["participants"]} onRemoveParticipant={remove} />

			<Form>
				<Form.Group columns={3}>
					<Input id="participant-first-name" label={getLabel("first-name")} error={getErrors("firstName")} required {...register("firstName")} />
					<Input id="participant-last-name" label={getLabel("last-name")} error={getErrors("lastName")} required {...register("lastName")} />
					<Input id="participant-birthday" type="date" label={getLabel("birthday")} error={getErrors("birthday")} required {...register("birthday")} />
				</Form.Group>

				<Form.Group columns={2}>
					<Dropdown
						id="participant-shirt-size"
						tooltip={
							<Tooltip className="w-32">
								<NextImage src="/shirt.jpg" alt="DLRG Shirt" width={708} height={798} />
							</Tooltip>
						}
						label={getLabel("shirt-size")}
						error={getErrors("shirtSize")}
						{...register("shirtSize")}
					>
						<option></option>
						{SIZES.map((size) => (
							<option key={size}>{size}</option>
						))}
					</Dropdown>
					<Dropdown
						id="participant-hoodie-size"
						tooltip={
							<Tooltip className="w-32">
								<NextImage src="/hoodie.jpg" alt="DLRG Hoodie" width={740} height={1011} />
							</Tooltip>
						}
						label={getLabel("hoodie-size")}
						error={getErrors("hoodieSize")}
						{...register("hoodieSize")}
					>
						<option></option>
						{SIZES.map((size) => (
							<option key={size}>{size}</option>
						))}
					</Dropdown>
				</Form.Group>

				<Form.Group columns={1}>
					<Input id="participant-notes" label={getLabel("notes")} error={getErrors("notes")} {...register("notes")} />
				</Form.Group>

				<Form.Group columns={1}>
					<Checkbox id="participant-vegetarian-food" label={getLabel("vegetarian-food")} error={getErrors("vegetarianFood")} {...register("vegetarianFood")} />
				</Form.Group>

				<div className={styles.actions}>
					<Button
						variant="secondary"
						disabled={!formState.isValid || !isAge(18)}
						onClick={(event) => {
							event.preventDefault();
							appendParticipant(true);
							clearValues();
						}}
					>
						<UserPlusIcon className="hidden h-4 w-4 sm:block" />
						{t("actions.add-supervisor")}
					</Button>

					<Button
						variant="secondary"
						disabled={!formState.isValid || !isAge(13)}
						onClick={(event) => {
							event.preventDefault();
							appendParticipant(false);
							clearValues();
						}}
					>
						<UserPlusIcon className="hidden h-4 w-4 sm:block" />
						{t("actions.add-participant")}
					</Button>
				</div>
			</Form>
		</div>
	);
}
