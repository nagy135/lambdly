import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { getLink } from "../src/repositories/link.repository";
import { GetLinkRequestDto } from "../src/dtos/requests/get-link-request.dto";
import { response } from "../src/utils";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	// hash is enforced by path parameter routing
	const hashRequest = event.pathParameters?.hash!;

	const getLinkRequestDto = plainToInstance(GetLinkRequestDto, { hash: hashRequest });

	try {
		await validateOrReject(getLinkRequestDto);
	} catch (error) {
		return response({
			statusCode: 400,
			body: error
		});
	}

	try {
		const linkEntity = await getLink(getLinkRequestDto.hash);
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
