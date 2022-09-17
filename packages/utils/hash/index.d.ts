export declare var init: Promise<void>;
export declare function hashString(s: string): string;
export declare function hashBuffer(b: Buffer): string;

export declare class Hash {
  writeString(s: string): void;
  writeBuffer(b: Buffer): void;
  finish(): string;
}
