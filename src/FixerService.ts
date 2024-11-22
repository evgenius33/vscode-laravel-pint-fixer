import { exec } from 'child_process';
import { commands, type Disposable, languages, window } from 'vscode';

import { LoggerService } from './LoggerService';
import { SettingsService } from './SettingsService';
import { StatusBarService } from './StatusBarService';

export class FixerService {
	private readonly logger: LoggerService;
	private readonly settings: SettingsService;
	private readonly statusBar: StatusBarService;

	constructor(logger: LoggerService, settings: SettingsService, statusBar: StatusBarService) {
		this.logger = logger;
		this.settings = settings;
		this.statusBar = statusBar;
	}

	public registerDisposables(): Disposable[] {
		const formatCommand = commands.registerTextEditorCommand('laravel-pint-fixer.format', (textEditor) => {
			if (textEditor.document.languageId === 'php' && this.settings.isReady) {
				this.formatFile(textEditor.document.fileName);
			}
		});

		const warningCommand = commands.registerTextEditorCommand('laravel-pint-fixer.warning', () => {
			window.showInformationMessage('Setup "pintBinPath" value in settings');
		});

		const formatter = languages.registerDocumentFormattingEditProvider('php', {
			provideDocumentFormattingEdits: async (document) => {
				if (this.settings.isReady) {
					this.formatFile(document.fileName);
				}

				return [];
			}
		});

		return [formatCommand, warningCommand, formatter];
	}

	private formatFile(filePath: string): void {
		const pintConfigPath = this.settings.getPintConfigPath;

		let cmd = `${this.settings.getPintBinPath} ${filePath}`;

		if (pintConfigPath) {
			cmd = `${cmd} --config ${pintConfigPath}`;
		}

		this.statusBar.loading();

		exec(`${cmd}`, async (err, stdout) => {
			if (err) {
				this.statusBar.error();

				this.logger.error(`${cmd}`);
				this.logger.error(`${stdout}`);

				return;
			}

			commands.executeCommand('workbench.action.files.revert');

			this.statusBar.ready();

			this.logger.success(`${cmd}`);
		});
	}
}
