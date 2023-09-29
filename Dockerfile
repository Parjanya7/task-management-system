#Alpine nodejs image for minimal run environment
FROM node:18.0.0-alpine

#Setting Up work directory
WORKDIR /task-management-system

#Copy package.json and package-lock.json
COPY package*.json ./

#Install Dependencies
RUN npm i

#Copy rest of code
COPY . .

#Application port
EXPOSE 3000

#Start App
CMD [ "npm", "run", "start:dev" ]