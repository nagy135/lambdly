import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Lambda } from './lambda';
import { ApiGateway } from './api-gateway';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';

export class LambdlyStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const api = new ApiGateway(this, 'lambdlyapi');

		const table = new Table(this, 'lambdlytable', {
			billingMode: BillingMode.PAY_PER_REQUEST,
			partitionKey: { name: 'id', type: AttributeType.STRING },
		});

		const healthLambda = new Lambda(this, 'health.ts');

		const writeLambda = new Lambda(this, 'write.ts',
			{ environment: { TABLE_NAME: table.tableName } }
		);


		table.grantWriteData(writeLambda);


		api.addIntegration('GET', '/health', healthLambda);
		api.addIntegration('POST', '/write', writeLambda);
	}
}
