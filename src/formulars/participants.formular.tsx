import useTranslation from "next-translate/useTranslation";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import { Table } from "@/components/table.component";
import Button from "@/components/button.component";
import { CheckBadgeIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Chip from "@/components/chip.component";
import { Participant, ParticipantsFormularProps, ParticipantsTableProps } from "@/types/participants-formular.types";
import Checkbox from "@/components/checkbox.component";
import Dropdown from "@/components/dropdown.component";

const styles = {
	container: "flex flex-col gap-4",
	form: "flex flex-col gap-8 p-8 bg-white shadow rounded-md",
	grid2: "grid grid-cols-2 gap-4",
	grid3: "grid grid-cols-3 gap-4",
	link: "font-medium text-blue-600 cursor-pointer hover:underline",
	linkDisabled: "font-medium text-gray-400 cursor-not-allowed",
	actions: "flex self-end gap-4",
	table: {
		container: "overflow-x-auto",
		columns: {
			lead: "font-medium text-gray-900 whitespace-nowrap",
		},
	},
};

function ParticipantsTable({ preSelectedSupervisors, participants, onRemoveParticipant }: ParticipantsTableProps) {
	const { t } = useTranslation("forms");

	return (
		<div className={styles.table.container}>
			<Table>
				<Table.Head>
					<Table.HeadColumn>{t("participants.roles.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.name.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.birthday.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.shirt-size.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.hoodie-size.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.vegetarian-food.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.actions.label")}</Table.HeadColumn>
				</Table.Head>

				<Table.Body>
					<Table.Row>
						<Table.Column>
							<Chip color="fuchsia">{t("participants.roles.items.main-supervisor")}</Chip>
						</Table.Column>
						<Table.Column className={styles.table.columns.lead}>
							{preSelectedSupervisors.firstName} {preSelectedSupervisors.lastName}
						</Table.Column>
						<Table.Column>-</Table.Column>
						<Table.Column>-</Table.Column>
						<Table.Column>-</Table.Column>
						<Table.Column>-</Table.Column>
						<Table.Column>
							<a className={styles.linkDisabled}>{t("participants.actions.items.delete")}</a>
						</Table.Column>
					</Table.Row>

					{participants.map((participant, index) => (
						<Table.Row key={participant.id}>
							<Table.Column>{participant.isSecondarySupervisor ? <Chip color="amber">{t("participants.roles.items.supervisor")}</Chip> : <Chip color="cyan">{t("participants.roles.items.participant")}</Chip>}</Table.Column>
							<Table.Column className={styles.table.columns.lead}>
								{participant.firstName} {participant.lastName}
							</Table.Column>
							<Table.Column>{participant.birthday}</Table.Column>
							<Table.Column>{participant.shirtSize}</Table.Column>
							<Table.Column>{participant.hoodieSize}</Table.Column>
							<Table.Column>{participant.vegetarianFood && <CheckBadgeIcon className="h-4 w-4" />}</Table.Column>
							<Table.Column>
								<a className={styles.link} onClick={() => onRemoveParticipant(index)}>
									{t("participants.actions.items.delete")}
								</a>
							</Table.Column>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export default function ParticipantsFormular({ supervisor }: ParticipantsFormularProps) {
	const { t } = useTranslation("forms");
	const { control, register, formState, getValues, setValue } = useFormContext();
	const { fields, append, remove } = useFieldArray({ control, name: "participants" });

	const sizes = ["S", "M", "L", "XL", "XXL"];

	const getLabel = (name: string) => t(`participants.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const getParticipant = () => ({ firstName: getValues("firstName"), lastName: getValues("lastName"), birthday: getValues("birthday"), shirtSize: getValues("shirtSize"), hoodieSize: getValues("hoodieSize"), vegetarianFood: getValues("vegetarianFood") } as Participant);
	const appendParticipant = (isSecondarySupervisor: boolean) => append({ ...getParticipant(), isSecondarySupervisor });
	const clearValues = () => {
		["firstName", "lastName", "birthday", "shirtSize", "hoodieSize"].forEach((field) => setValue(field, ""));
		["vegetarianFood"].forEach((field) => setValue(field, false));
	};
	const participants = (fields as ParticipantsTableProps["participants"]).sort((a, b) => (b.isSecondarySupervisor ? 1 : -1));

	return (
		<div className={styles.container}>
			<ParticipantsTable preSelectedSupervisors={supervisor} participants={participants} onRemoveParticipant={remove} />

			<form className={styles.form}>
				<div className={styles.grid3}>
					<Input label={getLabel("first-name")} error={getErrors("firstName")} {...register("firstName")} />
					<Input label={getLabel("last-name")} error={getErrors("lastName")} {...register("lastName")} />
					<Input type="date" label={getLabel("birthday")} error={getErrors("birthday")} {...register("birthday")} />
				</div>

				<div className={styles.grid2}>
					<Dropdown label={getLabel("shirt-size")} error={getErrors("shirtSize")} {...register("shirtSize")}>
						<option></option>
						{sizes.map((size) => (
							<option key={size}>{size}</option>
						))}
					</Dropdown>
					<Dropdown label={getLabel("hoodie-size")} error={getErrors("hoodieSize")} {...register("hoodieSize")}>
						<option></option>
						{sizes.map((size) => (
							<option key={size}>{size}</option>
						))}
					</Dropdown>
				</div>

				<div>
					<Checkbox label={getLabel("vegetarian-food")} error={getErrors("vegetarianFood")} {...register("vegetarianFood")} />
				</div>

				<div className={styles.actions}>
					<Button
						variant="secondary"
						disabled={!formState.isValid}
						onClick={(event) => {
							event.preventDefault();
							appendParticipant(true);
							clearValues();
						}}
					>
						<UserPlusIcon className="h-4 w-4" />
						{t("participants.actions.items.add-supervisor")}
					</Button>

					<Button
						variant="secondary"
						disabled={!formState.isValid}
						onClick={(event) => {
							event.preventDefault();
							appendParticipant(false);
							clearValues();
						}}
					>
						<UserPlusIcon className="h-4 w-4" />
						{t("participants.actions.items.add-participant")}
					</Button>
				</div>
			</form>
		</div>
	);
}
