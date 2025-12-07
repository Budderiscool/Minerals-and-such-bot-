// main.ts
import { verifyKey } from "https://deno.land/x/discord_interactions@1.0.0/mod.ts";
import { handleCommand } from "./commands/index.ts";
import { autoRegisterCommands } from "./register.ts";

const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY")!;

// Auto register all commands on startup
autoRegisterCommands();

async function handler(req: Request): Promise<Response> {
  const signature = req.headers.get("x-signature-ed25519");
  const timestamp = req.headers.get("x-signature-timestamp");
  const body = await req.text();

  // Verify
  const valid = await verifyKey(body, signature!, timestamp!, PUBLIC_KEY);
  if (!valid) return new Response("invalid signature", { status: 401 });

  const json = JSON.parse(body);

  // Discord PING check
  if (json.type === 1) return Response.json({ type: 1 });

  // Slash command
  if (json.type === 2) return handleCommand(json);

  return new Response("Unhandled interaction");
}

addEventListener("fetch", (event) => {
  event.respondWith(handler(event.request));
});
