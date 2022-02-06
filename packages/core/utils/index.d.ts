/// <reference types="node" />
import { ConfigResult, File, FilePath, PackagedBundle, HTTPSOptions, PluginOptions, Blob, BuildProgressEvent, Glob, NamedBundle, BundleGraph, Bundle, Dependency, Async, SourceLocation } from '@parcel/types';
import { FileSystem } from '@parcel/fs';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { Server as Server$1, IncomingMessage as IncomingMessage$1, ServerResponse as ServerResponse$1 } from 'https';
import { Diagnostic } from '@parcel/diagnostic';
import { Mapping } from '@mischnic/json-sourcemap';
import { Transform, Readable } from 'stream';
import { Options as Options$1 } from 'fast-glob';
import { Options } from 'micromatch';
import SourceMap from '@parcel/source-map';

declare type ConfigOutput = {
    config: ConfigResult;
    files: Array<File>;
};
declare type ConfigOptions = {
    parse?: boolean;
    parser?: (a: string) => any;
};
declare function resolveConfig(fs: FileSystem, filepath: FilePath, filenames: Array<FilePath>, projectRoot: FilePath): Promise<FilePath | undefined | null>;
declare function resolveConfigSync(fs: FileSystem, filepath: FilePath, filenames: Array<FilePath>, projectRoot: FilePath): FilePath | undefined | null;
declare function loadConfig(fs: FileSystem, filepath: FilePath, filenames: Array<FilePath>, projectRoot: FilePath, opts?: ConfigOptions | null): Promise<ConfigOutput | null>;
declare namespace loadConfig {
    var clear: () => void;
}

declare type Deferred<T> = {
    resolve(a: T): void;
    reject(a: unknown): void;
};
declare function makeDeferredWithPromise<T>(): {
    deferred: Deferred<T>;
    promise: Promise<T>;
};

declare type AssetStats = {
    filePath: string;
    size: number;
    originalSize: number;
    time: number;
};
declare type BundleStats = {
    filePath: string;
    size: number;
    time: number;
    assets: Array<AssetStats>;
};
declare type BuildMetrics = {
    bundles: Array<BundleStats>;
};
declare function generateBuildMetrics(bundles: Array<PackagedBundle>, fs: FileSystem, projectRoot: FilePath): Promise<BuildMetrics>;

declare type CreateHTTPServerOpts = ({
    listener?: (b: IncomingMessage | IncomingMessage$1, a: ServerResponse | ServerResponse$1) => void;
    host?: string;
} & {
    https: HTTPSOptions | boolean | undefined | null;
    inputFS: FileSystem;
    outputFS: FileSystem;
    cacheDir: FilePath;
}) | {};
declare type HTTPServer = Server | Server$1;
declare function createHTTPServer(options: CreateHTTPServerOpts): Promise<{
    stop: () => Promise<void>;
    server: HTTPServer;
}>;

declare function isAbsolute(filepath: string): boolean;
declare function normalizeSeparators(filePath: FilePath): FilePath;
declare type PathOptions = {
    noLeadingDotSlash?: boolean;
};
declare function normalizePath(filePath: FilePath, leadingDotSlash?: boolean): FilePath;
declare function relativePath(from: string, to: string, leadingDotSlash?: boolean): FilePath;

declare type FormattedCodeFrame = {
    location: string;
    code: string;
};
declare type AnsiDiagnosticResult = {
    message: string;
    stack: string;
    /** A formatted string containing all code frames, including their file locations. */
    codeframe: string;
    /** A list of code frames with highlighted code and file locations separately. */
    frames: Array<FormattedCodeFrame>;
    hints: Array<string>;
    documentation: string;
};
declare function prettyDiagnostic(diagnostic: Diagnostic, options?: PluginOptions, terminalWidth?: number): Promise<AnsiDiagnosticResult>;

declare type SchemaEntity = SchemaObject | SchemaArray | SchemaBoolean | SchemaString | SchemaNumber | SchemaEnum | SchemaOneOf | SchemaAllOf | SchemaNot | SchemaAny;
declare type SchemaArray = {
    type: 'array';
    items?: SchemaEntity;
    __type?: string;
};
declare type SchemaBoolean = {
    type: 'boolean';
    __type?: string;
};
declare type SchemaOneOf = {
    oneOf: Array<SchemaEntity>;
};
declare type SchemaAllOf = {
    allOf: Array<SchemaEntity>;
};
declare type SchemaNot = {
    not: SchemaEntity;
    __message: string;
};
declare type SchemaString = {
    type: 'string';
    enum?: Array<string>;
    __validate?: (val: string) => string | undefined | null;
    __type?: string;
};
declare type SchemaNumber = {
    type: 'number';
    enum?: Array<number>;
    __type?: string;
};
declare type SchemaEnum = {
    enum: Array<unknown>;
};
declare type SchemaObject = {
    type: 'object';
    properties: {
        [x: string]: SchemaEntity;
    };
    additionalProperties?: boolean | SchemaEntity;
    required?: Array<string>;
    __forbiddenProperties?: Array<string>;
    __type?: string;
};
declare type SchemaAny = {};
declare type SchemaError = {
    type: 'type';
    expectedTypes: Array<string>;
    dataType: 'key' | undefined | null | 'value';
    dataPath: string;
    ancestors: Array<SchemaEntity>;
    prettyType?: string;
} | {
    type: 'enum';
    expectedValues: Array<unknown>;
    dataType: 'key' | 'value';
    actualValue: unknown;
    dataPath: string;
    ancestors: Array<SchemaEntity>;
    prettyType?: string;
} | {
    type: 'forbidden-prop';
    prop: string;
    expectedProps: Array<string>;
    actualProps: Array<string>;
    dataType: 'key';
    dataPath: string;
    ancestors: Array<SchemaEntity>;
    prettyType?: string;
} | {
    type: 'missing-prop';
    prop: string;
    expectedProps: Array<string>;
    actualProps: Array<string>;
    dataType: 'key' | 'value';
    dataPath: string;
    ancestors: Array<SchemaEntity>;
    prettyType?: string;
} | {
    type: 'other';
    actualValue: unknown;
    dataType: 'key' | undefined | null | 'value';
    message?: string;
    dataPath: string;
    ancestors: Array<SchemaEntity>;
};
declare function validateSchema(schema: SchemaEntity, data: unknown): Array<SchemaError>;
declare namespace validateSchema {
    var diagnostic: (schema: SchemaEntity, data: ({
        filePath?: string;
        prependKey?: string;
    } & {
        source?: string;
        data?: unknown;
    }) | {
        source: string;
        map: {
            data: unknown;
            pointers: {
                [key: string]: Mapping;
            };
        };
    }, origin: string, message: string) => void;
}

declare function fuzzySearch(expectedValues: Array<string>, actualValue: string): Array<string>;

declare function countLines(string: string, startIndex?: number): number;

declare function generateCertificate(fs: FileSystem, cacheDir: string, host?: string | null): Promise<{
    cert: Buffer;
    key: Buffer;
}>;

declare function getCertificate(fs: FileSystem, options: HTTPSOptions): Promise<{
    cert: Buffer;
    key: Buffer;
}>;

/**
 * Returns the package name and the optional subpath
 */
declare function getModuleParts(_name: string): [string, string | undefined | null];

declare function getRootDir(files: Array<FilePath>): FilePath;

declare function isDirectoryInside(child: FilePath, parent: FilePath): boolean;

declare function isURL(url: string): boolean;

declare type Hashable = any;
declare function objectHash(object: Hashable): string;

declare function prettifyTime(timeInMs: number): string;

declare type PromiseQueueOpts = {
    maxConcurrent: number;
};
declare class PromiseQueue<T> {
    _deferred: Deferred<Array<T>> | undefined | null;
    _maxConcurrent: number;
    _numRunning: number;
    _queue: Array<() => Promise<void>>;
    _runPromise: Promise<Array<T>> | undefined | null;
    _error: unknown;
    _count: number;
    _results: Array<T>;
    constructor(opts?: PromiseQueueOpts);
    getNumWaiting(): number;
    add(fn: () => Promise<T>): Promise<T>;
    run(): Promise<Array<T>>;
    _next(): Promise<void>;
    _runFn(fn: () => unknown): Promise<void>;
    _resetState(): void;
    _done(): void;
}

declare class TapStream extends Transform {
    _tap: (a: Buffer) => unknown;
    constructor(tap: (a: Buffer) => unknown, options?: any);
    _transform(chunk: Buffer | string, encoding: string, callback: (err: Error | undefined | null, chunk?: Buffer | string) => unknown): void;
}

/**
 * Joins a path onto a URL, and normalizes Windows paths
 * e.g. from \path\to\res.js to /path/to/res.js.
 */
declare function urlJoin(publicURL: string, assetPath: string): string;

declare function relativeUrl(from: string, to: string): string;

declare function createDependencyLocation(start: {
    line: number;
    column: number;
}, specifier: string, lineOffset?: number, columnOffset?: number, importWrapperLength?: number): {
    end: {
        column: number;
        line: number;
    };
    filePath: string;
    start: {
        column: number;
        line: number;
    };
};

declare function debounce<TArgs extends Array<unknown>>(fn: (...args: TArgs) => unknown, delay: number): (...args: TArgs) => void;

declare function throttle<TArgs extends Array<unknown>>(fn: (...args: TArgs) => unknown, delay: number): (...args: TArgs) => void;

declare function openInBrowser(url: string, browser: string): Promise<void>;

declare function findAlternativeNodeModules(fs: FileSystem, moduleName: string, dir: string): Promise<Array<string>>;
declare function findAlternativeFiles(fs: FileSystem, fileSpecifier: string, dir: string, projectRoot: string, leadingDotSlash?: boolean, includeDirectories?: boolean, includeExtension?: boolean): Promise<Array<string>>;

declare function blobToBuffer(blob: Blob): Promise<Buffer>;
declare function blobToString(blob: Blob): Promise<string>;

declare function unique<T>(array: Array<T>): Array<T>;
declare function objectSortedEntries(obj: {
    readonly [x: string]: unknown;
}): Array<[string, unknown]>;
declare function objectSortedEntriesDeep(object: {
    readonly [x: string]: unknown;
}): Array<[string, unknown]>;
declare function setDifference<T>(a: Set<T>, b: Set<T>): Set<T>;
declare function setIntersect<T>(a: Set<T>, b: Set<T>): void;
declare function setUnion<T>(a: Iterable<T>, b: Iterable<T>): Set<T>;
declare function setEqual<T>(a: Set<T>, b: Set<T>): boolean;

declare class DefaultMap<K, V> extends Map<K, V> {
    _getDefault: (a: K) => V;
    constructor(getDefault: (a: K) => V, entries?: Iterable<[K, V]>);
    get(key: K): V;
}
declare class DefaultWeakMap<K extends {}, V> extends WeakMap<K, V> {
    _getDefault: (a: K) => V;
    constructor(getDefault: (a: K) => V, entries?: Iterable<[K, V]>);
    get(key: K): V;
}

declare function getProgressMessage(event: BuildProgressEvent): string | undefined | null;

declare function isGlob(p: FilePath): any;
declare function isGlobMatch(filePath: FilePath, glob: Glob | Array<Glob>, opts?: Options): any;
declare function globToRegex(glob: Glob, opts?: Options): RegExp;
declare function globSync(p: FilePath, fs: FileSystem, options?: Options$1): Array<FilePath>;
declare function glob(p: FilePath, fs: FileSystem, options: Options$1): Promise<Array<FilePath>>;

declare function hashStream(stream: Readable): Promise<string>;
declare function hashObject(obj: {
    readonly [x: string]: unknown;
}): string;
declare function hashFile(fs: FileSystem, filePath: string): Promise<string>;

declare let SharedBuffer: {
    new (...args: any): ArrayBuffer;
} | {
    new (...args: any): SharedArrayBuffer;
};

declare function replaceURLReferences({ bundle, bundleGraph, contents, map, getReplacement, relative, }: {
    bundle: NamedBundle;
    bundleGraph: BundleGraph<NamedBundle>;
    contents: string;
    relative?: boolean;
    map?: SourceMap | null;
    getReplacement?: (a: string) => string;
}): {
    readonly contents: string;
    readonly map: SourceMap | undefined | null;
};
declare function replaceInlineReferences({ bundle, bundleGraph, contents, map, getInlineReplacement, getInlineBundleContents, }: {
    bundle: Bundle;
    bundleGraph: BundleGraph<NamedBundle>;
    contents: string;
    getInlineReplacement: (c: Dependency, b: 'string' | undefined | null, a: string) => {
        from: string;
        to: string;
    };
    getInlineBundleContents: (b: Bundle, a: BundleGraph<NamedBundle>) => Async<{
        contents: Blob;
    }>;
    map?: SourceMap | null;
}): Promise<{
    readonly contents: string;
    readonly map: SourceMap | undefined | null;
}>;

declare function measureStreamLength(stream: Readable): Promise<number>;
declare function readableFromStringOrBuffer(str: string | Buffer): Readable;
declare function bufferStream(stream: Readable): Promise<Buffer>;
declare function blobToStream(blob: Blob): Readable;
declare function streamFromPromise(promise: Promise<Blob>): Readable;
declare function fallbackStream(stream: Readable, fallback: () => Readable): Readable;

declare function relativeBundlePath(from: NamedBundle, to: NamedBundle, opts?: {
    leadingDotSlash: boolean;
}): FilePath;

declare function ansiHtml(ansi: string): string;

declare function escapeHTML(s: string): string;

declare const SOURCEMAP_RE: RegExp;
declare const SOURCEMAP_EXTENSIONS: Set<string>;
declare function matchSourceMappingURL(contents: string): null | RegExpMatchArray;
declare function loadSourceMapUrl(fs: FileSystem, filename: string, contents: string): Promise<{
    filename: string;
    map: any;
    url: string;
} | undefined | null>;
declare function loadSourceMap(filename: string, contents: string, options: {
    fs: FileSystem;
    projectRoot: string;
}): Promise<SourceMap | undefined | null>;
declare function remapSourceLocation(loc: SourceLocation, originalMap: SourceMap): SourceLocation;

export { AnsiDiagnosticResult, AssetStats, BuildMetrics, BundleStats, ConfigOptions, ConfigOutput, DefaultMap, DefaultWeakMap, Deferred, FormattedCodeFrame, HTTPServer, PathOptions, PromiseQueue, SOURCEMAP_EXTENSIONS, SOURCEMAP_RE, SchemaAllOf, SchemaAny, SchemaArray, SchemaBoolean, SchemaEntity, SchemaEnum, SchemaError, SchemaNot, SchemaNumber, SchemaObject, SchemaOneOf, SchemaString, SharedBuffer, TapStream, ansiHtml, blobToBuffer, blobToStream, blobToString, bufferStream, countLines, createDependencyLocation, createHTTPServer, debounce, escapeHTML, fallbackStream, findAlternativeFiles, findAlternativeNodeModules, fuzzySearch, generateBuildMetrics, generateCertificate, getCertificate, getModuleParts, getProgressMessage, getRootDir, glob, globSync, globToRegex, hashFile, hashObject, hashStream, isAbsolute, isDirectoryInside, isGlob, isGlobMatch, isURL, loadConfig, loadSourceMap, loadSourceMapUrl, makeDeferredWithPromise, matchSourceMappingURL, measureStreamLength, normalizePath, normalizeSeparators, objectHash, objectSortedEntries, objectSortedEntriesDeep, openInBrowser, prettifyTime, prettyDiagnostic, readableFromStringOrBuffer, relativeBundlePath, relativePath, relativeUrl, remapSourceLocation, replaceInlineReferences, replaceURLReferences, resolveConfig, resolveConfigSync, setDifference, setEqual, setIntersect, setUnion, streamFromPromise, throttle, unique, urlJoin, validateSchema };
