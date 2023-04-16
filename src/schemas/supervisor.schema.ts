import { z } from "zod";
import { getAge } from "@/lib/age.lib";

export const supervisorSchema = z.object({
	firstName: z.string().nonempty("inputs.first-name.errors.required"),
	lastName: z.string().nonempty("inputs.last-name.errors.required"),
	birthday: z
		.string()
		.nonempty("inputs.birthday.errors.required")
		.refine(
			(birthdate) => {
				const age = getAge(birthdate, process.env.NEXT_PUBLIC_BIRTHDAY_ORIENTATION_DATE);
				return age >= 18;
			},
			{ message: "inputs.birthday.errors.older-than-18-years" }
		),
	vegetarianFood: z.boolean(),
	shirtSize: z.string().optional(),
	hoodieSize: z.string().optional(),
	street: z.string().nonempty("inputs.street.errors.required"),
	zip: z.string().length(5, "inputs.zip.errors.length"),
	residence: z.string().nonempty("inputs.residence.errors.required"),
	phone: z.string().nonempty("inputs.phone.errors.required"),
	email: z.string().nonempty("inputs.email.errors.required").includes("@", { message: "inputs.email.errors.email" }).includes(".", { message: "inputs.email.errors.email" }),
});
