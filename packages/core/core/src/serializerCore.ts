import v8 from 'v8';

export let serializeRaw: (a: any) => Buffer = v8.serialize;
export let deserializeRaw: (a: Buffer) => any = v8.deserialize;
