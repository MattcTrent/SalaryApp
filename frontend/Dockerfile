FROM node:18.17-alpine3.18

WORKDIR /frontend

COPY package*.json .
COPY /frontend/package*.json /frontend/

COPY /frontend /frontend

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

# -t is name:tag combo to assign
# docker build -t salaryWebApp:Latest .

# -p publish and expose port, -d :start detached, --rm: remove after stop, --name: assigns name
# docker run -p 5173:5173 -d -rm --name salaryWebApp