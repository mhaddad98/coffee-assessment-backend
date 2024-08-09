import { Sequelize } from "sequelize";
import OrderModel from "./OrderModel";
import TaskModel from "./TaskModel";

let OrderInstance: ReturnType<typeof OrderModel>;
let TaskInstance: ReturnType<typeof TaskModel>;

export default (sequelizeInstance: Sequelize) => {
  // Initialize models
  OrderInstance = OrderModel(sequelizeInstance);
  TaskInstance = TaskModel(sequelizeInstance);

  // Define associations
  OrderInstance.hasMany(TaskInstance, { foreignKey: "orderId", as: "tasks" });
  TaskInstance.belongsTo(OrderInstance, { foreignKey: "orderId", as: "order" });
};

export { OrderInstance, TaskInstance };
