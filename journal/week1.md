# Week 1 — App Containerization

### Containerize Backend  with python-flask and Frontend with react-js

### Checked that python runs

```sh
cd backend-flask
export FRONTEND_URL="*"
export BACKEND_URL="*"
python3 -m flask run --host=0.0.0.0 --port=4567
cd ..
```

- unlocked port 4567
- got back JSON response when i click on the link

![json Response image](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/end-point.JPG)

## Required Homework

- Create Dockerfile on backend-flask directory [(commit dc2c7f7)](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/dc2c7f7a259d77d9dbb4076a5b50ca346b95a994)
  
  Build the image:
  ```sh
  docker build -t backend-flask ./backend-flask
  ```
  Run the container with the environment variable:
  ```sh
  docker run --rm -p 4567:4567 -it -e FRONTEND_URL='*' -e BACKEND_URL='*' backend-flask
  ```
 
  ### Get Container Images or Running Container Ids

  ```
     docker ps
     docker images
  ```
  ![]()
  
- Create Dockerfile on frontend-react-js directory [(commit dc2c7f7)](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/dc2c7f7a259d77d9dbb4076a5b50ca346b95a994)

   ```sh
    cd frontend-react-js 
   ```
    We have to run NPM Install int the frontend directory before building the container since it needs to copy the contents of node_modules
   ```sh
    npm i 
   ```

  Build the image:
  ```sh
  docker build -t frontend-react-js ./frontend-react-js
  ```
  Run the container:
  ```sh
  docker run -p 3000:3000 -d frontend-react-js
  ```
- Added "npm install" to gitpod.yml to ensure it is start up with workspace
[commit cf4cc00](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/cf4cc00e50724ead118bde230eba75fdeb45833e) 
 
- Create a Docker Compose file in the project root directory [(commit dc2c7f7)](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/dc2c7f7a259d77d9dbb4076a5b50ca346b95a994)
  
- Build and run the container using the command `docker compose up`.
 
  
  
### Added Notifications Endpoint for OpenAI
- Link to [commit 5ec2ea4](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/5ec2ea42fb10f10f01275d420145cd29df70ca89)

### Write Notifications backend python flask endpoint
- Link to [commit 8643a29](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/8643a29b8dbf21ba8effd8bf940f131c77d2fe06)

### Write Notifications Frontend React Page
- Link to [commit b9ed5fa](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/b9ed5fa1ef2eac8ec4061f2ee7ae64070afdab47)

This is a picture of my webpage for both notifications and home-page

![HomePage](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/home-page.JPG)

![Notifications](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/notification.JPG)

### Run Local DynamoDB container and Postgres container
- Added DynamoDB and Postgres to docker-compose.yml file [commit 1e5ea72](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/1e5ea7265f9293b13e00cd3fbcb57050c701d88c)


- Added postgres vscode extension d file [commit 9893ce9](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/9893ce9009dba2edab4d62d641c219da72b224e6)

  
- Test DynamoDB locally
  - Create Table
    ![Table](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/dynamo.JPG)
  - Create Items
    ![Items](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/table.JPG)
  - Connect to postgres client
    ![postgres client](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/dbserver.JPG)
  - Connect to postgres cli
    ![postgres](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/psql.JPG)
    

## Homework Challenges

### Running Dockerfiles Commands as a shell Script
- Create a shell script file in the backend-react-js directory that will win run the CMD from as an external command Dockerfile.[commit cf4cc00](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/cf4cc00e50724ead118bde230eba75fdeb45833e)


#### Pushing Images to Docker Hub
- I created an account with dockerhub
- `docker login` was used to command to login to my docker hub account from the terminal
- Tag the image `docker tag frontend-react-js:latest deedeo/cruddur-frontend-react-js`
- Tag the image `docker tag backend-flask:latest deedeo/cruddur-backend-flask`
- Pushed the images to docker hub.
- Here is the [backend image](https://hub.docker.com/r/deedeo/cruddur-backend-flask)  and [frontend image](https://hub.docker.com/r/deedeo/cruddur-frontend-react-js)in docker hub.
![docker hub](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/dockerhub.JPG)


### Implement healthcheck to Docker compose file


Here I made healthchecks for the frontend and backend in the docker compose file, i was facing health ckeck failure after this so my logs made me understand curl was not install so i add curl Installation to the Dockerfile [commit 6ac7c4f](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/6ac7c4f39a9044a597d21aeaecd82b4afc530f15)

### Launch EC2 Instance, Installed Docker and Pull the cruddur images

- ![EC2 with cruddur](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/blob/main/journal/assets/dockerpull.JPG)


### Best Dockerfile Practices Researched and Implemented


- Implemented multi-stage builds to reduce the size of the docker images.

- Implemented multi-stage build with nginx as base of tje second stage to allow nginx server in production which is better than node server.

- I  used `.env` to keep sensitive informations and made sure not to push them to Github.

- Add some file to dockerignore to aviod them from been copied to the container and images. [commit a899abd](https://github.com/Deedeo/aws-bootcamp-cruddur-2023/commit/a899abd6aea4dfdd78a72d3300bbfd20a71eabe6)

- Ensure that files that can be change frequently are below in the Dokerfile.
- Ensure files that might not need to change are on top in the dockerfile.
  
  
  
  

