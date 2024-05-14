import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent } from "aws-lambda";

const db = DynamoDBDocument.from(new DynamoDB());


export const handler = async function(event: APIGatewayEvent) {
	console.log("request:", JSON.stringify(event, undefined, 2));
	const tableName = process.env.TABLE_NAME;
	const PRIMARY_KEY = "id";


	if (!tableName) {
		return {
			statusCode: 500,
			body: "TABLE_NAME environment variable is not set"
		};
	}

	const item = typeof event.body === "object"
		? event.body
		: JSON.parse(event.body);

	item[PRIMARY_KEY] = item[PRIMARY_KEY] || Math.random().toString(36).slice(2);
	console.log("item:", JSON.stringify(item, undefined, 2));

	try {
		await db.put({
			TableName: tableName,
			Item: item
		});
		return {
			statusCode: 200,
			body: JSON.stringify(item),
		};
	} catch (error) {
		return {
			statusCode: 500,
		};

	}
};
