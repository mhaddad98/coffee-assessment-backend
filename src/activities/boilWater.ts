import { Order } from "../server/models/OrderModel";

export async function boilWater({
  workflowId,
  order,
}: {
  workflowId: string;
  order: Order;
}): Promise<Order> {
  console.log(`started boilWater on ${order.id}`);
  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      console.log(`finished boilWater on ${order.id}`);
      resolve();
    }, 60 * 1000);
  });
  return order;
}
