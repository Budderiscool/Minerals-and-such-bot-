// main.ts
import { importKeyRaw, discordInteraction } from "jsr:@maks11060/discord-interactions@0.0.8";

const PUBLIC_KEY = Deno.env.get("DISCORD_PUBLIC_KEY");
if (!PUBLIC_KEY) throw new Error("DISCORD_PUBLIC_KEY not set");

// Import the raw key
const key = await importKeyRaw(PUBLIC_KEY);

// Array of [commandObject, handlerFunction] tuples
const handler = await discordInteraction([
  [
    {
      name: "ping",
      description: "Replies with Pong!",
      type: 1, // ChatInput
    },
    async (interaction) => {
      return interaction.reply({ content: "Pong!" });
    },
  ],
  [
    {
      name: "help",
      description: "Shows help message",
      type: 1,
    },
    async (interaction) => {
      return interaction.reply({
        content: "Available commands: /ping, /help",
      });
    },
  ],
]);

// Handle incoming HTTP requests from Discord
addEventListener("fetch", (e) => e.respondWith(handler(e.request)));
