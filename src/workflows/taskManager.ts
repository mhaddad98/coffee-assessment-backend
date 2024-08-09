import {
  defineSignal,
  proxyActivities,
  setHandler,
  workflowInfo,
} from "@temporalio/workflow";
import { Order } from "../server/models/OrderModel";

import type * as activities from "../activities";

const { addTask, updateTask } = proxyActivities<typeof activities>({
  startToCloseTimeout: "2m",
});

export async function taskManager({
  task,
  order,
}: {
  task: string;
  order: Order;
}): Promise<void> {
  const signalName = `${task}Signal`;
  const receiveSignal = defineSignal<[boolean]>(signalName);

  async function waitForSignal(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setHandler(receiveSignal, (signal: boolean) => {
        if (signal) {
          resolve();
        } else {
          reject(new Error(`${task} Fail`));
        }
      });
    });
  }
  const workflowId = workflowInfo().workflowId; // Get current workflow ID

  await addTask({ task, order, status: "started", workflowId });
  try {
    await waitForSignal();
    await updateTask({ task, order, status: "finished" });
  } catch (err) {
    await updateTask({ task, order, status: "failed" });
  }
}
