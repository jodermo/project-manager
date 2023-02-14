# AWS ECS Server

**Simple documantation for launching a Node.js application with Amazon ES2**

*© 06.2022 by Moritz Petzka [petzka.com](https://petzka.com)*

<br>
<br>

#### 1. Open ***[AWS Management Console](https://aws.amazon.com/de/console/)***

<br>

#### 2. Create Database
- go to ***[RDS](https://eu-west-1.console.aws.amazon.com/rds/home)***
- go to the section **Databases** and click on **Create database** to create a new database
- select method **Standard create**
- select engine **PostgreSQL**
- select template **Free tier**
- set **DB instance identifier** (not the database name)
- set **Master username** and **Master password** (+ **Confirm password**)
- set **Public access** to **Yes**
- expand the section for **Additional configuration** and set **Initial database name** (this is the database name)
- click on **Create database**
<br>


#### 3. Set Permissions for Database

- go to ***[RDS](https://eu-west-1.console.aws.amazon.com/rds/home)***
- go to the section **Databases** and select the database
- click on the link in **VPC security groups**
- click on the **Security group ID** of the security group
- set the **Inbound rules** and **Outbound rules**

<br>


#### 4. Set Permissions for S3

- go to ***IAM / [Roles](https://us-east-1.console.aws.amazon.com/iamv2/home#/roles)***
- search and select **ecsTaskExecutionRole**
- click on **App permission** and select **Attach policies**
- search and select S3 policy for ESC (*e.g.* **AmazonS3FullAccess** or **AmazonS3ReadOnlyAccess**)

<br>


#### 5. Create Environment Variables

- prepare your `.env` file
- go to ***[S3](https://s3.console.aws.amazon.com/s3/buckets)***
- click on **Create bucket** to create a new bucket or select existing bucket
- select new bucket and click on **Upload** and upload your `.env` file
- select uploaded `.env` file and copy the URI for **Amazon Resource Name (ARN)** (*e.g.* *`arn:aws:s3:::yolomio-config/.env`)


<br>


#### 6. Create Repository

- go to ***[Elastic Container Registry](https://eu-west-1.console.aws.amazon.com/ecr/repositories)***
- click on **Create repository** to create a new repository
- select new repository and click on **Permissions** (in sidebar) to create the permissions
    - add permissions for the repository
    - go back to **Repositories** list view
- push repository content via AWS CLI (*example below under* **Docker Deployment**)
- copy **URI** of the repository ( *e.g.* * `902117801782.dkr.ecr.eu-west-1.amazonaws.com/server` )

<br>

#### 7. Push Local Project Files with Docker
    
- Set your AWS credentials
    - run: `aws configure`
- Enter server directory
    - enter server directory with Dockerfile (*e.g.* `cd <path>/<repository>/server`)
- Build docker image
    - run: `docker build -t server .`
- Login to AWS repository (*e.g.* `902117801782.dkr.ecr.eu-west-1.amazonaws.com`)
    - run: `aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 902117801782.dkr.ecr.eu-west-1.amazonaws.com`
- tag docker image
    - run: `docker tag server:latest 902117801782.dkr.ecr.eu-west-1.amazonaws.com/server:latest`
- push docker image
    - run: `docker push 902117801782.dkr.ecr.eu-west-1.amazonaws.com/server:latest`

<br>

#### 8. Create Task Definition

- go to ***Elastic Container Service / [Task Definitions](https://eu-west-1.console.aws.amazon.com/ecs/home?region=eu-west-1#/taskDefinitions)***
- click on **Create new Task Definition** to create a new task definition
    - choose **Fargate** and click **Next step**
    - enter **Task definition name**
    - choose Task role **None**
    - click on **Add container** to add the repository
        - enter **Container name**
        - set repository **Image** ( *e.g.* `902117801782.dkr.ecr.eu-west-1.amazonaws.com/server:latest` from the copied URI *)
        - set **Environment Files**, Source: `Source`, Location: (*e.g.* `arn:aws:s3:::yolomio-config/.env` from the copied Amazon Resource Name (ARN) *)
        - click **Add**
    - click **Create**

<br>

#### 9. Create Cluster

- go to ***[Elastic Container Service](https://eu-west-1.console.aws.amazon.com/ecs/home?region=eu-west-1#/clusters)***
- click on **Create Cluster** to create a new cluster
    - choose **Networking only** and click **Next step**
    - enter **Cluster name** 
    - click **Create**

<br>
     
#### 10. Create Service
- select the cluster
- click on **Create** to create a new servie
   - choose Launch type **Fargate**
   - enter **Service name**
   - set **Number of tasks** (minimum 1)
   - click **Next step**
   - choose one of the **Subnets**
   - click **Next step**
   - click **Next step**
   - click **Create Service**

<br>

#### 11. Done - Look for **Public IP**
- select the **Cluster**
    - select the **Service**
        - select the tab **Tasks**
        - select the created **Task**
            - Look for **Public IP** under the section **Network**
        
<br>

