import 'dotenv/config';
import { Puzzlet } from "@puzzlet/sdk";
import { PromptTemplateRuntime } from "@puzzlet/prompt-template";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

const apiKey = getEnvVar('PUZZLET_API_KEY');
const appId = getEnvVar('PUZZLET_APP_ID');
const templateName = getEnvVar('PUZZLET_TEMPLATE_NAME');
const promptName = getEnvVar('PUZZLET_PROMPT_NAME');

const client = new Puzzlet({ apiKey, appId });

// Use disableBatch: true for local development. Turn off for prod.
client.initTracing({ disableBatch: true });

async function run() {
  const json = await client.fetchTemplate(`${templateName}.json`);
  const promptTemplate = PromptTemplateRuntime.load(json);

  await promptTemplate.runSingle(promptName);
}

run().catch(console.error);
