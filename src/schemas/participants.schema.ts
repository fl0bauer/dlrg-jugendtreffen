import { z } from "zod";

export const participantsSchema = z.object({
	firstName: z.string().nonempty("participants.first-name.errors.required"),
	lastName: z.string().nonempty("participants.last-name.errors.required"),
	birthday: z.string().nonempty("participants.birthday.errors.required"),
	vegetarianFood: z.boolean(),
	shirtSize: z.string().optional(),
	hoodieSize: z.string().optional(),
});
