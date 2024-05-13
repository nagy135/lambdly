import { APIGatewayEvent } from "aws-lambda";

export const handler = async function(event: APIGatewayEvent) {

	console.log("request:", JSON.stringify(event, undefined, 2));

	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `OK`
	};
};
