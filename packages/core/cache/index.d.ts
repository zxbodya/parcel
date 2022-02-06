/// <reference types="node" />
import { Readable } from 'stream';
import { FilePath } from '@parcel/types';
import { NodeFS, FileSystem } from '@parcel/fs';

interface Cache {
    ensure(): Promise<void>;
    has(key: string): Promise<boolean>;
    get<T>(key: string): Promise<T | undefined | null>;
    set(key: string, value: unknown): Promise<void>;
    getStream(key: string): Readable;
    setStream(key: string, stream: Readable): Promise<void>;
    getBlob(key: string): Promise<Buffer>;
    setBlob(key: string, contents: Buffer | string): Promise<void>;
    hasLargeBlob(key: string): Promise<boolean>;
    getLargeBlob(key: string): Promise<Buffer>;
    setLargeBlob(key: string, contents: Buffer | string): Promise<void>;
    getBuffer(key: string): Promise<Buffer | undefined | null>;
}

declare class LMDBCache implements Cache {
    fs: NodeFS;
    dir: FilePath;
    store: any;
    constructor(cacheDir: FilePath);
    ensure(): Promise<void>;
    serialize(): {
        dir: FilePath;
    };
    static deserialize(opts: {
        dir: FilePath;
    }): LMDBCache;
    has(key: string): Promise<boolean>;
    get<T>(key: string): Promise<T | undefined | null>;
    set(key: string, value: unknown): Promise<void>;
    getStream(key: string): Readable;
    setStream(key: string, stream: Readable): Promise<void>;
    getBlob(key: string): Promise<Buffer>;
    setBlob(key: string, contents: Buffer | string): Promise<void>;
    getBuffer(key: string): Promise<Buffer | undefined | null>;
    hasLargeBlob(key: string): Promise<boolean>;
    getLargeBlob(key: string): Promise<Buffer>;
    setLargeBlob(key: string, contents: Buffer | string): Promise<void>;
}

declare class FSCache implements Cache {
    fs: FileSystem;
    dir: FilePath;
    constructor(fs: FileSystem, cacheDir: FilePath);
    ensure(): Promise<void>;
    _getCachePath(cacheId: string): FilePath;
    getStream(key: string): Readable;
    setStream(key: string, stream: Readable): Promise<void>;
    has(key: string): Promise<boolean>;
    getBlob(key: string): Promise<Buffer>;
    setBlob(key: string, contents: Buffer | string): Promise<void>;
    getBuffer(key: string): Promise<Buffer | undefined | null>;
    hasLargeBlob(key: string): Promise<boolean>;
    getLargeBlob(key: string): Promise<Buffer>;
    setLargeBlob(key: string, contents: Buffer | string): Promise<void>;
    get<T>(key: string): Promise<T | undefined | null>;
    set(key: string, value: unknown): Promise<void>;
}

declare class IDBCache implements Cache {
    constructor();
}

export { Cache, FSCache, IDBCache, LMDBCache };
