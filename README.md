## Project Dependencies

The Project requires:
NodeJs (only if you run frontend/backend on the host; Docker Compose does not need a host Node install)

Currently all Dev is has been done againts
NodeJs: v20.17.0

Running on other versions may have unforseen issues.

The Node Express backend project requires a MySQL db to connect to.

## Getting Started - Frontend

Ensure either the .env file is populated with a api url and timeout or create a .env.development.local files is created with populated variables, require variables will be available in the .env file.

ensure you have installed all dependencies, this can eb done with

```bash
npm install
# or
yarn install
```

Once this is done you can start the development server

To run the development server:

```bash
npm start
# or
yarn start
```

See Frontend/README.md for more details

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Getting Started - Backend

Navigate to:
Backend/src/server.ts

Ensure the connection details here are set to connect to a configured MySQL DB name SalaryApp, Data seeding will create any required tables on this database.

Now you can run the project and it will Connect to the database and do any data seeding required.

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.


## Run With Docker Compose (One Command)

Docker Desktop (or Docker Engine + Compose) is enough to run and develop locally. Node and MySQL do not need to be installed on the host.

From the repo root:

```bash
docker compose up --build
```

Or via npm script (requires Node on the host):

```bash
npm run docker:up
```

Frontend and backend source are bind-mounted, so edits on your machine hot-reload in the containers. Dependencies stay in Docker volumes.

### Installing npm packages (Docker)

With the stack running, run npm **inside the container**. A host Node install is not required. `package.json` and the lockfile still update on your machine (they are bind-mounted), so you can commit them as usual.

Frontend:

```bash
docker compose exec frontend npm install some-package
docker compose exec frontend npm install -D some-package
```

Backend:

```bash
docker compose exec backend npm install some-package
docker compose exec backend npm install -D some-package
```

If you only changed `package.json` by hand:

```bash
docker compose exec frontend npm install
docker compose exec backend npm install
```

Restart that service if the running process does not pick up the new package:

```bash
docker compose restart frontend
docker compose restart backend
```

Do not rely on `npm install` in a normal host terminal unless Node is installed there. Host `node_modules` is unused; the container volume is what the app uses.

Services:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8080](http://localhost:8080)
- MySQL: `localhost:3306`

To stop (keeps the database and installed npm dependencies):

```bash
docker compose down
```

To stop and remove the database and dependency volumes:

```bash
docker compose down -v
```