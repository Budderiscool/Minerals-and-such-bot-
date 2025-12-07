// commands/help.ts
import { message } from "../utils/response.ts";

export const data = {
  name: "help",
  description: "Shows a help message",
  type: 1,
};

export function run() {
  return message("Available commands: /ping, /help");
}
