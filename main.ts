// main.ts
import { importKeyRaw, discordInteraction } from "./deps.ts";
import { commands } from "./commands.ts";

const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY");
if (!PUBLIC_KEY) throw new Error("DISCORD_PUBLIC_KEY not set");

const key = await importKeyRaw(PUBLIC_KEY);

// Correct usage: pass commands inside an object
const handler = await discordInteraction({
  key,
  commands,
});

addEventListener("fetch", (e) => e.respondWith(handler(e.request)));
