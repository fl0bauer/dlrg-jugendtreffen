import { Prisma } from "@prisma/client";
import prisma from "@/prisma/prisma";
import RegistrationCreateInput = Prisma.RegistrationCreateInput;

export async function register(registration: RegistrationCreateInput) {
	return prisma.registration.create({ data: registration });
}

export async function getRegistrations() {
	return prisma.registration.findMany({
		include: {
			location: true,
			supervisor: true,
			participants: true,
			bank: true,
		},
	});
}
