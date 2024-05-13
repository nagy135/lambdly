import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Lambda } from './lambda';
import { ApiGateway } from './api-gateway';

export class LambdlyStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const api = new ApiGateway(this, 'lambdlyapi');

		const healthLambda = new Lambda(this, 'health.ts');
		const echoLambda = new Lambda(this, 'echo.ts');

		api.addIntegration('GET', '/health', healthLambda);
		api.addIntegration('POST', '/echo', echoLambda);
	}
}
