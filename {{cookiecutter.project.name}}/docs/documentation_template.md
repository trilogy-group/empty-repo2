# Introduction
Write a general description of the feature, i.e, what it is and what it allows the user to do. 

Eg: "This feature provides utilities for using AWS SNS in your python applications with best practices baked in" 

# Quickstart
Describes the fastest, easiest way to just get started with the new feature, in cases where all configurations come with defaults and don't explicitly need any manual user input or changes.

Eg. Push a commit or run `cdk deploy` to deploy new infrastructure with built-in obsevability 

# How to set it up?
Are there any explicit steps that an end user needs to take to set-up the feature in development? 

This can further be divided into several sub questions

## Install Packages/Libraries 
Any external packages that have been included in the respective build system (requirements.txt, package.json, gradle.build) and need to be installed by running relevant build commands

## External APIs/Services
Any external services that need to be set up to use this feature. 

Eg. Creating clients for OAuth apps

## Environment Variable Set up
Any extra environment variables that need to be provided/set for the feature to run properly. 

Eg. Adding Client Id and Client Secrets for OAuth Clients

Note that, these environment variables should be included in the [.env.dev.template](../env/.env.dev.template) file. Variable names, along with default values (if the defaults are not sensitive/secrets)

## IAM Permissions
Are there any extra IAM permissions that are required to run the app, 

Example, add s3:GetObject and s3:PutObject permissions to your IAM user to use a feature that makes calls to S3. Ideally, you want to give the required S3 policy statement in the documentation itself, which users can just copy paste

# How to use it?
This section should include example usage of the newly added feature, which can further be divided into sub parts

## Sample Usage
This part documents how to use the samples that are included with the feature, if any. Eg. Demo cURL requests that show how to use the graphQL API

## Run scripts
If you have included scripts that have all the required steps to run your feature and give the resulting output. 

Eg. test.sh script that runs all tests and generates test coverage report

If you have designed a feature that works as a vs code task or action (Eg. local debuggers, code formatters, etc.) include the steps required to launch the task

## Extending/Customizing usage
How to extend/customize the existing feature. 

Eg. Steps for adding a new model to the existing graphQL schema or steps for adding a new unit test. 
In most cases, just linking to the documentation of the external libraries that have been used should be enough, provided that you already have one sample implementation included in the feature

## Limitations
Are there any limitations or constraints that this feature imposes on the end user ?

Eg. User cannot use X-ray for observability if they choose to use the EYK deployment.

# How to deploy it in production?
These are the steps that are required to deploy the feature in production

## Changes to IaC
Is there a need to add new components to deployment environment? 

Eg. S3Bucket to store media, x-ray daemon to capture traces. 

`Note: Ideally, the required infrastructure changes should have already been present as part of the feature, and this section just makes those explicity clear`

## Environment Variable Set up
Any extra environment variables that need to be provided/set for the feature to run properly. 

Eg. Adding Client Id and Client Secrets for OAuth Clients

Note: These environment variables should be included in the [.env.prod.template](../env/.env.prod.template) file. 

Variable names, along with default values (if the defaults are not sensitive/secrets)

## Changes to Github actions
Changes that are required to the github actions that are run as part of CI/CD. 

Eg. Adding dependencies/set-up steps before the deployment step

`Note: These should already be included as part of the code changes, with this section only serving to explicitly inform the user of the same`

## Any manual steps
Sometimes, manual steps are required in production which the template contributor cannot automate. This section outlines the same. 

Eg. Creating an SSL certificate for your custom domain and attaching it to deployment infrastructure. (something, which as of the time of writing this doc, is not possible to automate.)

# How to Observe in production (Optional)
This section might be largely optional to a lot of feature additions

## How do I find the deployment?
Where can the user find the deployed feature/infrastructure? Is it included in the CDK output? Can they find it by looking at resources of the deployed cloudformation stack? Does it have a fixed name/ARN?

## How do I confirm the feature is working?
Is there an API endpoint that user can cURL to confirm the feature is working ? Are there logs/events/messages the system will be emitting to confirm that it is working?

## How do I effectively query the output of the feature?
If the feature outputs logs, is there someway to effectively search or query it in Cloudwatch? If it outputs data to a data store such as S3/Database, what should the user look for to confirm it working properly?

# How does it work? (Optional)
This section is entirely optional. Author might choose to include it in case the implemented feature has significant complexity that has been abstracted away from the end user and author wishes for the users to know the internal implementation details

## Implementaion
Describe how the feature works, preferably with links to relevant code changes

## Why was it done this way?
If there are any decisions in the implementation that may seem counter intuitive or arbitrary to the end user, use this section to explain your reasoning for why the feature was implemented the way it was
