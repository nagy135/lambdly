import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { createLink } from "../src/repositories/link.repository";
import { CreateLinkRequestDto } from "../src/dtos/requests/create-link-request.dto";
import { response } from "../src/utils";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const linkRequest = plainToInstance(CreateLinkRequestDto, JSON.parse(event.body ?? "{}"));

	try {
		await validateOrReject(linkRequest);
	} catch (error) {
		return response({
			statusCode: 400,
			body: error
		});
	}

	try {
		const linkEntity = await createLink({
			userId: linkRequest.userId,
			url: linkRequest.url
		});
		return response({
			statusCode: 200,
			body: linkEntity
		});
	} catch (error) {
		return response({
			statusCode: 500,
			body: error
		});

	}


};
