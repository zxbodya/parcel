import type {FileSystem} from '@parcel/fs';
import type {FilePath} from '@parcel/types';
type TypeScriptModule = typeof import('typescript').default;
import type {ParseConfigHost as IParseConfigHost} from 'typescript'; // eslint-disable-line import/no-extraneous-dependencies
import {FSHost} from './FSHost';

export class ParseConfigHost extends FSHost implements IParseConfigHost {
  filesRead: Set<FilePath>;
  useCaseSensitiveFileNames: boolean;

  constructor(fs: FileSystem, ts: TypeScriptModule) {
    super(fs, ts);
    this.filesRead = new Set();
    this.useCaseSensitiveFileNames = ts.sys.useCaseSensitiveFileNames;
  }

  readFile(filePath: FilePath): void | string {
    this.filesRead.add(filePath);
    return super.readFile(filePath);
  }
}
