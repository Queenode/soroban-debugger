import * as vscode from 'vscode';
import { SorobanDebugAdapterDescriptorFactory } from './debug/adapter';

export function activate(context: vscode.ExtensionContext): void {
  const factory = new SorobanDebugAdapterDescriptorFactory(context);

  const configProvider: vscode.DebugConfigurationProvider = {
    resolveDebugConfiguration(folder, config) {
      const settings = vscode.workspace.getConfiguration('soroban-debugger', folder);
      config.requestTimeoutMs = config.requestTimeoutMs ?? settings.get<number>('requestTimeoutMs');
      config.connectTimeoutMs = config.connectTimeoutMs ?? settings.get<number>('connectTimeoutMs');
      return config;
    }
  };

  context.subscriptions.push(
    vscode.debug.registerDebugAdapterDescriptorFactory('soroban', factory),
    vscode.debug.registerDebugConfigurationProvider('soroban', configProvider),
    factory
  );
}

export function deactivate(): void {
  // Cleanup on extension deactivation
}
