import { z } from "zod";

export const passwordSchema = (password: string) =>
	z.object({
		password: z.literal(password, {
			errorMap: (issue) => {
				if (issue.code === "invalid_literal") {
					return { message: "inputs.password.errors.invalid" };
				}

				return { message: issue.message || "" };
			},
		}),
	});
