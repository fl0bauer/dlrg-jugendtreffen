import { z } from "zod";

export const passwordSchema = z.object({
	password: z.literal(process.env.NEXT_PUBLIC_PASSWORD, {
		errorMap: (issue) => {
			if (issue.code === "invalid_literal") {
				return { message: "inputs.password.errors.invalid" };
			}

			return { message: issue.message || "" };
		},
	}),
});
