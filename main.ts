// main.ts
import { verifyKey } from "https://deno.land/x/discordeno_interactions@0.1.0/mod.ts";
import { handleCommand } from "./commands/index.ts";
import { autoRegisterCommands } from "./register.ts";

const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;

// Auto register commands on startup
autoRegisterCommands();

async function handler(req: Request): Promise<Response> {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  // Verify request
  const valid = await verifyKey(body, signature!, timestamp!, PUBLIC_KEY);
  if (!valid) return new Response("invalid signature", { status: 401 });

  const interaction = JSON.parse(body);

  // Ping
  if (interaction.type === 1) return Response.json({ type: 1 });

  // Handle slash commands
  if (interaction.type === 2) return handleCommand(interaction);

  return new Response("Unhandled interaction");
}

addEventListener("fetch", (event) => {
  event.respondWith(handler(event.request));
});
