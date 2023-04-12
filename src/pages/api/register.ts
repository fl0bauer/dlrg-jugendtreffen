import { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/prisma/registration";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		res.end("Only POST allowed");
	}

	const body = JSON.parse(req.body);
	const response = await register(body);
	return res.status(200).json(response);
}
