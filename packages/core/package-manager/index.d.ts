import { FilePath, DependencySpecifier, PackageJSON, FileCreateInvalidation, SemverRange } from '@parcel/types';
import { FileSystem } from '@parcel/fs';

declare type ResolveResult = {
    resolved: FilePath | DependencySpecifier;
    pkg?: PackageJSON | null;
    invalidateOnFileCreate: Array<FileCreateInvalidation>;
    invalidateOnFileChange: Set<FilePath>;
};
declare type InstallOptions = {
    installPeers?: boolean;
    saveDev?: boolean;
    packageInstaller?: PackageInstaller | null;
};
declare type InstallerOptions = {
    modules: Array<ModuleRequest>;
    fs: FileSystem;
    cwd: FilePath;
    packagePath?: FilePath | null;
    saveDev?: boolean;
};
interface PackageInstaller {
    install(opts: InstallerOptions): Promise<void>;
}
declare type Invalidations = {
    invalidateOnFileCreate: Array<FileCreateInvalidation>;
    invalidateOnFileChange: Set<FilePath>;
};
interface PackageManager {
    require(id: DependencySpecifier, from: FilePath, a?: {
        range?: SemverRange | null;
        shouldAutoInstall?: boolean;
        saveDev?: boolean;
    } | null): Promise<any>;
    resolve(id: DependencySpecifier, from: FilePath, a?: {
        range?: SemverRange | null;
        shouldAutoInstall?: boolean;
        saveDev?: boolean;
    } | null): Promise<ResolveResult>;
    getInvalidations(id: DependencySpecifier, from: FilePath): Invalidations;
    invalidate(id: DependencySpecifier, from: FilePath): void;
}
declare type ModuleRequest = {
    readonly name: string;
    readonly range: SemverRange | undefined | null;
};

declare class Npm implements PackageInstaller {
    install({ modules, cwd, fs, packagePath, saveDev, }: InstallerOptions): Promise<void>;
}

declare class Pnpm implements PackageInstaller {
    static exists(): Promise<boolean>;
    install({ modules, cwd, saveDev, }: InstallerOptions): Promise<void>;
}

declare class Yarn implements PackageInstaller {
    static exists(): Promise<boolean>;
    install({ modules, cwd, saveDev, }: InstallerOptions): Promise<void>;
}

declare type Package = {
    fs: FileSystem;
    packagePath: FilePath;
};
declare class MockPackageInstaller implements PackageInstaller {
    packages: Map<string, Package>;
    register(packageName: string, fs: FileSystem, packagePath: FilePath): void;
    install({ modules, fs, cwd, packagePath, saveDev, }: InstallerOptions): Promise<void>;
    installPackage(moduleRequest: ModuleRequest, fs: FileSystem, packagePath: FilePath): Promise<any>;
}

declare type ModuleInfo = {
    moduleName: string;
    subPath: string | undefined | null;
    moduleDir: FilePath;
    filePath: FilePath;
    code?: string;
};
declare type ResolverContext = {
    invalidateOnFileCreate: Array<FileCreateInvalidation>;
    invalidateOnFileChange: Set<FilePath>;
};
declare class NodeResolverBase<T> {
    fs: FileSystem;
    extensions: Array<string>;
    packageCache: Map<string, PackageJSON>;
    projectRoot: FilePath;
    constructor(fs: FileSystem, projectRoot: FilePath, extensions?: Array<string>);
    resolve(id: DependencySpecifier, from: FilePath): T;
    expandFile(file: FilePath): Array<FilePath>;
    getPackageEntries(dir: FilePath, pkg: PackageJSON): Array<string>;
    isBuiltin(name: DependencySpecifier): boolean;
    findNodeModulePath(id: DependencySpecifier, sourceFile: FilePath, ctx: ResolverContext): ResolveResult | undefined | null | ModuleInfo | undefined | null;
    getNodeModulesPackagePath(sourceFile: FilePath): FilePath | undefined | null;
    invalidate(filePath: FilePath): void;
}

declare class NodeResolver extends NodeResolverBase<Promise<ResolveResult>> {
    resolve(id: DependencySpecifier, from: FilePath): Promise<ResolveResult>;
    loadRelative(id: FilePath, ctx: ResolverContext): Promise<ResolveResult | undefined | null>;
    findPackage(sourceFile: FilePath, ctx: ResolverContext): Promise<PackageJSON | undefined | null>;
    readPackage(file: FilePath, ctx: ResolverContext): Promise<PackageJSON>;
    loadAsFile(file: FilePath, pkg: PackageJSON | undefined | null, ctx: ResolverContext): Promise<ResolveResult | undefined | null>;
    loadDirectory(dir: FilePath, pkg: PackageJSON | undefined | null, ctx: ResolverContext): Promise<ResolveResult | undefined | null>;
    loadNodeModules(id: DependencySpecifier, from: FilePath, ctx: ResolverContext): Promise<ResolveResult | undefined | null>;
}

declare class NodeResolverSync extends NodeResolverBase<ResolveResult> {
    resolve(id: DependencySpecifier, from: FilePath): ResolveResult;
    loadRelative(id: FilePath, ctx: ResolverContext): ResolveResult | undefined | null;
    findPackage(sourceFile: FilePath, ctx: ResolverContext): PackageJSON | undefined | null;
    readPackage(file: FilePath, ctx: ResolverContext): PackageJSON;
    loadAsFile(file: FilePath, pkg: PackageJSON | undefined | null, ctx: ResolverContext): ResolveResult | undefined | null;
    loadDirectory(dir: FilePath, pkg: PackageJSON | undefined | null, ctx: ResolverContext): ResolveResult | undefined | null;
    loadNodeModules(id: DependencySpecifier, from: FilePath, ctx: ResolverContext): ResolveResult | undefined | null;
}

declare class NodePackageManager implements PackageManager {
    fs: FileSystem;
    projectRoot: FilePath;
    installer: PackageInstaller | undefined | null;
    resolver: NodeResolver;
    syncResolver: NodeResolverSync;
    invalidationsCache: Map<string, Invalidations>;
    constructor(fs: FileSystem, projectRoot: FilePath, installer?: PackageInstaller | null);
    static deserialize(opts: any): NodePackageManager;
    serialize(): {
        $$raw: boolean;
        fs: FileSystem;
        projectRoot: FilePath;
        installer: PackageInstaller | undefined | null;
    };
    require(name: DependencySpecifier, from: FilePath, opts?: {
        range?: SemverRange | null;
        shouldAutoInstall?: boolean;
        saveDev?: boolean;
    } | null): Promise<any>;
    requireSync(name: DependencySpecifier, from: FilePath): any;
    load(filePath: FilePath, from: FilePath): any;
    resolve(id: DependencySpecifier, from: FilePath, options?: {
        range?: SemverRange | null;
        shouldAutoInstall?: boolean;
        saveDev?: boolean;
    } | null): Promise<ResolveResult>;
    resolveSync(name: DependencySpecifier, from: FilePath): ResolveResult;
    install(modules: Array<ModuleRequest>, from: FilePath, opts?: InstallOptions): Promise<void>;
    getInvalidations(name: DependencySpecifier, from: FilePath): Invalidations;
    invalidate(name: DependencySpecifier, from: FilePath): void;
}

declare function _addToInstallQueue(fs: FileSystem, packageManager: PackageManager, modules: Array<ModuleRequest>, filePath: FilePath, projectRoot: FilePath, options?: InstallOptions): Promise<unknown>;

export { InstallOptions, InstallerOptions, Invalidations, MockPackageInstaller, ModuleRequest, NodePackageManager, Npm, PackageInstaller, PackageManager, Pnpm, ResolveResult, Yarn, _addToInstallQueue };
