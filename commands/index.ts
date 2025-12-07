// commands/index.ts
import * as ping from "./ping.ts";
import * as help from "./help.ts";

export const commands = {
  ping,
  help,
};

// Convert commands to JSON format for Discord
export const allCommandsJSON = Object.values(commands).map((cmd) => cmd.data);

export function handleCommand(interaction: any) {
  const name = interaction.data.name;
  const cmd = commands[name];

  if (!cmd) {
    return new Response(
      JSON.stringify({
        type: 4,
        data: { content: "Unknown command." },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  return cmd.run(interaction);
}
