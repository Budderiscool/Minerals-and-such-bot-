// main.ts
import { Client, Intents } from "https://deno.land/x/harmony/mod.ts";
import { commands } from "./commands.ts";

const TOKEN = Deno.env.get("DISCORD_TOKEN");
if (!TOKEN) throw new Error("DISCORD_TOKEN not set");

const client = new Client({
  intents: [Intents.GUILDS],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

// Handle slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands[interaction.data.name];
  if (!command) return;

  await interaction.respond({ content: await command.run(interaction) });
});

await client.connect(TOKEN);
