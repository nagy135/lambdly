import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { Link } from "../entities/link.entity";

const db = DynamoDBDocument.from(new DynamoDB());
const tableName = process.env.TABLE_NAME;

/**
	* creates a new Link entity, creating PK if not passed in
	*/
export const createLink = async ({ url, userId }: { url: string; userId: string }): Promise<Link> => {
	const link: Link = {
		PK: Math.random().toString(36).slice(2),
		SK: userId,
		url
	};

	console.log("[INFO] final link shape:", JSON.stringify(link, undefined, 2));

	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.put({
		TableName: tableName,
		Item: link,
		ConditionExpression: `attribute_not_exists(PK)`
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));
	return link;
}

/**
	* @returns Link entity matching given PK
	*/
export const getLink = async (PK: string): Promise<Link> => {
	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.get({
		TableName: tableName,
		Key: { PK }
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));

	return response.Item as Link;
}

/**
	* @returns all Link entities
	*/
export const getLinks = async (): Promise<Link[]> => {
	// TODO: remove this check by env alteration
	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.scan({
		TableName: tableName
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));

	return response.Items as Link[];
}
