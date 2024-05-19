import { APIGatewayEvent } from "aws-lambda";

import { getLinks } from "../src/repositories/link.repository";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { GetLinksRequestDto } from "../src/dtos/requests/get-links-request.dto";
import { response } from "../src/utils";

export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const getLinksRequest = plainToInstance(GetLinksRequestDto, event.queryStringParameters ?? {});

	try {
		await validateOrReject(getLinksRequest);
	} catch (error) {
		return response({
			statusCode: 400,
			body: error
		});
	}

	try {
		const linkEntities = await getLinks(getLinksRequest.userId);
		return response({
			statusCode: 200,
			body: linkEntities,
		});
	} catch (error) {
		return response({
			statusCode: 500,
			body: error
		});

	}


};
