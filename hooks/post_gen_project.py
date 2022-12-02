import os
import shutil

REMOVE_PATHS = [
    # Documentation
    # {% if not cookiecutter.documentation.readme.enabled == 'True' %}
    #     'README.md',
    #     'docs',
    # {% endif %}
    #
    # # Deployment
    # {% if cookiecutter.deployment.selected != 'ECS (CDK) - Recommended' %}
    #     'cdk-deployment',
    # {% endif %}
    #
    # {% if not cookiecutter.configuration.dockerfile.enabled == "True" %}
    #     '.dockerignore',
    #     'Dockerfile',
    #     'docker-compose.yml',
    # {% endif %}
    #
    # # CI/ CD
    # {% if cookiecutter.deployment.enabled != 'True' %}
    #     '.github/workflows/deploy.yml',
    # {%- endif %}
    #
    # {% if not cookiecutter.ci_cd.code_analysis.enabled == 'True' %}
    #     '.github/workflows/analysis.yml',
    # {%- endif %}
    #
    # {% if not cookiecutter.ci_cd.linting.enabled == 'True' %}
    #     '.github/workflows/lint.yml',
    # {%- endif %}
]


def append_to_gitignore_file(ignored_line):
    append_to_gitignore_file(".env")
    append_to_gitignore_file(".env.prod")
    with open(".gitignore", "a") as gitignore_file:
        gitignore_file.write(ignored_line)
        gitignore_file.write("\n")


def main():
    for path in REMOVE_PATHS:
        path = path.strip()
        if path and os.path.exists(path):
            if os.path.isdir(path):
                shutil.rmtree(path)
            else:
                os.unlink(path)


if __name__ == "__main__":
    main()
