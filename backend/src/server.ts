/** source/server.ts */
import http from "http";
import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import systemParameterRoutes from "./routes/systemParameter.routes";
import { DataSource } from "typeorm";
import { SystemParameter } from "./entity/SystemParameter.class";
import { seedSystemParameters } from "./seeders/systemParameter.seeder";
import deductionsroutes from "./routes/deduction.routes";
import { Deduction } from "./entity/Deduction.class";
import { User } from "./entity/User.class";
import { Role } from "./entity/Role.class";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import authRoutes from "./routes/auth.routes";
import salaryBreakdownRoutes from "./routes/salaryBreakdown.routes";
import { seedMattData } from "./seeders/mattSeeder";

const router: Express = express();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: "salaryapp",
  entities: [SystemParameter, User, Role, Deduction],
  synchronize: true,
  logging: false,
});

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    seedSystemParameters();

    seedMattData();

    /** Logging */
    router.use(morgan("dev"));
    /** Parse the request */
    router.use(express.urlencoded({ extended: false }));
    /** Takes care of JSON data */
    router.use(express.json());

    /** RULES OF OUR API */
    router.all("*splat", (req: Request, res: Response, next?: NextFunction) => {
      // set the CORS headers
      res.header(
        "Access-Control-Allow-Headers",
        "origin, X-Requested-With, Content-Type, Accept, Authorization",
      );

      // set the CORS policy
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.header("Access-Control-Allow-Credentials", "true");
      // set the CORS method headers
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "GET, PATCH, DELETE, POST, PUT",
        );
        res.status(200).json({});
        return;
      }

      next?.();
    });

    /** Routes */
    router.use("/auth/", authRoutes);
    router.use("/", systemParameterRoutes);
    router.use("/", deductionsroutes);
    router.use("/", userRoutes);
    router.use("/", roleRoutes);
    router.use("/", salaryBreakdownRoutes);

    /** Error handling */
    router.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (err) {
          res.status(404).json({
            message: err.message,
          });
        }
      },
    );

    /** Server */
    const httpServer = http.createServer(router);
    const PORT: any = process.env.PORT ?? 8080;
    httpServer.listen(PORT, () =>
      console.log(`The server is running on port ${PORT}`),
    );
  })
  .catch((error) => console.log(error));
