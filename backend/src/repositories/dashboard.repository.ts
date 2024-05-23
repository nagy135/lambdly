import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { Dashboard } from "../entities/dashboard.entity";
import { Link } from "../entities/link.entity";

const prefix = (id: string) => id.startsWith("DASHBOARD#") ? id : `DASHBOARD#${id}`;


const db = DynamoDBDocument.from(new DynamoDB());
const tableName = process.env.TABLE_NAME;

/**
	* creates a new Dashboard entity, UPSERTing if already exists
	*/
export const createDashboard = async ({ userId, links }: { userId: string; links: Link[] }): Promise<Dashboard> => {
	const dashboard: Dashboard = {
		PK: prefix(userId),
		links
	};

	console.log("[INFO] final dashboard shape:", JSON.stringify(dashboard, undefined, 2));

	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.put({
		TableName: tableName,
		Item: dashboard,
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));

	return dashboard;
}

export const getDashboard = async (userId: string): Promise<Dashboard | undefined> => {
	if (!tableName) throw new Error("TABLE_NAME is not set");

	const response = await db.get({
		TableName: tableName,
		Key: { PK: prefix(userId) }
	});
	console.log("[INFO] db output:", JSON.stringify(response, undefined, 2));

	return response.Item ? response.Item as Dashboard : undefined;
}

