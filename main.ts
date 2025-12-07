// main.ts
import { Client, Intents } from "https://deno.land/x/harmony/mod.ts";

const TOKEN = Deno.env.get("DISCORD_TOKEN")!;
const GUILD_ID = Deno.env.get("DISCORD_GUILD_ID")!; // your test server ID

const client = new Client({ intents: [Intents.GUILDS] });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  // Register commands for your guild
  await client.application.commands.set([
    {
      name: "ping",
      description: "Replies with Pong!",
    },
    {
      name: "help",
      description: "Shows help message",
    },
  ], GUILD_ID);

  console.log("Commands registered!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.data.name === "ping") {
    await interaction.respond({ content: "Pong!" });
  }
  if (interaction.data.name === "help") {
    await interaction.respond({ content: "Available commands: /ping, /help" });
  }
});

await client.connect(TOKEN);
