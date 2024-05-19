import { RemovalPolicy } from "aws-cdk-lib";
import { LambdaIntegration, LogGroupLogDestination, RestApi } from "aws-cdk-lib/aws-apigateway";
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class ApiGateway extends RestApi {
	constructor(scope: Construct, apiName: string) {
		super(scope, "LambdlyApiGateway", {
			restApiName: apiName,
			deployOptions: {
				accessLogDestination: new LogGroupLogDestination(new LogGroup(scope, "LambdlyApiLogGroup", {
					logGroupName: "lambdly_api_gateway",
					retention: RetentionDays.ONE_DAY,
					removalPolicy: RemovalPolicy.DESTROY
				}))
			}
		});
		this.root.addCorsPreflight({
			allowOrigins: ['*'],
			allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
			allowCredentials: true,
		})
	}

	addIntegration(method: string, path: string, lambda: IFunction) {
		const resource = this.root.resourceForPath(path);
		resource.addMethod(method, new LambdaIntegration(lambda))
	}
}
