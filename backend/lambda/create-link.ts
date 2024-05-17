import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { createLink } from "../src/repositories/link.repository";
import { CreateLinkRequestDto } from "../src/dtos/requests/create-link-request.dto";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const linkRequest = plainToInstance(CreateLinkRequestDto, JSON.parse(event.body ?? "{}"));

	try {
		await validateOrReject(linkRequest);
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify(error, undefined, 2)
		};
	}

	try {
		const linkEntity = await createLink({
			userId: linkRequest.userId,
			url: linkRequest.url
		});
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
