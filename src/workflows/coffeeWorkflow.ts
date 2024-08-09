import { executeChild, proxyActivities } from "@temporalio/workflow";
import { Order } from "../server/models/OrderModel";
import { taskUploader } from "./taskUploader";
import { taskManager } from "./taskManager";
import type * as activities from "../activities";

const { updateTask } = proxyActivities<typeof activities>({
  startToCloseTimeout: "2m",
});

export async function coffeeWorkflow(order: Order): Promise<void> {
  await Promise.all([
    executeChild(taskUploader, { args: [{ task: "boilWater", order }] }),
    executeChild(taskUploader, { args: [{ task: "grindBeans", order }] }),
  ]);

  await executeChild(taskUploader, { args: [{ task: "brewCoffee", order }] });

  await executeChild(taskManager, { args: [{ task: "serve", order }] });

  await updateTask({ task: "workflow", order, status: "finished" });
}
