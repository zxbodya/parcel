import { FilePath, PluginLogger, SpecifierType, SemverRange, Environment, SourceLocation, ResolveResult, PackageJSON, FileCreateInvalidation } from '@parcel/types';
import { FileSystem } from '@parcel/fs';
import { PackageManager } from '@parcel/package-manager';

declare type InternalPackageJSON = PackageJSON & {
    pkgdir: string;
    pkgfile: string;
};
declare type Options = {
    fs: FileSystem;
    projectRoot: FilePath;
    extensions: Array<string>;
    mainFields: Array<string>;
    packageManager?: PackageManager;
    logger?: PluginLogger;
    shouldAutoInstall?: boolean;
};
declare type ResolvedFile = {
    path: string;
    pkg: InternalPackageJSON | null;
};
declare type Aliases = string | {
    readonly [x: string]: string | boolean | {
        global: string;
    };
};
declare type ResolvedAlias = {
    type: 'file' | 'global';
    sourcePath: FilePath;
    resolved: string;
};
declare type Module = {
    moduleName?: string;
    subPath?: string | null;
    moduleDir?: FilePath;
    filePath?: FilePath;
    code?: string;
    query?: URLSearchParams;
};
declare type ResolverContext = {
    invalidateOnFileCreate: Array<FileCreateInvalidation>;
    invalidateOnFileChange: Set<FilePath>;
    specifierType: SpecifierType;
    range: SemverRange | undefined | null;
    loc: SourceLocation | undefined | null;
};
/**
 * This resolver implements a modified version of the node_modules resolution algorithm:
 * https://nodejs.org/api/modules.html#modules_all_together
 *
 * In addition to the standard algorithm, Parcel supports:
 *   - All file extensions supported by Parcel.
 *   - Glob file paths
 *   - Absolute paths (e.g. /foo) resolved relative to the project root.
 *   - Tilde paths (e.g. ~/foo) resolved relative to the nearest module root in node_modules.
 *   - The package.json module, jsnext:main, and browser field as replacements for package.main.
 *   - The package.json browser and alias fields as an alias map within a local module.
 *   - The package.json alias field in the root package for global aliases across all modules.
 */
declare class NodeResolver {
    fs: FileSystem;
    projectRoot: FilePath;
    extensions: Array<string>;
    mainFields: Array<string>;
    packageCache: Map<string, InternalPackageJSON>;
    rootPackage: InternalPackageJSON | null;
    packageManager: PackageManager | undefined | null;
    shouldAutoInstall: boolean;
    logger: PluginLogger | undefined | null;
    constructor(opts: Options);
    resolve({ filename, parent, specifierType, range, env, sourcePath, loc, }: {
        filename: FilePath;
        parent: FilePath | undefined | null;
        specifierType: SpecifierType;
        range?: SemverRange | null;
        env: Environment;
        sourcePath?: FilePath | null;
        loc?: SourceLocation | null;
    }): Promise<ResolveResult | undefined | null>;
    resolveModule({ filename, parent, env, ctx, sourcePath, }: {
        filename: string;
        parent: FilePath | undefined | null;
        env: Environment;
        ctx: ResolverContext;
        sourcePath: FilePath | undefined | null;
    }): Promise<Module | undefined | null>;
    shouldIncludeNodeModule({ includeNodeModules }: Environment, name: string): boolean | undefined | null;
    checkExcludedDependency(sourceFile: FilePath, name: string, ctx: ResolverContext): Promise<void>;
    resolveFilename(filename: string, dir: string, specifierType: SpecifierType): Promise<{
        filePath: string;
        query?: URLSearchParams;
    } | undefined | null>;
    loadRelative(filename: string, extensions: Array<string>, env: Environment, parentdir: string, ctx: ResolverContext): Promise<ResolvedFile | undefined | null>;
    findBuiltin(filename: string, env: Environment): {
        name: string;
        range: string | undefined | null;
    } | undefined | null;
    findNodeModulePath(filename: string, sourceFile: FilePath, ctx: ResolverContext): Module | undefined | null;
    loadNodeModules(module: Module, extensions: Array<string>, env: Environment, ctx: ResolverContext): Promise<ResolvedFile | undefined | null>;
    loadDirectory({ dir, extensions, env, ctx, pkg, }: {
        dir: string;
        extensions: Array<string>;
        env: Environment;
        ctx: ResolverContext;
        pkg?: InternalPackageJSON | null;
    }): Promise<ResolvedFile | undefined | null>;
    readPackage(dir: string, ctx: ResolverContext): Promise<InternalPackageJSON>;
    processPackage(pkg: InternalPackageJSON, file: string, dir: string): Promise<void>;
    getPackageEntries(pkg: InternalPackageJSON, env: Environment): Array<{
        filename: string;
        field: string;
    }>;
    loadAsFile({ file, extensions, env, pkg, ctx, }: {
        file: string;
        extensions: Array<string>;
        env: Environment;
        pkg: InternalPackageJSON | null;
        ctx: ResolverContext;
    }): Promise<ResolvedFile | undefined | null>;
    expandFile(file: string, extensions: Array<string>, env: Environment, pkg: InternalPackageJSON | null, expandAliases?: boolean): Promise<Array<string>>;
    resolveAliases(filename: string, env: Environment, pkg: InternalPackageJSON | null): Promise<ResolvedAlias | undefined | null>;
    resolvePackageAliases(filename: string, env: Environment, pkg: InternalPackageJSON | null): Promise<ResolvedAlias | undefined | null>;
    getAlias(filename: FilePath, pkg: InternalPackageJSON, aliases?: Aliases | null): Promise<ResolvedAlias | undefined | null>;
    lookupAlias(aliases: Aliases, filename: FilePath): null | boolean | string | {
        global: string;
    };
    findPackage(sourceFile: string, ctx: ResolverContext): Promise<InternalPackageJSON | null>;
    loadAlias(filename: string, sourceFile: FilePath, env: Environment, ctx: ResolverContext): Promise<ResolvedAlias | undefined | null>;
    hasSideEffects(filePath: FilePath, pkg: InternalPackageJSON): boolean;
}

export default NodeResolver;
