FROM node:alpine
WORKDIR /chatbot
COPY ./package*.json ./
RUN npm install
COPY ./ ./
ENV GOOGLE_APPLICATION_CREDENTIALS=./config/google_keys.json
EXPOSE 5002
CMD ["npm", "run", "start"] 
