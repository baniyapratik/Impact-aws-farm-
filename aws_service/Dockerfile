FROM node:alphine 
WORKDIR /aws_service
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build