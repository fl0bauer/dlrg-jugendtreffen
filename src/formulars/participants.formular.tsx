import useTranslation from "next-translate/useTranslation";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "@/components/input.component";
import { Table } from "@/components/table.component";
import Button from "@/components/button.component";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Chip from "@/components/chip.component";
import { ParticipantsFormularProps, ParticipantsTableProps } from "@/types/participants-formular.types";

const styles = {
	container: "flex flex-col gap-4",
	form: "flex flex-col gap-8 p-8 bg-white shadow rounded-md",
	grid2: "grid grid-cols-2 gap-4",
	grid3: "grid grid-cols-3 gap-4",
	link: "font-medium text-blue-600 cursor-pointer hover:underline",
	linkDisabled: "font-medium text-gray-400 cursor-not-allowed",
	table: {
		container: "overflow-x-auto",
		columns: {
			lead: "font-medium text-gray-900 whitespace-nowrap",
		},
	},
};

function ParticipantsTable({ supervisor, fields, onRemove }: ParticipantsTableProps) {
	const { t } = useTranslation("forms");

	return (
		<div className={styles.table.container}>
			<Table>
				<Table.Head>
					<Table.HeadColumn>{t("participants.roles.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.name.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.address.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.phone.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.email.label")}</Table.HeadColumn>
					<Table.HeadColumn>{t("participants.actions.label")}</Table.HeadColumn>
				</Table.Head>

				<Table.Body>
					<Table.Row>
						<Table.Column>
							<Chip color="amber">{t("participants.roles.items.supervisor")}</Chip>
						</Table.Column>
						<Table.Column className={styles.table.columns.lead}>
							{supervisor.firstName} {supervisor.lastName}
						</Table.Column>
						<Table.Column>
							{supervisor.street}, {supervisor.zip} {supervisor.residence}
						</Table.Column>
						<Table.Column>{supervisor.phone}</Table.Column>
						<Table.Column>{supervisor.email}</Table.Column>
						<Table.Column>
							<a className={styles.linkDisabled}>{t("participants.actions.items.delete")}</a>
						</Table.Column>
					</Table.Row>

					{fields.map((field, index) => (
						<Table.Row key={field.id}>
							<Table.Column>
								<Chip color="cyan">{t("participants.roles.items.participant")}</Chip>
							</Table.Column>
							<Table.Column className={styles.table.columns.lead}>
								{field.firstName} {field.lastName}
							</Table.Column>
							<Table.Column>
								{field.street}, {field.zip} {field.residence}
							</Table.Column>
							<Table.Column>{field.phone}</Table.Column>
							<Table.Column>{field.email}</Table.Column>
							<Table.Column>
								<a className={styles.link} onClick={() => onRemove(index)}>
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
	const { fields, append, remove } = useFieldArray({ control, name: "participant" });

	const getLabel = (name: string) => t(`participant.${name}.label`);
	const getErrors = (name: string) => {
		const error = formState?.errors?.[name]?.message;
		return error && t(error as string);
	};

	const addParticipant = () => append({ firstName: getValues("firstName"), lastName: getValues("lastName"), street: getValues("street"), zip: getValues("zip"), residence: getValues("residence"), phone: getValues("phone"), email: getValues("email") });
	const clearValues = () => ["firstName", "lastName", "street", "zip", "residence", "phone", "email"].forEach((field) => setValue(field, ""));

	return (
		<div className={styles.container}>
			<ParticipantsTable supervisor={supervisor} fields={fields as ParticipantsTableProps["fields"]} onRemove={remove} />

			<form className={styles.form}>
				<div className={styles.grid2}>
					<Input label={getLabel("first-name")} error={getErrors("firstName")} {...register("firstName")} />
					<Input label={getLabel("last-name")} error={getErrors("lastName")} {...register("lastName")} />
				</div>

				<div className={styles.grid3}>
					<Input label={getLabel("street")} error={getErrors("street")} {...register("street")} />
					<Input label={getLabel("zip")} error={getErrors("zip")} {...register("zip")} />
					<Input label={getLabel("residence")} error={getErrors("residence")} {...register("residence")} />
				</div>

				<div className={styles.grid2}>
					<Input label={getLabel("phone")} error={getErrors("phone")} {...register("phone")} />
					<Input label={getLabel("email")} error={getErrors("email")} {...register("email")} />
				</div>

				<Button
					variant="secondary"
					disabled={!formState.isValid}
					onClick={(event) => {
						event.preventDefault();
						addParticipant();
						clearValues();
					}}
				>
					<UserPlusIcon className="h-4 w-4" />
					{t("participants.actions.items.add")}
				</Button>
			</form>
		</div>
	);
}
