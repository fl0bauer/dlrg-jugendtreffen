import { z } from "zod";

export const locationSchema = z.object({
	association: z.string().nonempty("inputs.association.errors.required"),
	district: z.string().nonempty("inputs.district.errors.required"),
});
