import express from "express";
import { Sequelize } from "sequelize";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import orderRouter from "./routes/order";
import activitiesRouter from "./routes/activities";
import taskRouter from "./routes/task";

import registerModels from "./models";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const database = process.env.DB_NAME as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;

const sequelizeInstance = new Sequelize(database, username, password, {
  host: process.env.NODE_ENV === "production" ? "server_DB" : "localhost",
  port: 3306,
  dialect: "mysql",
});

registerModels(sequelizeInstance);

app.use("/order", orderRouter());
app.use("/activities/boilWater", activitiesRouter("boilWater"));
app.use("/activities/grindBeans", activitiesRouter("grindBeans"));
app.use("/activities/brewCoffee", activitiesRouter("brewCoffee"));
app.use("/activities/serve", activitiesRouter("serve"));
app.use("/task", taskRouter());

function connectWithRetry() {
  sequelizeInstance
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .then(() => {
      if (process.env.NODE_ENV !== "production") {
        sequelizeInstance.sync({ alter: true });
        console.log("Database Sync Success");
      }
    })
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.error(`Error connecting to sequelize: ${error.message}`);
      console.log("Retrying connection in 5 seconds...");
      setTimeout(connectWithRetry, 5 * 1000);
    });
}

export function getSequelizeInstance() {
  return sequelizeInstance;
}

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

connectWithRetry();
