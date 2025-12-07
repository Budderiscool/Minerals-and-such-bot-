// main.ts
import { importKeyRaw, discordInteraction } from "./deps.ts";
import { commands } from "./commands.ts";

const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY");
if (!PUBLIC_KEY) {
  console.error("ERROR: DISCORD_PUBLIC_KEY not set.");
  Deno.exit(1);
}

const key = await importKeyRaw(PUBLIC_KEY);

const handler = await discordInteraction(key, commands);

addEventListener("fetch", (e) => {
  e.respondWith(handler(e.request));
});
