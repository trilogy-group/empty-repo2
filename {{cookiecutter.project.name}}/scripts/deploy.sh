# Script to deploy the project to the server
# Refer to the documentation for more information - docs/deployment.md

{% if cookiecutter.deployment.selected == 'ECS (CDK) - Recommended' %}
cd cdk-deployment
cd backend
npm install -g aws-cdk
pip3 install -r requirements.txt
cdk deploy --all --require-approval never --outputs-file output.json
{% endif %}
