/// <reference types="node" />
import { FilePath, InitialParcelOptions, BundleGraph, PackagedBundle, Asset, Dependency, BuildEvent, BuildSuccessEvent } from '@parcel/types';
import { NodeFS, MemoryFS, OverlayFS, FileSystem } from '@parcel/fs';
import WorkerFarm from '@parcel/workers';
import Parcel from '@parcel/core';
import vm from 'vm';

declare const workerFarm: WorkerFarm;
declare const inputFS: NodeFS;
declare let outputFS: MemoryFS;
declare let overlayFS: OverlayFS;
declare function ncp(source: FilePath, destination: FilePath): Promise<void>;
declare type ExternalModules = {
    [name: string]: (a: vm.Context) => {
        [x: string]: unknown;
    };
};
declare function sleep(ms: number): Promise<void>;
declare function normalizeFilePath(filePath: string): FilePath;
declare const distDir: string;
declare function removeDistDirectory(): Promise<void>;
declare function symlinkPrivilegeWarning(): void;
declare function getParcelOptions(entries: FilePath | Array<FilePath>, opts?: Partial<InitialParcelOptions>): InitialParcelOptions;
declare function bundler(entries: FilePath | Array<FilePath>, opts?: Partial<InitialParcelOptions>): Parcel;
declare function findAsset(bundleGraph: BundleGraph<PackagedBundle>, assetFileName: string): Asset | undefined | null;
declare function findDependency(bundleGraph: BundleGraph<PackagedBundle>, assetFileName: string, specifier: string): Dependency;
declare function mergeParcelOptions(optsOne: InitialParcelOptions, optsTwo?: InitialParcelOptions | null): InitialParcelOptions;
declare function assertDependencyWasDeferred(bundleGraph: BundleGraph<PackagedBundle>, assetFileName: string, specifier: string): void;
declare function bundle(entries: FilePath | Array<FilePath>, opts?: InitialParcelOptions): Promise<BundleGraph<PackagedBundle>>;
declare function getNextBuild(b: Parcel): Promise<BuildEvent>;
declare function getNextBuildSuccess(b: Parcel): Promise<BuildSuccessEvent>;
declare function shallowEqual(a: Partial<{
    readonly [x: string]: unknown;
}>, b: Partial<{
    readonly [x: string]: unknown;
}>): boolean;
declare type RunOpts = {
    require?: boolean;
    strict?: boolean;
};
declare function runBundles(bundleGraph: BundleGraph<PackagedBundle>, parent: PackagedBundle, bundles: Array<[string, PackagedBundle]>, globals: unknown, opts?: RunOpts, externalModules?: ExternalModules): Promise<unknown>;
declare function runBundle(bundleGraph: BundleGraph<PackagedBundle>, bundle: PackagedBundle, globals: unknown, opts?: RunOpts, externalModules?: ExternalModules): Promise<unknown>;
declare function run(bundleGraph: BundleGraph<PackagedBundle>, globals?: unknown, opts?: RunOpts, externalModules?: ExternalModules): Promise<any>;
declare function assertBundles(bundleGraph: BundleGraph<PackagedBundle>, expectedBundles: Array<{
    name?: string | RegExp;
    type?: string;
    assets: Array<string>;
}>): void;
declare function normaliseNewlines(text: string): string;
declare function runESM(entries: Array<[string, string]>, context: vm.Context, fs: FileSystem, externalModules?: ExternalModules, requireExtensions?: boolean): Promise<Array<{
    [x: string]: unknown;
}>>;
declare function assertESMExports(b: BundleGraph<PackagedBundle>, expected: unknown, externalModules?: ExternalModules, evaluate?: ((a: {
    [x: string]: any;
}) => unknown) | null): Promise<void>;
declare function assertNoFilePathInCache(fs: FileSystem, dir: string, projectRoot: string): Promise<void>;

export { assertBundles, assertDependencyWasDeferred, assertESMExports, assertNoFilePathInCache, bundle, bundler, distDir, findAsset, findDependency, getNextBuild, getNextBuildSuccess, getParcelOptions, inputFS, mergeParcelOptions, ncp, normaliseNewlines, normalizeFilePath, outputFS, overlayFS, removeDistDirectory, run, runBundle, runBundles, runESM, shallowEqual, sleep, symlinkPrivilegeWarning, workerFarm };
