import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkpipelinesDemoStage } from './cdkpipelines-demo-stage';

export class CdkpipelinesDemoPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
       super(scope, id , props) 

       const sourceArtifact = new codepipeline.Artifact();
       const cloudAssemblyArtifact = new codepipeline.Artifact();

       const pipeline = new CdkPipeline(this, 'Pipeline', {
        pipelineName: 'MyServicePipeline',
        cloudAssemblyArtifact,

        sourceAction: new codepipeline_actions.GitHubSourceAction({
            actionName: 'GitHub',
            output: sourceArtifact,
            oauthToken: SecretValue.secretsManager('github-token'),
            owner: 'vikramextend',
            repo: 'cdkpipeline',
          }),

        synthAction: SimpleSynthAction.standardNpmSynth({
            sourceArtifact,
            cloudAssemblyArtifact,
            
            // We need a build step to compile the TypeScript Lambda
            buildCommand: 'npm run build'
          }),

       });

    };
};