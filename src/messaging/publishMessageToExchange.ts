import { Channel } from "amqplib";
import { getRabbitMQChannel } from "./rabbitmq";

export async function publishMessageToExchange(
  exchange: string,
  routingKey: string,
  msg: string
) {
  const channel: Channel = await getRabbitMQChannel();

  channel.publish(exchange, routingKey, Buffer.from(msg));
}
