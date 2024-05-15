import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { Link } from "../src/entities/link.entity";
import { validateOrReject } from "class-validator";

const db = DynamoDBDocument.from(new DynamoDB());
const tableName = process.env.TABLE_NAME;

export const handler = async function(event: APIGatewayEvent) {
	console.log("[INFO] request:", JSON.stringify(event, undefined, 2));

	if (!tableName) {
		return {
			statusCode: 500,
			body: "TABLE_NAME environment variable is not set"
		};
	}

	const possibleLink = plainToInstance(Link, JSON.parse(event.body ?? "{}"));
	try {
		await validateOrReject(possibleLink);
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify(error, undefined, 2)
		};
	}


	const item = typeof event.body === "object"
		? event.body
		: JSON.parse(event.body);

	item[PRIMARY_KEY] = item[PRIMARY_KEY] || Math.random().toString(36).slice(2);
	console.log("item:", JSON.stringify(item, undefined, 2));

	try {
		const response = await db.put({
			TableName: tableName,
			Item: item,
			ConditionExpression: `attribute_not_exists(${PRIMARY_KEY})`
		});
		console.log("response:", JSON.stringify(response, undefined, 2));
		return {
			statusCode: 200,
			body: JSON.stringify(item),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error, undefined, 2)
		};

	}
};
