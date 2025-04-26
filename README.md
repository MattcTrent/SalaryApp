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


## DB Commands

docker build -t my-database .

docker run -p 3306:3306 --name my-database-container -d my-database