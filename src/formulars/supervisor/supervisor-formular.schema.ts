import { z } from "zod";

export default function getSchema() {
	return z.object({
		firstName: z.string().nonempty("supervisor.first-name.errors.required"),
		lastName: z.string().nonempty("supervisor.last-name.errors.required"),
		street: z.string().nonempty("supervisor.street.errors.required"),
		zip: z.string().min(5, "supervisor.zip.errors.min").max(5, "supervisor.zip.errors.max"),
		residence: z.string().nonempty("supervisor.residence.errors.required"),
		phone: z.string().nonempty("supervisor.phone.errors.required"),
		email: z.string().nonempty("supervisor.email.errors.required").email("supervisor.email.errors.email"),
	});
}
