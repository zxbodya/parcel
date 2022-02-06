/// <reference types="node" />
import * as util from 'util';
import { PluginLogger as PluginLogger$1, LogEvent, IDisposable } from '@parcel/types';
import { DiagnosticWithoutOrigin, Diagnostic, Diagnostifiable } from '@parcel/diagnostic';

declare class Logger {
    #private;
    onLog(cb: (event: LogEvent) => unknown): IDisposable;
    verbose(diagnostic: Diagnostic | Array<Diagnostic>): void;
    info(diagnostic: Diagnostic | Array<Diagnostic>): void;
    log(diagnostic: Diagnostic | Array<Diagnostic>): void;
    warn(diagnostic: Diagnostic | Array<Diagnostic>): void;
    error(input: Diagnostifiable, realOrigin?: string): void;
    progress(message: string): void;
}
declare const logger: Logger;

/** @private */
declare type PluginLoggerOpts = {
    origin: string;
};
declare class PluginLogger implements PluginLogger$1 {
    /** @private */
    origin: string;
    /** @private */
    constructor(opts: PluginLoggerOpts);
    /** @private */
    updateOrigin(diagnostic: DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): Diagnostic | Array<Diagnostic>;
    verbose(diagnostic: DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): void;
    info(diagnostic: DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): void;
    log(diagnostic: DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): void;
    warn(diagnostic: DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): void;
    error(input: Diagnostifiable | DiagnosticWithoutOrigin | Array<DiagnosticWithoutOrigin>): void;
    /** @private */
    progress(message: string): void;
}
/** @private */
declare const INTERNAL_ORIGINAL_CONSOLE: {
    assert(condition?: boolean, ...data: any[]): void;
    assert(value: any, message?: string, ...optionalParams: any[]): void;
    clear(): void;
    clear(): void;
    count(label?: string): void;
    count(label?: string): void;
    countReset(label?: string): void;
    countReset(label?: string): void;
    debug(...data: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(item?: any, options?: any): void;
    dir(obj: any, options?: util.InspectOptions): void;
    dirxml(...data: any[]): void;
    dirxml(...data: any[]): void;
    error(...data: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
    group(...data: any[]): void;
    group(...label: any[]): void;
    groupCollapsed(...data: any[]): void;
    groupCollapsed(...label: any[]): void;
    groupEnd(): void;
    groupEnd(): void;
    info(...data: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(...data: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    table(tabularData?: any, properties?: string[]): void;
    table(tabularData: any, properties?: readonly string[]): void;
    time(label?: string): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: any[]): void;
    timeLog(label?: string, ...data: any[]): void;
    timeStamp(label?: string): void;
    timeStamp(label?: string): void;
    trace(...data: any[]): void;
    trace(message?: any, ...optionalParams: any[]): void;
    warn(...data: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    Console: NodeJS.ConsoleConstructor;
    profile(label?: string): void;
    profileEnd(label?: string): void;
};
/**
 * Patch `console` APIs within workers to forward their messages to the Logger
 * at the appropriate levels.
 * @private
 */
declare function patchConsole(): void;
/** @private */
declare function unpatchConsole(): void;

export default logger;
export { INTERNAL_ORIGINAL_CONSOLE, PluginLogger, PluginLoggerOpts, patchConsole, unpatchConsole };
