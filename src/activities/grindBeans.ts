import { Order } from "../server/models/OrderModel";

export async function grindBeans({
  workflowId,
  order,
}: {
  workflowId: string;
  order: Order;
}): Promise<Order> {
  console.log(`started grindBeans on ${order.id}`);

  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      console.log(`finished grindBeans on ${order.id}`);
      resolve();
    }, 25 * 1000);
  });
  return order;
}
