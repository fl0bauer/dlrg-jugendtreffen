import { NextApiRequest, NextApiResponse } from "next";
import { getRegistrations } from "@/prisma/registration";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		res.end("Only GET allowed");
	}

	const registrations = await getRegistrations();
	return res.status(200).json(registrations);
}
