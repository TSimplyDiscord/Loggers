# pino Loggers

[TSimplyDiscord](https://github.com/TSimplyDiscord/TSimplyDiscord/)  comes with [pino](https://getpino.io) bundled and configured to log to the console with pretty-pino formatting.

This folder contains Loggers with different pino configurations and transports.

## Usage

### Logging to console and a Discord webhook.

1) Download [`PinoLoggerDiscord.ts`](./PinoLoggerDiscord.ts) ([DownGit](https://downgit.cvbox.org/#/home?url=https://github.com/TSimplyDiscord/Loggers/blob/main/loggers/pino/PinoLoggerDiscord.ts)). 
1) Move `PinoLoggerDiscord.ts` to `src/lib/Logger/`.
1) Install required dependencies:
    ```terminal
    yarn add pino-discord-webhook
    ```
1) Update `Bot.ts` to use the new logger.
    ```ts
    import { PinoLogger } from './Logger/PinoLoggerDiscord.js';

    this.logger = new PinoLoggerDiscord(secrets);
    ```
1) Update the call to `loadSecrets()` in `index.ts` to add the new required secret:
    ```ts
    additionalKeys: ['loggerDiscordWebhookURL']
    ```
