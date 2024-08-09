import { Order } from "../server/models/OrderModel";

export async function brewCoffee({
  workflowId,
  order,
}: {
  workflowId: string;
  order: Order;
}): Promise<Order> {
  console.log(`started brewCoffee on ${order.id}`);

  await new Promise<void>((resolve) => {
    setTimeout(async () => {
      console.log(`finished brewCoffee on ${order.id}`);
      resolve();
    }, order.brewTimeInSeconds * 1000);
  });
  return order;
}
