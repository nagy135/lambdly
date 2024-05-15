import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import * as path from "path"

export class Lambda extends NodejsFunction {
	constructor(
		scope: Construct,
		fileName: string,
		config?: Partial<NodejsFunctionProps>
	) {
		super(scope, fileName, {
			architecture: Architecture.ARM_64,
			runtime: Runtime.NODEJS_20_X,
			entry: path.join(__dirname, `../lambda/${fileName}`),
			logRetention: RetentionDays.ONE_DAY,
			...config
		})
	}
}
