import OrderModel, { Order } from "../models/OrderModel";
import TaskModel from "../models/TaskModel";
import { getSequelizeInstance } from "../index";
import { OrderInstance, TaskInstance } from "../models";
export type Status = "started" | "finished" | "failed";

export async function addOrder(order: Order) {
  try {
    const DB_Order = await OrderInstance.create({ ...order });
    return DB_Order.dataValues.id;
  } catch (err) {
    console.log(err);

    throw new Error("Failed To add Order To database");
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await OrderInstance.destroy({ where: { id: orderId } });
    return "Order deleted";
  } catch (err) {
    throw new Error("Failed To delete Order To database");
  }
}

export async function getAllOrders() {
  try {
    return await OrderInstance.findAll();
  } catch (err) {
    throw new Error("Failed To get all Orders from database");
  }
}

export async function getTask(taskType: string, status: string) {
  try {
    const tasks = await TaskInstance.findAll({
      where: {
        taskType,
        status,
      },
      include: [{ model: OrderInstance, as: "order" }],
      order: [["updatedAt", "DESC"]],
    });

    return tasks;
  } catch (err) {
    console.log(err);

    throw new Error("Failed To get all Orders from database");
  }
}

export async function addTask(
  taskType: string,
  orderId: string,
  status: Status,
  workflowId: string
) {
  try {
    await TaskInstance.create({ taskType, orderId, status, workflowId });
    console.log("added task ");
    return "Task added to database";
  } catch (err) {
    console.log(err);

    throw new Error("Failed To add Order To database");
  }
}

export async function updateTaskStatus(
  taskType: string,
  orderId: string,
  status: Status,
  workflowId?: string
) {
  try {
    if (workflowId) {
      await TaskInstance.update(
        { status, workflowId },
        { where: { taskType, orderId } }
      );
    }
    await TaskInstance.update({ status }, { where: { taskType, orderId } });

    return "Task added to database";
  } catch (err) {
    throw new Error("Failed To add Order To database");
  }
}
