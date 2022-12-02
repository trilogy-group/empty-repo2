# Script to destroy the project deployment from the server
# Refer to the documentation for more information - docs/deployment.md

{% if cookiecutter.deployment.selected == 'ECS (CDK) - Recommended' %}
export $(cat .env.prod| xargs)
cd cdk-deployment
cd backend
pip install -r requirements.txt
cdk destroy --all --require-approval never
{% endif %}