// commands.ts
import type { Command } from "./deps.ts";

export const commands: Command[] = [
  {
    name: "ping",
    description: "Replies with Pong!",
    type: 1, // ChatInput
    async run(interaction) {
      return interaction.reply({ content: "Pong!" });
    },
  },
  {
    name: "help",
    description: "Shows help message",
    type: 1,
    async run(interaction) {
      return interaction.reply({
        content: "Available commands: /ping, /help",
      });
    },
  },
];
