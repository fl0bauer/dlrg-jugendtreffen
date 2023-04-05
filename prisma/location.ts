import prisma from "@/prisma/prisma";

export async function fetchAssociations() {
	return prisma.association.findMany({
		include: {
			districts: {
				include: {
					locals: true,
				},
			},
		},
	});
}
