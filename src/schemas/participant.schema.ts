import { z } from "zod";

export const participantSchema = z.object({
	firstName: z.string().nonempty("participant.first-name.errors.required"),
	lastName: z.string().nonempty("participant.last-name.errors.required"),
	street: z.string().nonempty("participant.street.errors.required"),
	zip: z.string().min(5, "participant.zip.errors.min").max(5, "participant.zip.errors.max"),
	residence: z.string().nonempty("participant.residence.errors.required"),
	phone: z.string().nonempty("participant.phone.errors.required"),
	email: z.string().nonempty("participant.email.errors.required").email("participant.email.errors.email"),
});
