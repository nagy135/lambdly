import { APIGatewayEvent } from "aws-lambda";

import { getLinks } from "../src/repositories/link.repository";

export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	try {
		const linkEntities = await getLinks();
		return {
			statusCode: 200,
			body: JSON.stringify(linkEntities, undefined, 2)
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error, undefined, 2)
		};

	}


};
