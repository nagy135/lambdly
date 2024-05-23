import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { response } from "../src/utils";
import { CreateDashboardRequestDto } from "../src/dtos/requests/create-dashboard-request.dto";
import { createDashboard } from "../src/repositories/dashboard.repository";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	const linkRequest = plainToInstance(CreateDashboardRequestDto, JSON.parse(event.body ?? "{}"));

	try {
		await validateOrReject(linkRequest);
	} catch (error) {
		return response({
			statusCode: 400,
			body: error
		});
	}

	try {
		const linkEntity = await createDashboard({
			userId: linkRequest.userId,
			links: linkRequest.links
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
