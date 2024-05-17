import { APIGatewayEvent } from "aws-lambda";

import { getLinks } from "../src/repositories/link.repository";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { GetLinksRequestDto } from "../src/dtos/requests/get-links-request.dto";

export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const getLinksRequest = plainToInstance(GetLinksRequestDto, event.queryStringParameters ?? {});

	try {
		await validateOrReject(getLinksRequest);
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify(error, undefined, 2)
		};
	}

	try {
		const linkEntities = await getLinks(getLinksRequest.userId);
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
