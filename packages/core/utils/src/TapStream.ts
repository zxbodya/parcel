import {Transform} from 'stream';

/*
 * "Taps" into the contents of a flowing stream, yielding chunks to the passed
 * callback. Continues to pass data chunks down the stream.
 */
export default class TapStream extends Transform {
  _tap: (a: Buffer) => unknown;
  constructor(tap: (a: Buffer) => unknown, options?: any) {
    super({...options});
    this._tap = tap;
  }

  _transform(
    chunk: Buffer | string,
    encoding: string,
    callback: (
      err: Error | undefined | null,
      chunk?: Buffer | string,
    ) => unknown,
  ) {
    try {
      this._tap(Buffer.from(chunk));
      callback(null, chunk);
    } catch (err) {
      callback(err);
    }
  }
}
