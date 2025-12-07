// commands.ts
export const commands: Record<string, { run: (interaction: any) => string }> = {
  ping: {
    run: () => "Pong!",
  },
  help: {
    run: () => "Available commands: /ping, /help",
  },
};
