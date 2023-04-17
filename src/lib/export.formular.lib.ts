import { Registration } from "@prisma/client";
import { toExcel } from "@/lib/excel.lib";
import { formatDate } from "@/lib/date.lib";
import { Translate } from "next-translate";

function key(sheet: string, field: string, t: Translate) {
	return t(`export.sheets.${sheet}.fields.${field}`);
}

function getRegistrationSheet(registrations: Registration[], t: Translate) {
	return registrations.map((registration) => ({
		[key("registrations", "association", t)]: registration.location.association,
		[key("registrations", "district", t)]: registration.location.district,
		[key("registrations", "local", t)]: registration.location.local,
		[key("registrations", "name", t)]: `${registration.supervisor.firstName} ${registration.supervisor.lastName}`,
		[key("registrations", "address", t)]: registration.supervisor.address,
		[key("registrations", "birthdate", t)]: formatDate(registration.supervisor.birthday),
		[key("registrations", "phone", t)]: registration.supervisor.phone,
		[key("registrations", "email", t)]: registration.supervisor.email,
		[key("registrations", "account-owner", t)]: registration.bank.accountOwner,
		[key("registrations", "account-owner-address", t)]: registration.bank.address,
		[key("registrations", "credit-institution", t)]: registration.bank.creditInstitution,
		[key("registrations", "iban", t)]: registration.bank.iban,
	}));
}

function getParticipantsSheet(registrations: Registration[], t: Translate) {
	const supervisors = registrations.map((registration) => ({
		[key("participants", "role", t)]: t("export.sheets.participants.options.main-supervisor"),
		[key("participants", "association", t)]: registration.location.association,
		[key("participants", "district", t)]: registration.location.district,
		[key("participants", "local", t)]: registration.location.local,
		[key("participants", "name", t)]: `${registration.supervisor.firstName} ${registration.supervisor.lastName}`,
		[key("participants", "birthdate", t)]: formatDate(registration.supervisor.birthday),
		[key("participants", "shirt-size", t)]: registration.supervisor.shirtSize,
		[key("participants", "hoodie-size", t)]: registration.supervisor.hoodieSize,
		[key("participants", "vegetarian-food", t)]: registration.supervisor.vegetarianFood ? t("export.sheets.participants.options.yes") : t("export.sheets.participants.options.no"),
		[key("participants", "notes", t)]: registration.supervisor.notes,
	}));

	const participants = registrations
		.map((registration) => registration.participants.map((participant) => ({ ...participant, location: registration.location })))
		.flat()
		.sort((a, b) => (b.isSecondarySupervisor ? 1 : -1))
		.map((participant) => ({
			[key("participants", "role", t)]: participant.isSecondarySupervisor ? t("export.sheets.participants.options.supervisor") : t("export.sheets.participants.options.participant"),
			[key("participants", "association", t)]: participant.location.association,
			[key("participants", "district", t)]: participant.location.district,
			[key("participants", "local", t)]: participant.location.local,
			[key("participants", "name", t)]: `${participant.firstName} ${participant.lastName}`,
			[key("participants", "birthdate", t)]: formatDate(participant.birthday),
			[key("participants", "shirt-size", t)]: participant.shirtSize,
			[key("participants", "hoodie-size", t)]: participant.hoodieSize,
			[key("participants", "vegetarian-food", t)]: participant.vegetarianFood ? t("export.sheets.participants.options.yes") : t("export.sheets.participants.options.no"),
			[key("participants", "notes", t)]: participant.notes,
		}));

	return [...supervisors, ...participants];
}

export function getExcelFromRegistrations(registrations: Registration[], t: Translate) {
	const registrationsSheet = getRegistrationSheet(registrations, t);
	const participantsSheet = getParticipantsSheet(registrations, t);

	return toExcel([
		{
			sheetName: t("export.sheets.registrations.name"),
			data: registrationsSheet,
		},
		{
			sheetName: t("export.sheets.participants.name"),
			data: participantsSheet,
		},
	]);
}
