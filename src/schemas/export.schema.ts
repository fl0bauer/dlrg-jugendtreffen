import { z } from "zod";

export const exportSchema = z.object({
	fileName: z.string().trim().nonempty("inputs.file-name.errors.required"),
});
