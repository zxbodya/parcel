/// <reference types="node" />
import { FilePath, ErrorWithCode } from '@parcel/types';
import { Diagnostic } from '@parcel/diagnostic';
import { EventEmitter } from 'events';
import { Session } from 'inspector';

declare type LocationCallRequest = {
    args: ReadonlyArray<unknown>;
    location: string;
    method?: string;
};
declare type HandleCallRequest = {
    args: ReadonlyArray<unknown>;
    handle: number;
};
declare type CallRequest = LocationCallRequest | HandleCallRequest;
declare type WorkerRequest = {
    args: ReadonlyArray<any>;
    awaitResponse?: boolean;
    child?: number | null;
    idx?: number;
    location?: FilePath;
    method?: string | null;
    type: 'request';
    handle?: number;
};
declare type WorkerDataResponse = {
    idx?: number;
    child?: number;
    type: 'response';
    contentType: 'data';
    content: string;
};
declare type WorkerErrorResponse = {
    idx?: number;
    child?: number;
    type: 'response';
    contentType: 'error';
    content: Diagnostic | Array<Diagnostic>;
};
declare type WorkerResponse = WorkerDataResponse | WorkerErrorResponse;
declare type WorkerMessage = WorkerRequest | WorkerResponse;
interface WorkerImpl {
    start(): Promise<void>;
    stop(): Promise<void>;
    send(data: WorkerMessage): void;
}
declare type BackendType = 'threads' | 'process';

declare type HandleFunction = (...args: Array<any>) => any;
declare type HandleOpts = {
    fn?: HandleFunction;
    childId?: number | null;
    id?: number;
};
declare class Handle {
    id: number;
    childId: number | undefined | null;
    fn: HandleFunction | undefined | null;
    constructor(opts: HandleOpts);
    dispose(): void;
    serialize(): {
        childId: number | undefined | null;
        id: number;
    };
    static deserialize(opts: HandleOpts): Handle;
}

declare type WorkerCall = {
    method?: string;
    handle?: number;
    args: ReadonlyArray<any>;
    retries: number;
    skipReadyCheck?: boolean;
    resolve: (result: Promise<any> | any) => void;
    reject: (error: any) => void;
};
declare type WorkerOpts = {
    forcedKillTime: number;
    backend: BackendType;
    shouldPatchConsole?: boolean;
    sharedReferences: ReadonlyMap<SharedReference, unknown>;
};
declare class Worker extends EventEmitter {
    readonly options: WorkerOpts;
    worker: WorkerImpl;
    id: number;
    sharedReferences: ReadonlyMap<SharedReference, unknown>;
    calls: Map<number, WorkerCall>;
    exitCode: number | undefined | null;
    callId: number;
    ready: boolean;
    stopped: boolean;
    isStopping: boolean;
    constructor(options: WorkerOpts);
    fork(forkModule: FilePath): Promise<void>;
    sendSharedReference(ref: SharedReference, value: unknown): Promise<any>;
    send(data: WorkerMessage): void;
    call(call: WorkerCall): void;
    receive(message: WorkerMessage): void;
    stop(): Promise<void>;
}

declare type Profile = {
    nodes: Array<ProfileNode>;
    startTime: number;
    endTime: number;
    samples?: Array<number>;
    timeDeltas?: Array<number>;
};
declare type ProfileNode = {
    id: number;
    callFrame: CallFrame;
    hitCount?: number;
    children?: Array<number>;
    deoptReason?: string;
    positionTicks?: PositionTickInfo;
};
declare type CallFrame = {
    functionName: string;
    scriptId: string;
    url: string;
    lineNumber: string;
    columnNumber: string;
};
declare type PositionTickInfo = {
    line: number;
    ticks: number;
};
declare class Profiler {
    session: Session;
    startProfiling(): Promise<unknown>;
    sendCommand(method: string, params?: unknown): Promise<{
        profile: Profile;
    }>;
    destroy(): void;
    stopProfiling(): Promise<Profile>;
}

declare type SharedReference = number;
declare type FarmOptions = {
    maxConcurrentWorkers: number;
    maxConcurrentCallsPerWorker: number;
    forcedKillTime: number;
    useLocalWorker: boolean;
    warmWorkers: boolean;
    workerPath?: FilePath;
    backend: BackendType;
    shouldPatchConsole?: boolean;
};
declare type WorkerModule = {
    readonly [x: string]: (...args: Array<unknown>) => Promise<unknown>;
};
declare type WorkerApi = {
    callMaster(request: CallRequest, awaitResponse?: boolean | null): Promise<unknown>;
    createReverseHandle(fn: HandleFunction): Handle;
    getSharedReference(ref: SharedReference): unknown;
    resolveSharedReference(value: unknown): SharedReference | undefined | null;
    callChild?: (childId: number, request: HandleCallRequest) => Promise<unknown>;
};

/**
 * workerPath should always be defined inside farmOptions
 */
declare class WorkerFarm extends EventEmitter {
    callQueue: Array<WorkerCall>;
    ending: boolean;
    localWorker: WorkerModule;
    localWorkerInit: Promise<void> | undefined | null;
    options: FarmOptions;
    run: HandleFunction;
    warmWorkers: number;
    workers: Map<number, Worker>;
    handles: Map<number, Handle>;
    sharedReferences: Map<SharedReference, unknown>;
    sharedReferencesByValue: Map<unknown, SharedReference>;
    profiler: Profiler | undefined | null;
    constructor(farmOptions?: Partial<FarmOptions>);
    workerApi: {
        callChild: (childId: number, request: HandleCallRequest) => Promise<unknown>;
        callMaster: (request: CallRequest, awaitResponse?: boolean | null) => Promise<unknown>;
        createReverseHandle: (fn: HandleFunction) => Handle;
        getSharedReference: (ref: SharedReference) => unknown;
        resolveSharedReference: (value: unknown) => void | SharedReference;
        runHandle: (handle: Handle, args: Array<any>) => Promise<unknown>;
    };
    warmupWorker(method: string, args: Array<any>): void;
    shouldStartRemoteWorkers(): boolean;
    createHandle(method: string): HandleFunction;
    onError(error: ErrorWithCode, worker: Worker): void | Promise<void>;
    startChild(): void;
    stopWorker(worker: Worker): Promise<void>;
    processQueue(): void;
    processRequest(data: {
        location: FilePath;
    } & Partial<WorkerRequest>, worker?: Worker): Promise<string | undefined | null>;
    addCall(method: string, args: Array<any>): Promise<any>;
    end(): Promise<void>;
    startMaxWorkers(): void;
    shouldUseRemoteWorkers(): boolean;
    createReverseHandle(fn: HandleFunction): Handle;
    createSharedReference(value: unknown, buffer?: Buffer): Promise<{
        ref: SharedReference;
        dispose(): Promise<unknown>;
    }>;
    startProfile(): Promise<void>;
    endProfile(): Promise<void>;
    callAllWorkers(method: string, args: Array<any>): Promise<void>;
    takeHeapSnapshot(): Promise<void>;
    static getNumWorkers(): number;
    static isWorker(): boolean;
    static getWorkerApi(): {
        callMaster: (request: CallRequest, awaitResponse?: boolean | null) => Promise<unknown>;
        createReverseHandle: (fn: (...args: Array<any>) => unknown) => Handle;
        getSharedReference: (ref: SharedReference) => unknown;
        resolveSharedReference: (value: unknown) => void | SharedReference;
        runHandle: (handle: Handle, args: Array<any>) => Promise<unknown>;
    };
    static getConcurrentCallsPerWorker(): number;
}

declare class Bus extends EventEmitter {
    emit(event: string, ...args: Array<any>): boolean;
}
declare const _default: Bus;

export default WorkerFarm;
export { FarmOptions, Handle, SharedReference, WorkerApi, _default as bus };
