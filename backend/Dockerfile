FROM node:lts-alpine3.18

WORKDIR /backend

# could use . here as working directory is now /frontendApp
COPY package*.json .
COPY /backend/package*.json /backend/

COPY /backend /backend/ 

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "dev" ]