import { publishMessageToExchange } from "../messaging/publishMessageToExchange";
import { Order } from "../server/models/OrderModel";
import { Status } from "../server/services/orderService";
import axios from "axios";
export async function updateTask({
  task,
  order,
  status,
  workflowId,
}: {
  task: string;
  order: Order;
  status: Status;
  workflowId?: string;
}): Promise<void> {
  const msg = JSON.stringify({ task, order, status });
  await publishMessageToExchange("amq.topic", `order.${task}`, msg);

  await axios.post("http://serve:3001/task/update", {
    task,
    order,
    status,
    workflowId,
  });
}
