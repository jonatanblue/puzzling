import 'dotenv/config';
import { Puzzlet } from "@puzzlet/sdk";
import { PromptTemplateRuntime } from "@puzzlet/prompt-template";

const apiKey = process.env.PUZZLET_API_KEY!;
const appId = process.env.PUZZLET_APP_ID!;
const templateName = process.env.PUZZLET_TEMPLATE_NAME!;
const promptName = process.env.PUZZLET_PROMPT_NAME!;

const client = new Puzzlet({ apiKey, appId });

// Use disableBatch: true for local development. Turn off for prod.
client.initTracing({ disableBatch: true });

async function run() {
  const json = await client.fetchTemplate(templateName);
  const promptTemplate = PromptTemplateRuntime.load(json);

  await promptTemplate.runSingle(promptName);
}

run().catch(console.error);
