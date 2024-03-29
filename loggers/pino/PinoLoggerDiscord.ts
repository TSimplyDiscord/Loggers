import process from 'node:process';
import { pino, type LoggerOptions, type TransportTargetOptions } from 'pino';
import { type SecretsStore } from '../SecretsStore/SecretsStore.js';
import { type Logger } from './Logger.js';

export class PinoLoggerDiscord implements Logger {
	private readonly logger;

	constructor(secrets: SecretsStore, discordAlways = false) {
		// Always used transports
		const targets: TransportTargetOptions[] = [
			{
				target: 'pino-pretty',
				options: {
					colorize: true,
				},
				level: 'debug',
			},
		];

		// Add transports only used in production
		if (process.env['NODE_ENV'] === 'production' || discordAlways) {
			targets.push({
				target: 'pino-discord-webhook',
				level: 'warn',
				options: {
					webhookURL: secrets['loggerDiscordWebhookURL'],
				},
			});
		}

		const transport = pino.transport({
			targets,
		}) as LoggerOptions;
		this.logger = pino(transport);
		if (process.env['NODE_ENV'] !== 'production') {
			this.logger.level = 'debug';
		}
	}

	error(error: Error | string) {
		this.logger.error(error);
	}

	warn(message: string) {
		this.logger.warn(message);
	}

	info(message: string) {
		this.logger.info(message);
	}

	debug(message: string) {
		this.logger.debug(message);
	}
}
