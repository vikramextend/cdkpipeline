import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class CdkpipelinesDemoStack extends Stack {

  //url for the gateway endpoint to test
  public readonly urlOutput: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    //lambda function that constains the functionality
    const handler = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
    });

    //an apigateway make lambda accessible

    const gw = new apigw.LambdaRestApi(this,'Gateway',{
      description: 'Endpoint for a simple lambda powered web serivce',
      handler
    });

    this.urlOutput = new CfnOutput(this,'Url',{value: gw.url});
  }
}
