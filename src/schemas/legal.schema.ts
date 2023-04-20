import { z } from "zod";

export const legalSchema = z.object({
	accept: z.literal(true, {
		errorMap: (issue) => {
			if (issue.code === "invalid_literal") {
				return { message: "inputs.accept.errors.invalid" };
			}

			return { message: issue.message || "" };
		},
	}),
});
