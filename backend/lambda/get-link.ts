import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { getLink } from "../src/repositories/link.repository";
import { GetLinkRequestDto } from "../src/dtos/requests/get-link-request.dto";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	// hash is enforced by path parameter routing
	const hashRequest = event.pathParameters?.hash!;

	const getLinkRequestDto = plainToInstance(GetLinkRequestDto, { hash: hashRequest });

	try {
		await validateOrReject(getLinkRequestDto);
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify(error, undefined, 2)
		};
	}

	try {
		const linkEntity = await getLink(getLinkRequestDto.hash);
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
