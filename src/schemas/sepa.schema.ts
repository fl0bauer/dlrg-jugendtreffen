import { z } from "zod";

export const sepaSchema = z.object({
	accountOwner: z.string().nonempty("inputs.account-owner.errors.required"),
	street: z.string().nonempty("inputs.street.errors.required"),
	zip: z.string().length(5, "inputs.zip.errors.length"),
	residence: z.string().nonempty("inputs.residence.errors.required"),
	creditInstitution: z.string().nonempty("inputs.credit-institution.errors.required"),
	iban: z
		.string()
		.nonempty("inputs.iban.errors.required")
		.startsWith("DE", "inputs.iban.errors.start-with-de")
		.transform((value) => value.replaceAll(" ", ""))
		.pipe(z.string().length(22, "inputs.iban.errors.length")),
});
