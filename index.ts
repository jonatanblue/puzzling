import 'dotenv/config';
import { Puzzlet } from "@puzzlet/sdk";
import { PromptTemplateRuntime } from "@puzzlet/prompt-template";

// Replace 'your_api_key' and 'your_app_id' with actual values
const apiKey = process.env.PUZZLET_API_KEY!;
const appId = process.env.PUZZLET_APP_ID!;

const client = new Puzzlet({ apiKey, appId });

// Use disableBatch: true for local development. Turn off for prod.
client.initTracing({ disableBatch: true });

async function run() {
  const templateName = "prompt_template_1.json";
  const promptName = "prompt1";

  const json = await client.fetchTemplate(templateName);
  const promptTemplate = PromptTemplateRuntime.load(json);

  await promptTemplate.runSingle(promptName);
}

// Execute the function
run().catch(console.error);
