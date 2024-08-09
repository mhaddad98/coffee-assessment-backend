import { Worker } from "@temporalio/worker";
import * as activities from "../activities";
import { Connection } from "@temporalio/client";

async function runWorker() {
  const connection = await Connection.connect({
    address: "temporal:7233",
  });
  const worker = await Worker.create({
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
