import invariant from 'assert';

export type Deferred<T> = {
  resolve(a: T): void;
  reject(a: unknown): void;
};

export function makeDeferredWithPromise<T>(): {
  deferred: Deferred<T>;
  promise: Promise<T>;
} {
  let deferred: Deferred<T> | undefined | null;
  let promise = new Promise<T>((resolve, reject) => {
    deferred = {resolve, reject};
  });

  // Promise constructor callback executes synchronously, so this is defined
  invariant(deferred != null);

  return {deferred, promise};
}
