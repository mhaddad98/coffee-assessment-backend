import { Worker, NativeConnection } from "@temporalio/worker";
import * as activities from "../activities";

async function runWorker() {
  const connection = await NativeConnection.connect({
    address: "temporal:7233",
  });
  const worker = await Worker.create({
    connection,
    workflowsPath: require.resolve("../workflows"),
    activities,
    taskQueue: "coffeeOrders",
  });

  await worker.run();
}

runWorker().catch((err) => {
  console.error(err);
  process.exit(1);
});
