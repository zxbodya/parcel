import * as typescript from 'typescript';
import typescript__default, { CompilerHost as CompilerHost$1, SourceFile, CompilerOptions, ParseConfigHost as ParseConfigHost$1, LanguageServiceHost as LanguageServiceHost$1, ParsedCommandLine, IScriptSnapshot } from 'typescript';
import { FileSystem } from '@parcel/fs';
import { FilePath, PluginLogger, Config, PluginOptions } from '@parcel/types';

declare type TypeScriptModule$3 = typeof typescript;
declare class FSHost {
    fs: FileSystem;
    ts: TypeScriptModule$3;
    constructor(fs: FileSystem, ts: TypeScriptModule$3);
    getCurrentDirectory: () => FilePath;
    fileExists(filePath: FilePath): boolean;
    readFile(filePath: FilePath): string;
    directoryExists(filePath: FilePath): boolean;
    realpath(filePath: FilePath): FilePath;
    getAccessibleFileSystemEntries(dirPath: FilePath): {
        directories: Array<FilePath>;
        files: Array<FilePath>;
    };
    readDirectory(root: FilePath, extensions?: ReadonlyArray<string>, excludes?: ReadonlyArray<string>, includes?: ReadonlyArray<string>, depth?: number): any;
}

declare type TypeScriptModule$2 = typeof typescript;

declare type ScriptTarget = typeof typescript.ScriptTarget;

declare class CompilerHost extends FSHost implements CompilerHost$1 {
    outputCode: string | undefined | null;
    outputMap: string | undefined | null;
    logger: PluginLogger;
    redirectTypes: Map<FilePath, FilePath>;
    constructor(fs: FileSystem, ts: TypeScriptModule$2, logger: PluginLogger);
    readFile(filePath: FilePath): undefined | string;
    fileExists(filePath: FilePath): boolean;
    getSourceFile(filePath: FilePath, languageVersion: ScriptTarget[keyof ScriptTarget]): undefined | SourceFile;
    getDefaultLibFileName(options: CompilerOptions): string;
    writeFile(filePath: FilePath, content: string): void;
    getCanonicalFileName(fileName: FilePath): FilePath;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
}

declare type TypeScriptModule$1 = typeof typescript;

declare class ParseConfigHost extends FSHost implements ParseConfigHost$1 {
    filesRead: Set<FilePath>;
    useCaseSensitiveFileNames: boolean;
    constructor(fs: FileSystem, ts: TypeScriptModule$1);
    readFile(filePath: FilePath): string;
}

declare type TypeScriptModule = typeof typescript;

declare class LanguageServiceHost extends FSHost implements LanguageServiceHost$1 {
    config: ParsedCommandLine;
    files: {
        [key in FilePath]: {
            version: number;
        };
    };
    constructor(fs: FileSystem, ts: TypeScriptModule, config: ParsedCommandLine);
    invalidate(fileName: FilePath): void;
    getScriptFileNames(): Array<string>;
    getScriptVersion(fileName: FilePath): string;
    getScriptSnapshot(fileName: string): IScriptSnapshot | undefined;
    getCompilationSettings(): CompilerOptions;
    getDefaultLibFileName(projectOptions: any): string;
}

declare function loadTSConfig(config: Config, options: PluginOptions): Promise<typescript__default.CompilerOptions>;

export { CompilerHost, FSHost, LanguageServiceHost, ParseConfigHost, loadTSConfig };
