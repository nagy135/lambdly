import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

import { response } from "../src/utils";
import { GetDashboardRequestDto } from "../src/dtos/requests/get-dashboard-request.dto";
import { getDashboard } from "../src/repositories/dashboard.repository";


export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	// hash is enforced by path parameter routing
	const userIdRequest = event.pathParameters?.userId!;

	const getDashboardRequestDto = plainToInstance(GetDashboardRequestDto, { userId: userIdRequest });

	try {
		await validateOrReject(getDashboardRequestDto);
	} catch (error) {
		return response({
			statusCode: 400,
			body: error
		});
	}

	try {
		const dashboardEntity = await getDashboard(getDashboardRequestDto.userId);
		return response({
			statusCode: 200,
			body: dashboardEntity,
		});
	} catch (error) {
		return response({
			statusCode: 500,
			body: error
		});

	}


};
