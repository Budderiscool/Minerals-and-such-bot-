// register.ts
const TOKEN = Deno.env.get("DISCORD_TOKEN")!;
const CLIENT_ID = Deno.env.get("DISCORD_CLIENT_ID")!;

import { allCommandsJSON } from "./commands/index.ts";

export async function autoRegisterCommands() {
  console.log("Registering commands...");

  const res = await fetch(
    `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allCommandsJSON),
    }
  );

  console.log("Command registration result:", await res.text());
}
