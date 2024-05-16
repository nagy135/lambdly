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
			partitionKey: { name: 'PK', type: AttributeType.STRING },
		});

		const healthLambda = new Lambda(this, 'health.ts');

		const createLinkLambda = new Lambda(this, 'create-link.ts',
			{ environment: { TABLE_NAME: table.tableName } }
		);

		const getLinkLambda = new Lambda(this, 'get-link.ts',
			{ environment: { TABLE_NAME: table.tableName } }
		);

		const getLinksLambda = new Lambda(this, 'get-links.ts',
			{ environment: { TABLE_NAME: table.tableName } }
		);


		table.grantWriteData(createLinkLambda);
		table.grantReadData(getLinkLambda);
		table.grantReadData(getLinksLambda);


		api.addIntegration('GET', '/health', healthLambda);
		api.addIntegration('POST', '/links', createLinkLambda);
		api.addIntegration('GET', '/links', getLinksLambda);
		api.addIntegration('GET', '/links/{hash}', getLinkLambda);
	}
}
