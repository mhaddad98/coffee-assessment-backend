import amqplib, { Connection, Channel } from "amqplib";

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function getRabbitMQConnection(): Promise<Connection> {
  if (!connection) {
    connection = await amqplib.connect("amqp://rabbitmq");
  }
  return connection;
}

export async function getRabbitMQChannel(): Promise<Channel> {
  if (!channel) {
    const conn = await getRabbitMQConnection();
    channel = await conn.createChannel();
  }
  return channel;
}

export async function closeRabbitMQConnection() {
  if (channel) {
    await channel.close();
    channel = null;
  }
  if (connection) {
    await connection.close();
    connection = null;
  }
}
