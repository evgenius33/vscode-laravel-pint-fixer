import { type Disposable, type OutputChannel, window } from 'vscode';

enum MessageType {
	Success = 'SUCCESS',
	Error = 'ERROR',
	Info = 'INFO'
}

export class LoggerService {
	private readonly channel: OutputChannel;

	constructor() {
		this.channel = window.createOutputChannel('Laravel Pint Fixer');
	}

	public success(message: string): void {
		this.message(MessageType.Success, message);
	}

	public error(message: string): void {
		this.message(MessageType.Error, message);
	}

	public info(message: string): void {
		this.message(MessageType.Info, message);
	}

	public registerDisposables(): Disposable[] {
		return [this.channel];
	}

	private message(type: MessageType, message: string): void {
		const time = new Date().toLocaleTimeString();

		this.channel.appendLine(`[${type}][${time}] ${message}`);
	}
}
