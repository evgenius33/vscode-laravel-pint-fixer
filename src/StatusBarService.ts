import { Disposable, StatusBarAlignment, type StatusBarItem, type TextEditor, ThemeColor, window } from 'vscode';

enum Tooltip {
	Ready = 'Laravel Pint Fixer ready',
	Error = 'Laravel Pint Fixer exited with an error',
	Warning = 'Laravel Pint Fixer setup pintBinPath',
	Loading = 'Laravel Pint Fixer fixing'
}

enum Command {
	Format = 'laravel-pint-fixer.format',
	Warning = 'laravel-pint-fixer.warning'
}

export class StatusBarService {
	private readonly statusBarItem: StatusBarItem;
	private readonly statusBarItemText: string = 'Laravel Pint Fixer';

	constructor() {
		this.statusBarItem = window.createStatusBarItem('laravel-pint-fixer.status', StatusBarAlignment.Right, -1);

		this.statusBarItem.name = 'Laravel Pint Fixer';

		this.ready();

		this.statusBarItem.show();
	}

	public ready(): void {
		this.statusBarItem.text = `$(notebook-state-success) ${this.statusBarItemText}`;
		this.statusBarItem.backgroundColor = new ThemeColor('statusBarItem.activeBackground');
		this.statusBarItem.tooltip = Tooltip.Ready;
		this.statusBarItem.command = Command.Format;
	}

	public error(): void {
		this.statusBarItem.text = `$(notebook-state-error) ${this.statusBarItemText}`;
		this.statusBarItem.backgroundColor = new ThemeColor('statusBarItem.errorBackground');
		this.statusBarItem.tooltip = Tooltip.Error;
		this.statusBarItem.command = Command.Format;
	}

	public warning(): void {
		this.statusBarItem.text = `$(extensions-warning-message) ${this.statusBarItemText}`;
		this.statusBarItem.backgroundColor = new ThemeColor('statusBarItem.warningBackground');
		this.statusBarItem.tooltip = Tooltip.Warning;
		this.statusBarItem.command = Command.Warning;
	}

	public loading(): void {
		this.statusBarItem.text = '$(sync~spin) Laravel Pint Fixer';
		this.statusBarItem.backgroundColor = new ThemeColor('statusBarItem.activeBackground');
		this.statusBarItem.tooltip = Tooltip.Loading;
	}

	public registerDisposables(): Disposable[] {
		const activeTextEditorListener = window.onDidChangeActiveTextEditor((editor: TextEditor | undefined) => {
			if (editor?.document.languageId !== 'php') {
				this.statusBarItem.hide();
			} else {
				this.statusBarItem.show();
			}
		});

		return [activeTextEditorListener, this.statusBarItem];
	}
}
