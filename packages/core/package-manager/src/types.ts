import type {
  FilePath,
  FileCreateInvalidation,
  SemverRange,
  DependencySpecifier,
  PackageJSON,
} from '@parcel/types';
import type {FileSystem} from '@parcel/fs';

export type ResolveResult = {
  resolved: FilePath | DependencySpecifier;
  pkg?: PackageJSON | null;
  invalidateOnFileCreate: Array<FileCreateInvalidation>;
  invalidateOnFileChange: Set<FilePath>;
};

export type InstallOptions = {
  installPeers?: boolean;
  saveDev?: boolean;
  packageInstaller?: PackageInstaller | null;
};

export type InstallerOptions = {
  modules: Array<ModuleRequest>;
  fs: FileSystem;
  cwd: FilePath;
  packagePath?: FilePath | null;
  saveDev?: boolean;
};

export interface PackageInstaller {
  install(opts: InstallerOptions): Promise<void>;
}

export type Invalidations = {
  invalidateOnFileCreate: Array<FileCreateInvalidation>;
  invalidateOnFileChange: Set<FilePath>;
};

export interface PackageManager {
  require(
    id: DependencySpecifier,
    from: FilePath,
    a?: {
      range?: SemverRange | null;
      shouldAutoInstall?: boolean;
      saveDev?: boolean;
    } | null,
  ): Promise<any>;
  resolve(
    id: DependencySpecifier,
    from: FilePath,
    a?: {
      range?: SemverRange | null;
      shouldAutoInstall?: boolean;
      saveDev?: boolean;
    } | null,
  ): Promise<ResolveResult>;
  getInvalidations(id: DependencySpecifier, from: FilePath): Invalidations;
  invalidate(id: DependencySpecifier, from: FilePath): void;
}

export type ModuleRequest = {
  readonly name: string;
  readonly range: SemverRange | undefined | null;
};
