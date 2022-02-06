interface IDisposable {
    /** This can return a Promise, as dispose() of all inner disposables are
     * awaited in Disposable#dispose()
     */
    dispose(): unknown;
}

declare type DisposableLike = IDisposable | (() => unknown);
declare class Disposable implements IDisposable {
    #private;
    disposed: boolean;
    constructor(...disposables: Array<DisposableLike>);
    add(...disposables: Array<DisposableLike>): void;
    dispose(): Promise<void>;
}

declare class ValueEmitter<TValue> implements IDisposable {
    _listeners: Array<(value: TValue) => unknown>;
    _disposed: boolean;
    addListener(listener: (value: TValue) => unknown): IDisposable;
    emit(value: TValue): void;
    dispose(): void;
}

declare class AlreadyDisposedError extends Error {
}

export { AlreadyDisposedError, Disposable, ValueEmitter };
