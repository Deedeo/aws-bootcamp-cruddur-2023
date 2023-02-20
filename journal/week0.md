# Week 0 — Billing and Architecture
## Required Homework

### Overview 
Cruddur is an ephemeral micro-blogging platform with time-limited content or expiring posts. Cruddur is a platform that will uphold optimal privacy for its user, and cruddur is for anyone that doesn't want to maintain a permanent presence online. Cruddur is a community-focused platform.

### Conceptual Diagram on a Napkin for Cruddur
Conceptual design is simply trying to model the solution or our proposed system as a pure theoretical construct without regard for the practicalisation of trying to implement this on some actual pieces of hardware.

![conceptual design](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/conceptual-design.jpg)

### Logical Architectual Diagram for Cruddur.
Based on the Requirement gathering meeting, the logical design required for cruddur is to explain in more detail the necessary services to get started with cruddur.


![logical design image](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/logical-design.JPG)

[logical design lucidchart](https://lucid.app/lucidchart/8e0ba25f-d422-4fbc-bc26-99b956ffd2a5/edit?viewport_loc=-523%2C-170%2C2624%2C1260%2C0_0&invitationId=inv_af1328ef-fecd-4871-a0da-a265523aab27)

### Installed AWS cli and configure aws-cli auto-prompt with Gitpod.
I  exported environment variables such as the Access key and secret access key. The default region is us-east-2.

I could not push my .gitpod.yml to the aws-bootcamp-cruddur-2023 GitHub repository due to permission being denied. I  resolved this by setting the GitHub configuration for my Gitpod and integrating the Gitpod setting to allow writing to a public repository.

I resolve the permission error. This is the diagram of proof 



![gitpod](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/gitpod-config.PNG)

![aws-cli-proof](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/aws-cli-config.png)



### Create a Budget
 I had a budget before the boot camp because I wanted to try the JSON file method. I created another one using the JSON file. I set the monthly budget to $10 with a  threshold of 80%. I added the necessary email to get the notification for details about the budget. I did not create the Zero budget because i have that on my account already.
 
![aws-budget json](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/aws-budget-json.JPG)

![aws budget](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/aws-budget.PNG)
 
### Create a Billing Alarm 
To create a billing alarm, I was able to activate SNS. I confirm the subscription through my mail then, I used the aws cli installed in gitpod to create my billing alarm.

aws-sns-topic

![aws-sns](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/aws-sns.JPG)

aws billing alarm
![aws-billing-alarm](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/cloudwatch.JPG)


## HomeWork challenges


Set MFA for root user and my IAM admin user

![root user](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/mfa.PNG)

I created a ci/cd pipeline diagram for cruddur app i dont fully understand pipeline. As the bootcamp progress i will understand better.

![cicd-pipeline-diagram](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/cicd.JPG)



[cicd-link](https://t.co/dKY5mMg6rU)


I used EventBridge to hookup Health Dashboard to SNS and send notification to my mail when there is a service health issue.

![eventbride-aws-cli](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/eventbridge.JPG)



![sns-confirmation](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/sns.JPG)


![console-pics](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/aws-eventbridge.JPG)

