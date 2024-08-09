import { Client } from "@temporalio/client";

export async function sendSignal(
  workflowId: string,
  signalName: string,
  signalValue: any
): Promise<void> {
  const client = new Client();
  try {
    const handle = client.workflow.getHandle(workflowId);
    await handle.signal(signalName, signalValue);
    console.log(
      `Signal '${signalName}' sent to workflow '${workflowId}' with value ${signalValue}`
    );
  } catch (error) {
    console.error(
      `Failed to send signal '${signalName}' to workflow '${workflowId}':`,
      error
    );
    throw error;
  }
}
