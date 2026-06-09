## Project Dependencies

The Project requires:
NodeJs

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

You can now run the full app stack (MySQL + backend + frontend) with a single command from the repo root:

```bash
docker compose up --build
```

Or via npm script:

```bash
npm run docker:up
```

Services:
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8080](http://localhost:8080)
- MySQL: `localhost:3306`

To stop:

```bash
docker compose down
```

To stop and remove DB volume data:

```bash
docker compose down -v
```