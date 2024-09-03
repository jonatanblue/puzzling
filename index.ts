import 'dotenv/config';  // must be imported first, so the OPENAI_API_KEY is set when loading PromptTemplateRuntime
import { Puzzlet } from "@puzzlet/sdk";
import { PromptTemplateRuntime } from "@puzzlet/prompt-template";

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}

getEnvVar('OPENAI_API_KEY'); // Just to make sure it is set
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

  const output = await promptTemplate.runSingle(promptName);
  if ("data" in output[0]) {
    console.log(output[0].data);
  }
}

run().catch(console.error);
