FROM node:alpine
WORKDIR /aws_service
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"] 

FROM node:alpine
WORKDIR /aws_testrunner
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"]