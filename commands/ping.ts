// commands/ping.ts
import { message } from "../utils/response.ts";

export const data = {
  name: "ping",
  description: "Replies with Pong!",
  type: 1,
};

export function run() {
  return message("Pong!");
}
