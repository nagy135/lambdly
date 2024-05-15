import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

import { Link, PRIMARY_KEY } from "../entities/link.entity";

const db = DynamoDBDocument.from(new DynamoDB());
const tableName = process.env.TABLE_NAME;

export const createLink = async (link: Link): Promise<Link> => {
	link[PRIMARY_KEY] = link[PRIMARY_KEY] || Math.random().toString(36).slice(2);

	console.log("[INFO] final link shape:", JSON.stringify(link, undefined, 2));


	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.put({
		TableName: tableName,
		Item: link,
		ConditionExpression: `attribute_not_exists(${PRIMARY_KEY})`
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));
	return link;
}
