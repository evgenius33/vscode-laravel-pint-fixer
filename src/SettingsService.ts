import { existsSync } from 'fs';
import { type Disposable, workspace, type WorkspaceConfiguration } from 'vscode';

import { StatusBarService } from './StatusBarService';

export class SettingsService {
	private ready: boolean = false;
	private settings: WorkspaceConfiguration | null = null;
	private readonly statusBar: StatusBarService;

	constructor(statusBar: StatusBarService) {
		this.statusBar = statusBar;

		this.loadSettings();
	}

	get isReady(): boolean {
		return this.ready;
	}

	get getPintBinPath(): string | undefined {
		return this.settings?.get<string>('pintBinPath', '');
	}

	get getPintConfigPath(): string | boolean {
		if (workspace.workspaceFolders && workspace.workspaceFolders.length > 0) {
			const workspacePath = workspace.workspaceFolders[0].uri.fsPath;
			const pintConfigFilePath = `${workspacePath}/pint.json`;

			if (existsSync(pintConfigFilePath)) {
				return pintConfigFilePath;
			}
		}

		const pintConfigFilePath = this.settings?.get<string>('pintConfigPath', '');

		if (pintConfigFilePath && pintConfigFilePath.length > 0) {
			if (existsSync(pintConfigFilePath)) {
				return pintConfigFilePath;
			}
		}

		return false;
	}

	public registerDisposables(): Disposable[] {
		const changeConfigurationListener = workspace.onDidChangeConfiguration(() => {
			this.loadSettings();
		});

		return [changeConfigurationListener];
	}

	private loadSettings(): void {
		this.settings = workspace.getConfiguration('laravel-pint-fixer');

		this.ready = this.checkPintBinPath();
	}

	private checkPintBinPath(): boolean {
		if (this.getPintBinPath === '') {
			this.statusBar.warning();

			return false;
		}

		this.statusBar.ready();

		return true;
	}
}
