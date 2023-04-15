import { z } from "zod";

export const supervisorSchema = z.object({
	firstName: z.string().nonempty("inputs.first-name.errors.required"),
	lastName: z.string().nonempty("inputs.last-name.errors.required"),
	birthday: z.string().nonempty("inputs.birthday.errors.required"),
	vegetarianFood: z.boolean(),
	shirtSize: z.string().optional(),
	hoodieSize: z.string().optional(),
	street: z.string().nonempty("inputs.street.errors.required"),
	zip: z.string().length(5, "inputs.zip.errors.length"),
	residence: z.string().nonempty("inputs.residence.errors.required"),
	phone: z.string().nonempty("inputs.phone.errors.required"),
	email: z.string().nonempty("inputs.email.errors.required").email("inputs.email.errors.email"),
});
