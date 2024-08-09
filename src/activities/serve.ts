import { Order } from "../server/models/OrderModel";

export async function serve({
  workflowId,
  order,
}: {
  workflowId: string;
  order: Order;
}): Promise<Order> {
  console.log("Serve Is Waiting for A Signal");
  return order;
}
