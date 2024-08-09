import { WorkflowClient } from "@temporalio/client";
import { Order } from "../server/models/OrderModel";
import { coffeeWorkflow } from "../workflows/coffeeWorkflow";

export async function runWorkflow(order: Order) {
  try {
    const temporalClient = new WorkflowClient();

    const taskQueue = "coffeeOrders";
    const workflowId = `Ord-${order.id}`;

    await temporalClient.start(coffeeWorkflow, {
      taskQueue,
      args: [order],
      workflowId,
    });
    return workflowId;
  } catch (err) {
    console.log(err);
  }
}
