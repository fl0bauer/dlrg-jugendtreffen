import { z } from "zod";

export const sepaSchema = z.object({
	accountOwner: z.string().nonempty("sepa.account-owner.errors.required"),
	street: z.string().nonempty("sepa.street.errors.required"),
	zip: z.string().min(5, "sepa.zip.errors.min").max(5, "sepa.zip.errors.max"),
	residence: z.string().nonempty("sepa.residence.errors.required"),
	creditInstitution: z.string().nonempty("sepa.credit-institution.errors.required"),
	iban: z
		.string()
		.nonempty("sepa.iban.errors.required")
		.startsWith("DE", "sepa.iban.errors.start-with-de")
		.transform((value) => value.replaceAll(" ", ""))
		.pipe(z.string().length(22, "sepa.iban.errors.length")),
});
