/// <reference types="node" />
import { FilePath } from '@parcel/types';
import { Readable, Writable } from 'stream';
import { Event, Options, AsyncSubscription } from '@parcel/watcher';
import { ReadStream as ReadStream$1, Stats as Stats$1 } from 'fs';
import WorkerFarm, { Handle } from '@parcel/workers';
import { EventEmitter } from 'events';

declare type FileOptions = {
    mode?: number;
};
declare type ReaddirOptions = {
    withFileTypes?: boolean;
} | {
    withFileTypes: true;
};
interface Stats {
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
}
declare type Encoding = 'hex' | 'utf8' | 'utf-8' | 'ascii' | 'binary' | 'base64' | 'ucs2' | 'ucs-2' | 'utf16le' | 'latin1';
interface FileSystem {
    readFile(filePath: FilePath): Promise<Buffer>;
    readFile(filePath: FilePath, encoding: Encoding): Promise<string>;
    readFileSync(filePath: FilePath): Buffer;
    readFileSync(filePath: FilePath, encoding: Encoding): string;
    writeFile(filePath: FilePath, contents: Buffer | string, options?: FileOptions | null): Promise<void>;
    copyFile(source: FilePath, destination: FilePath, flags?: number): Promise<void>;
    stat(filePath: FilePath): Promise<Stats>;
    statSync(filePath: FilePath): Stats;
    readdir(path: FilePath, opts?: {
        withFileTypes?: false;
    }): Promise<FilePath[]>;
    readdir(path: FilePath, opts: {
        withFileTypes: true;
    }): Promise<Dirent[]>;
    readdirSync(path: FilePath, opts?: {
        withFileTypes?: false;
    }): FilePath[];
    readdirSync(path: FilePath, opts: {
        withFileTypes: true;
    }): Dirent[];
    unlink(path: FilePath): Promise<void>;
    realpath(path: FilePath): Promise<FilePath>;
    realpathSync(path: FilePath): FilePath;
    exists(path: FilePath): Promise<boolean>;
    existsSync(path: FilePath): boolean;
    mkdirp(path: FilePath): Promise<void>;
    rimraf(path: FilePath): Promise<void>;
    ncp(source: FilePath, destination: FilePath): Promise<void>;
    createReadStream(path: FilePath, options?: FileOptions | null): Readable;
    createWriteStream(path: FilePath, options?: FileOptions | null): Writable;
    cwd(): FilePath;
    chdir(dir: FilePath): void;
    watch(dir: FilePath, fn: (err: Error | undefined | null, events: Array<Event>) => unknown, opts: Options): Promise<AsyncSubscription>;
    getEventsSince(dir: FilePath, snapshot: FilePath, opts: Options): Promise<Array<Event>>;
    writeSnapshot(dir: FilePath, snapshot: FilePath, opts: Options): Promise<void>;
    findAncestorFile(fileNames: Array<string>, fromDir: FilePath, root: FilePath): FilePath | undefined | null;
    findNodeModule(moduleName: string, fromDir: FilePath): FilePath | undefined | null;
    findFirstFile(filePaths: Array<FilePath>): FilePath | undefined | null;
}
interface Dirent {
    readonly name: string;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isDirectory(): boolean;
    isFIFO(): boolean;
    isFile(): boolean;
    isSocket(): boolean;
    isSymbolicLink(): boolean;
}

declare class NodeFS implements FileSystem {
    readFile: any;
    copyFile: any;
    stat: any;
    readdir: any;
    unlink: any;
    utimes: any;
    ncp: any;
    createReadStream: (path: string, options?: any) => ReadStream$1;
    cwd: () => string;
    chdir: (directory: string) => void;
    statSync: (path: string) => Stats$1;
    realpathSync: (path: string, cache?: any) => string;
    existsSync: (path: string) => boolean;
    readdirSync: any;
    findAncestorFile: any;
    findNodeModule: any;
    findFirstFile: any;
    createWriteStream(filePath: string, options: any): Writable;
    writeFile(filePath: FilePath, contents: Buffer | string, options?: FileOptions | null): Promise<void>;
    readFileSync(filePath: FilePath, encoding?: Encoding): any;
    realpath(originalPath: string): Promise<string>;
    exists(filePath: FilePath): Promise<boolean>;
    watch(dir: FilePath, fn: (err: Error | undefined | null, events: Array<Event>) => unknown, opts: Options): Promise<AsyncSubscription>;
    getEventsSince(dir: FilePath, snapshot: FilePath, opts: Options): Promise<Array<Event>>;
    writeSnapshot(dir: FilePath, snapshot: FilePath, opts: Options): Promise<void>;
    static deserialize(): NodeFS;
    serialize(): null;
    mkdirp(filePath: FilePath): Promise<void>;
    rimraf(filePath: FilePath): Promise<void>;
}

declare type HandleFunction = (...args: Array<any>) => any;
declare type SerializedMemoryFS = {
    $$raw?: boolean;
    id: number;
    handle: any;
    dirs: Map<FilePath, Directory>;
    files: Map<FilePath, File>;
    symlinks: Map<FilePath, FilePath>;
};
declare type WorkerEvent = {
    type: 'writeFile' | 'unlink' | 'mkdir' | 'symlink';
    path: FilePath;
    entry?: Entry;
    target?: FilePath;
};
declare type ResolveFunction = () => unknown;
declare class MemoryFS implements FileSystem {
    dirs: Map<FilePath, Directory>;
    files: Map<FilePath, File>;
    symlinks: Map<FilePath, FilePath>;
    watchers: Map<FilePath, Set<Watcher>>;
    events: Array<Event>;
    id: number;
    handle: Handle;
    farm: WorkerFarm;
    _cwd: FilePath;
    _eventQueue: Array<Event>;
    _watcherTimer: any;
    _numWorkerInstances: number;
    _workerHandles: Array<Handle>;
    _workerRegisterResolves: Array<ResolveFunction>;
    _emitter: EventEmitter;
    constructor(workerFarm: WorkerFarm);
    static deserialize(opts: SerializedMemoryFS): MemoryFS | WorkerFS;
    serialize(): SerializedMemoryFS;
    decrementWorkerInstance(): void;
    cwd(): FilePath;
    chdir(dir: FilePath): void;
    _normalizePath(filePath: FilePath, realpath?: boolean): FilePath;
    writeFile(filePath: FilePath, contents: Buffer | string, options?: FileOptions | null): Promise<void>;
    readFile(filePath: FilePath, encoding?: Encoding): Promise<any>;
    readFileSync(filePath: FilePath, encoding?: Encoding): any;
    copyFile(source: FilePath, destination: FilePath): Promise<void>;
    statSync(filePath: FilePath): Stat;
    stat(filePath: FilePath): Promise<Stat>;
    readdirSync(dir: FilePath, opts?: ReaddirOptions): any;
    readdir(dir: FilePath, opts?: ReaddirOptions): Promise<any>;
    unlink(filePath: FilePath): Promise<void>;
    mkdirp(dir: FilePath): Promise<void>;
    rimraf(filePath: FilePath): Promise<void>;
    ncp(source: FilePath, destination: FilePath): Promise<void>;
    createReadStream(filePath: FilePath): ReadStream;
    createWriteStream(filePath: FilePath, options?: FileOptions | null): WriteStream;
    realpathSync(filePath: FilePath): FilePath;
    realpath(filePath: FilePath): Promise<FilePath>;
    symlink(target: FilePath, path: FilePath): Promise<void>;
    existsSync(filePath: FilePath): boolean;
    exists(filePath: FilePath): Promise<boolean>;
    _triggerEvent(event: Event): void;
    _registerWorker(handle: Handle): void;
    _sendWorkerEvent(event: WorkerEvent): Promise<void>;
    watch(dir: FilePath, fn: (err: Error | undefined | null, events: Array<Event>) => unknown, opts: Options): Promise<AsyncSubscription>;
    getEventsSince(dir: FilePath, snapshot: FilePath, opts: Options): Promise<Array<Event>>;
    writeSnapshot(dir: FilePath, snapshot: FilePath): Promise<void>;
    findAncestorFile(fileNames: Array<string>, fromDir: FilePath, root: FilePath): FilePath | undefined | null;
    findNodeModule(moduleName: string, fromDir: FilePath): FilePath | undefined | null;
    findFirstFile(filePaths: Array<FilePath>): FilePath | undefined | null;
}
declare class Watcher {
    fn: (err: Error | undefined | null, events: Array<Event>) => unknown;
    options: Options;
    constructor(fn: (err: Error | undefined | null, events: Array<Event>) => unknown, options: Options);
    trigger(events: Array<Event>): void;
}
declare class ReadStream extends Readable {
    fs: FileSystem;
    filePath: FilePath;
    reading: boolean;
    bytesRead: number;
    constructor(fs: FileSystem, filePath: FilePath);
    _read(): void;
}
declare class WriteStream extends Writable {
    fs: FileSystem;
    filePath: FilePath;
    options: FileOptions | undefined | null;
    buffer: Buffer;
    constructor(fs: FileSystem, filePath: FilePath, options?: FileOptions | null);
    _write(chunk: Buffer | string, encoding: any, callback: (error?: Error) => void): void;
    _final(callback: ((error?: Error) => void) & (() => void)): void;
}
declare class Entry {
    mode: number;
    atime: number;
    mtime: number;
    ctime: number;
    birthtime: number;
    constructor(mode: number);
    access(): void;
    modify(mode: number): void;
    getSize(): number;
    stat(): Stat;
}
declare class Stat {
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
    constructor(entry: Entry);
    isFile(): boolean;
    isDirectory(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isSymbolicLink(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
}
declare class File extends Entry {
    buffer: Buffer;
    constructor(buffer: Buffer, mode: number);
    read(): Buffer;
    write(buffer: Buffer, mode: number): void;
    getSize(): number;
}
declare class Directory extends Entry {
    constructor();
}
declare class WorkerFS extends MemoryFS {
    id: number;
    handleFn: HandleFunction;
    constructor(id: number, handle: Handle);
    static deserialize(opts: SerializedMemoryFS): MemoryFS;
    serialize(): SerializedMemoryFS;
    writeFile(filePath: FilePath, contents: Buffer | string, options?: FileOptions | null): Promise<void>;
    unlink(filePath: FilePath): Promise<void>;
    mkdirp(dir: FilePath): Promise<void>;
    rimraf(filePath: FilePath): Promise<void>;
    ncp(source: FilePath, destination: FilePath): Promise<void>;
    symlink(target: FilePath, path: FilePath): Promise<void>;
}

declare class OverlayFS implements FileSystem {
    writable: FileSystem;
    readable: FileSystem;
    constructor(writable: FileSystem, readable: FileSystem);
    static deserialize(opts: any): OverlayFS;
    serialize(): {
        $$raw: boolean;
        readable: FileSystem;
        writable: FileSystem;
    };
    readFile: (...args: Array<any>) => Promise<Buffer & string & Partial<Stats$1>>;
    writeFile: (...args: Array<any>) => any;
    copyFile(source: FilePath, destination: FilePath): Promise<void>;
    stat: (...args: Array<any>) => Promise<Buffer & string & Partial<Stats$1>>;
    unlink: (...args: Array<any>) => any;
    mkdirp: (...args: Array<any>) => any;
    rimraf: (...args: Array<any>) => any;
    ncp: (...args: Array<any>) => any;
    createReadStream: (filePath: FilePath, ...args: Array<any>) => any;
    createWriteStream: (...args: Array<any>) => any;
    cwd: (...args: Array<any>) => any;
    chdir: (...args: Array<any>) => any;
    realpath: (filePath: FilePath, ...args: Array<any>) => any;
    readFileSync: (...args: Array<any>) => any;
    statSync: (...args: Array<any>) => any;
    existsSync: (...args: Array<any>) => any;
    realpathSync: (filePath: FilePath, ...args: Array<any>) => any;
    exists(filePath: FilePath): Promise<boolean>;
    readdir(path: FilePath, opts?: ReaddirOptions): Promise<any>;
    readdirSync(path: FilePath, opts?: ReaddirOptions): any;
    watch(dir: FilePath, fn: (err: Error | undefined | null, events: Array<Event>) => unknown, opts: Options): Promise<AsyncSubscription>;
    getEventsSince(dir: FilePath, snapshot: FilePath, opts: Options): Promise<Array<Event>>;
    writeSnapshot(dir: FilePath, snapshot: FilePath, opts: Options): Promise<void>;
    findAncestorFile(fileNames: Array<string>, fromDir: FilePath, root: FilePath): FilePath | undefined | null;
    findNodeModule(moduleName: string, fromDir: FilePath): FilePath | undefined | null;
    findFirstFile(filePaths: Array<FilePath>): FilePath | undefined | null;
}

declare function ncp(sourceFS: FileSystem, source: FilePath, destinationFS: FileSystem, destination: FilePath): Promise<void>;

export { Dirent, Encoding, FileOptions, FileSystem, MemoryFS, NodeFS, OverlayFS, ReaddirOptions, Stats, ncp };
