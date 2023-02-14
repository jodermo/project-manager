# AWS Deployment

##### *© 2022 - Moritz Petzka - [petzka.com](https://petzka.com/)*

### Deploy Apps with Amazon Web Services


<br><br>

## Preconfiguration

##### 1. Install AWS CLI

- Instructions: [docs.aws.amazon.com](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Docker has to be installed and must be running: [Get Docker](https://docs.docker.com/get-docker/)

<br>

##### 2. Configure AWS CLI

- Run `aws configure`
    - AWS Access Key ID: `AKIA25NTM5Z422332OVP`
    - AWS Secret Access Key: `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`
    - Default region name: `eu-central-1`
    - Default output format: `json`

<br>

##### 3. Login to AWS and Upload Data

- View push commands in [AWS ECS - Repositories](https://eu-central-1.console.aws.amazon.com/ecr/repositories?region=eu-central-1)
    - select your repository
    - click on **View push commands** *(top of the table)*
    - then follow the 4 steps to login to AWS and build and push the repository
        - Run `aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 750384901753.dkr.ecr.eu-central-1.amazonaws.com`
        - Run `docker build -t server .`
        - Run `docker tag server:latest 750384901753.dkr.ecr.eu-central-1.amazonaws.com/server:latest`
        - Run `docker push 750384901753.dkr.ecr.eu-central-1.amazonaws.com/server:latest`

