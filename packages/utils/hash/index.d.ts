export declare var init: Promise<void>;
export declare function hashString(s: string): string;
export declare function hashBuffer(b: Buffer): string;

export declare class Hash {
  data: Array<Uint8Array>;
  writeString(s: string): void;
  writeBuffer(b: Buffer): void;
  finish(): string;
}
