import * as ping from "./ping.ts";
import * as help from "./help.ts";

export const commands = { ping, help };

// JSON for Discord
export const allCommandsJSON = Object.values(commands).map((cmd) => cmd.data);

export function handleCommand(interaction: any) {
  const name = interaction.data.name;
  const cmd = commands[name];

  if (!cmd) {
    return Response.json({ type: 4, data: { content: "Unknown command" } });
  }

  return cmd.run(interaction);
}
