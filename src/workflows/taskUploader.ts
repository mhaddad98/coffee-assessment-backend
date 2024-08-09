import { proxyActivities, workflowInfo } from "@temporalio/workflow";
import { Order } from "../server/models/OrderModel";

type ActivityArgs = {
  task: string;
  order: Order;
  status?: Status;
  workflowId?: string;
  [key: string]: any; // Allow additional properties
};

import type * as activities from "../activities";
import { Status } from "../server/services/orderService";
const allActivities = proxyActivities<typeof activities>({
  startToCloseTimeout: "2m",
});
export async function taskUploader({
  task,
  order,
}: {
  task: string;
  order: Order;
}): Promise<void> {
  const workflowId = workflowInfo().workflowId; // Get current workflow ID

  await allActivities.addTask({
    task,
    order,
    status: "started",
    workflowId,
  });
  try {
    await (
      allActivities[task as keyof typeof activities] as (
        args: ActivityArgs
      ) => Promise<void>
    )({ task, order });
    await allActivities.updateTask({ task, order, status: "finished" });
  } catch (err) {
    await allActivities.updateTask({ task, order, status: "failed" });
  }
}
