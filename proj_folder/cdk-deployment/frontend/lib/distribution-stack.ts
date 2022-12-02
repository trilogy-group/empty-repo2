import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cert from "aws-cdk-lib/aws-certificatemanager";
import * as s3 from "aws-cdk-lib/aws-s3";
import { config } from "dotenv";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
config();

export class DistributionStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, process.env.AWS_BUCKET_NAME ?? "{{ cookiecutter.project.slug }}-bucket".replace('_', ''), {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../build')],
      destinationBucket: bucket,
    });

    new cdk.CfnOutput(this, "AWSBUCKET", {
      value: bucket.bucketName
    });
    
    const origin = new S3Origin(bucket);
    // const certificate_arn = process.env.ACM_CERTIFICATE_ARN
    // const domain_name = process.env.DOMAIN_NAME
    const cdn = new Distribution(this, 'CDN', {
      defaultBehavior: { origin: origin }
      // Un comment this if you want to connect your own domain to cloudfront. 
      // Note that you will need to have a valid SSL certificate for your domain 
      // certificate: cert.Certificate.fromCertificateArn(this, "certificate", certificate_arn),
      // domainNames: [domain_name],
    });

    // cdn.addBehavior("/*", origin, { viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS })

    new cdk.CfnOutput(this, "DISTRIBUTIONDOMAINNAME", {
      value: cdn.distributionDomainName,
    });

    new cdk.CfnOutput(this, "AWSDISTRIBUTIONID", {
      value: cdn.distributionId,
    });

    this.add_tags(this);
  }

  add_tags(scope : any) : void {
    Tags.of(scope).add("AD", "{{cookiecutter.user.ad_username}}");
    Tags.of(scope).add("Project", "{{cookiecutter.project.name}}");
    Tags.of(scope).add("Email", "{{cookiecutter.user.email}}");
    Tags.of(scope).add("Quarter", "TU 2022");
    Tags.of(scope).add("Owner", "{{cookiecutter.user.first_name}}");
    Tags.of(scope).add("Deletion-advice", "Do not delete");
  }
}
