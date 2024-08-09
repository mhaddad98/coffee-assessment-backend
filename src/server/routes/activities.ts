import express, { Response, Request } from "express";
import { addTask, getTask, updateTaskStatus } from "../services/orderService";

export default function createRouter(activity: string) {
  const router = express.Router();

  router
    .route("/started")
    .get(async (req: Request, res: Response) => {
      try {
        const orders = await getTask(activity, "started");

        res.status(200).send(orders);
      } catch (error) {
        res.status(500).send({ error: "Failed To get tasks." });
      }
    })
    .post(async (req: Request, res: Response) => {
      try {
        const { orderId, workflowId } = req.body;
        await addTask(activity, orderId, "started", workflowId);
        res.status(200).send({ message: "Task Started on database" });
      } catch (err) {
        res.status(500).send({ message: "failed to add task into database" });
      }
    });

  router
    .route("/finished")
    .get(async (req: Request, res: Response) => {
      try {
        const orders = await getTask(activity, "finished");
        res.status(200).send(orders);
      } catch (error) {
        res.status(500).send({ error: "Failed To get tasks." });
      }
    })
    .post(async (req: Request, res: Response) => {
      try {
        const { taskType, orderId } = req.body;
        await updateTaskStatus(taskType, orderId, "finished");
        res.status(200).send({ message: "Task finished on database" });
      } catch (err) {
        res.status(500).send({ message: "failed to update task status" });
      }
    });

  router
    .route("/failed")
    .get(async (req: Request, res: Response) => {
      try {
        const orders = await getTask(activity, "failed");
        res.status(200).send(orders);
      } catch (error) {
        res.status(500).send({ error: "Failed To get tasks." });
      }
    })
    .post(async (req: Request, res: Response) => {
      try {
        const { taskType, orderId } = req.body;
        await updateTaskStatus(taskType, orderId, "failed");
        res.status(200).send({ message: "Task failed on database" });
      } catch (err) {
        res.status(500).send({ message: "failed to failed task status" });
      }
    });

  return router;
}
