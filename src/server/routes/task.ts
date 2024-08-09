import express, { Response, Request } from "express";
import { addTask, updateTaskStatus } from "../services/orderService";

export default function createRouter() {
  const router = express.Router();

  router.route("/update").post(async (req: Request, res: Response) => {
    const { task, order, status, workflowId } = req.body;

    try {
      await updateTaskStatus(task, order.id, status, workflowId);
      res.status(200).send({ message: "Status Updated successfully." });
    } catch (error) {
      res.status(500).send({ error: "Failed To update Status." });
    }
  });

  router.route("/add").post(async (req: Request, res: Response) => {
    const { task, order, status, workflowId } = req.body;

    try {
      await addTask(task, order.id, status, workflowId);
      res.status(200).send({ message: "Status Updated successfully." });
    } catch (error) {
      res.status(500).send({ error: "Failed To update Status." });
    }
  });

  return router;
}
