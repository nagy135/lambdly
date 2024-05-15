import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { Link } from "../src/entities/link.entity";
import { createLink } from "../src/repositories/link.repository";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const link = plainToInstance(Link, JSON.parse(event.body ?? "{}"));

	try {
		await validateOrReject(link);
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify(error, undefined, 2)
		};
	}

	try {
		const linkEntity = await createLink(link);
		return {
			statusCode: 200,
			body: JSON.stringify(linkEntity, undefined, 2)
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error, undefined, 2)
		};

	}


};
