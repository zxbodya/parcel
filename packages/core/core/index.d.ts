/// <reference types="node" />
import { DependencySpecifier, EnvMap, TargetDescriptor, FilePath, BuildMode, HMROptions, ServerOptions, LogLevel, DetailedReportOptions, Engines, OutputFormat, InitialParcelOptions, BuildSuccessEvent, BuildEvent, AsyncSubscription } from '@parcel/types';
import { FileSystem } from '@parcel/fs';
import { Cache } from '@parcel/cache';
import { PackageManager } from '@parcel/package-manager';
import WorkerFarm, { FarmOptions } from '@parcel/workers';
import ThrowableDiagnostic, { Diagnostic } from '@parcel/diagnostic';
import { AbortSignal } from 'abortcontroller-polyfill/dist/cjs-ponyfill';

declare function registerSerializableClass(name: string, ctor: {
    new (...args: any): any;
}): void;
declare function unregisterSerializableClass(name: string, ctor: {
    new (...args: any): any;
}): void;
declare function prepareForSerialization(object: any): any;
declare function restoreDeserializedObject(object: any): any;
declare function serialize(object: any): Buffer;
declare function deserialize(buffer: Buffer): any;

/**
 * A path that's relative to the project root.
 */
declare type ProjectPath = string;

declare type ParcelOptions = {
    entries: Array<ProjectPath>;
    config?: DependencySpecifier;
    defaultConfig?: DependencySpecifier;
    env: EnvMap;
    targets: Array<string> | {
        readonly [x: string]: TargetDescriptor;
    } | undefined | null;
    shouldDisableCache: boolean;
    cacheDir: FilePath;
    mode: BuildMode;
    hmrOptions: HMROptions | undefined | null;
    shouldContentHash: boolean;
    serveOptions: ServerOptions | false;
    shouldBuildLazily: boolean;
    shouldAutoInstall: boolean;
    logLevel: LogLevel;
    projectRoot: FilePath;
    shouldProfile: boolean;
    shouldPatchConsole: boolean;
    detailedReport?: DetailedReportOptions | null;
    inputFS: FileSystem;
    outputFS: FileSystem;
    cache: Cache;
    packageManager: PackageManager;
    additionalReporters: Array<{
        packageName: DependencySpecifier;
        resolveFrom: ProjectPath;
    }>;
    instanceId: string;
    readonly defaultTargetOptions: {
        readonly shouldOptimize: boolean;
        readonly shouldScopeHoist?: boolean;
        readonly sourceMaps: boolean;
        readonly publicUrl: string;
        readonly distDir?: ProjectPath;
        readonly engines?: Engines;
        readonly outputFormat?: OutputFormat;
        readonly isLibrary?: boolean;
    };
};

declare const INTERNAL_TRANSFORM: symbol;
declare const INTERNAL_RESOLVE: symbol;
declare class Parcel {
    #private;
    isProfiling: boolean;
    constructor(options: InitialParcelOptions);
    _init(): Promise<void>;
    run(): Promise<BuildSuccessEvent>;
    _end(): Promise<void>;
    _startNextBuild(): Promise<BuildEvent | undefined | null>;
    watch(cb?: (err: Error | undefined | null, buildEvent?: BuildEvent) => unknown): Promise<AsyncSubscription>;
    _build({ signal, startTime, }?: {
        signal?: AbortSignal;
        startTime?: number;
    }): Promise<BuildEvent>;
    _getWatcherSubscription(): Promise<AsyncSubscription>;
    _getResolvedParcelOptions(): ParcelOptions;
    startProfiling(): Promise<void>;
    stopProfiling(): Promise<void>;
    takeHeapSnapshot(): Promise<void>;
}
declare class BuildError extends ThrowableDiagnostic {
    constructor(diagnostic: Array<Diagnostic> | Diagnostic);
}
declare function createWorkerFarm(options?: Partial<FarmOptions>): WorkerFarm;

export default Parcel;
export { BuildError, INTERNAL_RESOLVE, INTERNAL_TRANSFORM, Parcel, createWorkerFarm, deserialize, prepareForSerialization, registerSerializableClass, restoreDeserializedObject, serialize, unregisterSerializableClass };
