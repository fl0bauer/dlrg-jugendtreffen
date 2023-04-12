import { Prisma } from "@prisma/client";
import prisma from "@/prisma/prisma";
import RegistrationCreateInput = Prisma.RegistrationCreateInput;

export async function register(registration: RegistrationCreateInput) {
	return prisma.registration.create({ data: registration });
}
