import express, { Response, Request } from "express";
import {
  addOrder,
  addTask,
  getAllOrders,
  updateTaskStatus,
} from "../services/orderService";
import { runWorkflow } from "../../temporalClients/runWorkflow";
import { sendSignal } from "../../workflows/signals/sendSignal";
import { Order } from "../models/OrderModel";

export default function createRouter() {
  const router = express.Router();

  router
    .route("/")
    .get(async (req: Request, res: Response) => {
      try {
        const orders = await getAllOrders();
        res.status(200).send(orders);
      } catch (error) {
        res.status(500).send({ error: "Failed To Create Order." });
      }
    })
    .post(async (req: Request, res: Response) => {
      const order: Order = req.body;
      try {
        const orderId = await addOrder(order);
        const workflowId = await runWorkflow({ ...order, id: orderId });
        await addTask("workflow", orderId, "started", workflowId as string);
        res.status(200).send({ message: "Order Created successfully." });
      } catch (error) {
        console.log(error);
        console.log(error);

        res.status(500).send({ error: "Failed To Create Order." });
      }
    });

  router.route("/signal").post(async (req: Request, res: Response) => {
    const { workflowId, signalName, signalValue } = req.body;
    try {
      await sendSignal(workflowId, signalName, signalValue);
      res.status(200).send({ message: "Signal sent successfully" });
    } catch (error) {
      res.status(500).send({ error: "Failed To Send Signal" });
    }
  });

  return router;
}
