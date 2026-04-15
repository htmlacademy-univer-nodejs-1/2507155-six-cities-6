#!/usr/bin/env node
import 'reflect-metadata';
import { CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(), // TODO DI? (т.к. это cli, то скорее нет)
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
