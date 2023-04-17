import { UseFormReturn } from "react-hook-form";
import { Participant, Supervisor } from "@/types/participants-formular.types";
import { BASE_PRICE, HOODIE_PRICE, SHIRT_PRICE } from "@/config/price.config";
import { Prisma } from ".prisma/client";
import RegistrationCreateInput = Prisma.RegistrationCreateInput;

export function getSupervisor(supervisorFormular: UseFormReturn): Supervisor {
	return {
		firstName: supervisorFormular.watch("firstName"),
		lastName: supervisorFormular.watch("lastName"),
		birthday: supervisorFormular.watch("birthday"),
		shirtSize: supervisorFormular.watch("shirtSize"),
		hoodieSize: supervisorFormular.watch("hoodieSize"),
		vegetarianFood: supervisorFormular.watch("vegetarianFood"),
		street: supervisorFormular.watch("street"),
		zip: supervisorFormular.watch("zip"),
		residence: supervisorFormular.watch("residence"),
		phone: supervisorFormular.watch("phone"),
		email: supervisorFormular.watch("email"),
		notes: supervisorFormular.watch("notes"),
	};
}

export function calculateEstimatedPrice(supervisorFormular: UseFormReturn, participantsFormular: UseFormReturn): number {
	let estimatedPrice = 0;

	const supervisorShirtSize = supervisorFormular.watch("shirtSize");
	const supervisorHoodieSize = supervisorFormular.watch("hoodieSize");
	const participants = (participantsFormular.watch("participants") as (Participant & { isSecondarySupervisor: boolean })[]) || [];

	estimatedPrice += BASE_PRICE; // We have one Supervisor for sure
	if (supervisorShirtSize) estimatedPrice += SHIRT_PRICE;
	if (supervisorHoodieSize) estimatedPrice += HOODIE_PRICE;

	participants.forEach((participants) => {
		estimatedPrice += BASE_PRICE;
		if (participants.shirtSize) estimatedPrice += SHIRT_PRICE;
		if (participants.hoodieSize) estimatedPrice += HOODIE_PRICE;
	});

	return estimatedPrice;
}

export function hasDeadlinePassed(): boolean {
	const deadline = new Date(process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE || "").getTime();
	const now = new Date().getTime();

	return deadline < now;
}

export function getRegistrationCreateInputFromFormular(locationFormular: UseFormReturn, supervisorFormular: UseFormReturn, participantsFormular: UseFormReturn, sepaFormular: UseFormReturn): RegistrationCreateInput {
	const locationValues = locationFormular.getValues();
	const supervisorValues = supervisorFormular.getValues();
	const participantsValues = participantsFormular.getValues();
	const sepaValues = sepaFormular.getValues();

	return {
		location: {
			association: locationValues.association,
			district: locationValues.district,
			local: locationValues.local,
		},
		supervisor: {
			firstName: supervisorValues.firstName,
			lastName: supervisorValues.lastName,
			birthday: supervisorValues.birthday,
			shirtSize: supervisorValues.shirtSize,
			hoodieSize: supervisorValues.hoodieSize,
			vegetarianFood: supervisorValues.vegetarianFood,
			address: `${supervisorValues.street}, ${supervisorValues.zip} ${supervisorValues.residence}`,
			phone: supervisorValues.phone,
			email: supervisorValues.email,
			notes: supervisorValues.notes,
		},
		participants: (participantsValues.participants as (Participant & { isSecondarySupervisor: boolean })[]).map((participant) => ({
			isSecondarySupervisor: participant.isSecondarySupervisor,
			firstName: participant.firstName,
			lastName: participant.lastName,
			birthday: participant.birthday,
			shirtSize: participant.shirtSize,
			hoodieSize: participant.hoodieSize,
			vegetarianFood: participant.vegetarianFood,
			notes: participant.notes,
		})),
		bank: {
			accountOwner: sepaValues.accountOwner,
			address: `${sepaValues.street}, ${sepaValues.zip} ${sepaValues.residence}`,
			creditInstitution: sepaValues.creditInstitution,
			iban: sepaValues.iban,
		},
	};
}
