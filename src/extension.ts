import { type ExtensionContext, extensions } from 'vscode';

import { FixerService } from './FixerService';
import { LoggerService } from './LoggerService';
import { SettingsService } from './SettingsService';
import { StatusBarService } from './StatusBarService';

export function activate(context: ExtensionContext) {
	const logger = new LoggerService();
	const statusBar = new StatusBarService();
	const settings = new SettingsService(statusBar);
	const fixer = new FixerService(logger, settings, statusBar);

	const extensionId = context.extension.id;
	const extensionVersion = extensions.getExtension(extensionId)?.packageJSON.version;

	logger.info(`Extension ID: ${extensionId}.`);
	logger.info(`Extension Version: ${extensionVersion}.`);

	context.subscriptions.push(...logger.registerDisposables());
	context.subscriptions.push(...statusBar.registerDisposables());
	context.subscriptions.push(...settings.registerDisposables());
	context.subscriptions.push(...fixer.registerDisposables());
}

export function deactivate() {}
