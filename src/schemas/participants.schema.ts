import { z } from "zod";

export const participantsSchema = z.object({
	firstName: z.string().nonempty("inputs.first-name.errors.required"),
	lastName: z.string().nonempty("inputs.last-name.errors.required"),
	birthday: z.string().nonempty("inputs.birthday.errors.required"),
	vegetarianFood: z.boolean(),
	shirtSize: z.string().optional(),
	hoodieSize: z.string().optional(),
	notes: z.string(),
});
