FROM node

WORKDIR /frontendApp

COPY package.json package-lock.json /frontendApp/

RUN npm install

# could use . here as working directory is now /frontendApp
COPY . /frontendApp

EXPOSE 5173

CMD [ "npm", "run", "dev" ]