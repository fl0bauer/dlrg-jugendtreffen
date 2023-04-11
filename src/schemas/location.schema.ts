import { AssociationWithDependencies } from "@/types/location.types";
import { z } from "zod";
import { getLocals } from "@/lib/location.lib";

export const locationSchema = (associationsWithDependencies: AssociationWithDependencies[]) =>
	z
		.object({
			association: z.string().nonempty("location.association.errors.required"),
			district: z.string().nonempty("location.district.errors.required"),
			local: z.string().optional(),
		})
		.refine(
			(data) => {
				if (data.local) return true;

				if (data.district.length > 0) {
					const locals = getLocals(associationsWithDependencies, data.association, data.district);
					return locals.length === 0;
				}
			},
			{
				path: ["local"],
				message: "location.local.errors.required",
			}
		);
