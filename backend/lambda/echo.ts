import { APIGatewayEvent } from "aws-lambda";

export const handler = async function(event: APIGatewayEvent) {
	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: event.body
	};
};
