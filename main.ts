import { Client, Intents } from "https://deno.land/x/harmony@v2.9.1/mod.ts";

// --- Environment variables ---
const TOKEN = Deno.env.get("DISCORD_TOKEN");
const GUILD_ID = Deno.env.get("DISCORD_GUILD_ID"); // Your test server ID

if (!TOKEN) throw new Error("DISCORD_TOKEN not set");
if (!GUILD_ID) throw new Error("DISCORD_GUILD_ID not set");

// --- Initialize client ---
const client = new Client({ intents: [Intents.GUILDS] });

// --- Ready event ---
client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  // Fetch application to ensure commands property exists
  await client.application.fetch();

  // Register guild commands (instant)
  await client.application.commands.set(
    [
      { name: "ping", description: "Replies with Pong!" },
      { name: "help", description: "Shows help message" },
    ],
    GUILD_ID
  );

  console.log("Commands registered!");
});

// --- Interaction handler ---
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  switch (interaction.data.name) {
    case "ping":
      await interaction.respond({ content: "Pong!" });
      break;
    case "help":
      await interaction.respond({
        content: "Available commands: /ping, /help",
      });
      break;
    default:
      await interaction.respond({ content: "Unknown command." });
  }
});

// --- Connect to Discord ---
await client.connect(TOKEN);
