FROM node:alpine
WORKDIR /webapp
COPY ./package*.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "run", "start"] 