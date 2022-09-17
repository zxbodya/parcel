import type {ContentKey} from '@parcel/graph';
import type {
  ASTGenerator,
  BuildMode,
  Engines,
  EnvironmentContext,
  EnvMap,
  FilePath,
  Glob,
  LogLevel,
  Meta,
  DependencySpecifier,
  PackageName,
  ReporterEvent,
  SemverRange,
  ServerOptions,
  SourceType,
  Stats,
  Symbol,
  TargetSourceMapOptions,
  ConfigResult,
  OutputFormat,
  TargetDescriptor,
  HMROptions,
  DetailedReportOptions,
} from '@parcel/types';
import type {SharedReference} from '@parcel/workers';
import type {FileSystem} from '@parcel/fs';
import type {Cache} from '@parcel/cache';
import type {PackageManager} from '@parcel/package-manager';
import type {ProjectPath} from './projectPath';

export type ParcelPluginNode = {
  packageName: PackageName;
  resolveFrom: ProjectPath;
  keyPath?: string;
};

export type PureParcelConfigPipeline = ReadonlyArray<ParcelPluginNode>;
export type ExtendableParcelConfigPipeline = ReadonlyArray<
  ParcelPluginNode | '...'
>;

export type ProcessedParcelConfig = {
  resolvers?: PureParcelConfigPipeline;
  transformers?: {
    [k in Glob]: ExtendableParcelConfigPipeline;
  };
  bundler: ParcelPluginNode | undefined | null;
  namers?: PureParcelConfigPipeline;
  runtimes?: PureParcelConfigPipeline;
  packagers?: {
    [k in Glob]: ParcelPluginNode;
  };
  optimizers?: {
    [k in Glob]: ExtendableParcelConfigPipeline;
  };
  compressors?: {
    [k in Glob]: ExtendableParcelConfigPipeline;
  };
  reporters?: PureParcelConfigPipeline;
  validators?: {
    [k in Glob]: ExtendableParcelConfigPipeline;
  };
  filePath: ProjectPath;
  resolveFrom?: ProjectPath;
};

export type Environment = {
  id: string;
  context: EnvironmentContext;
  engines: Engines;
  includeNodeModules:
    | boolean
    | Array<PackageName>
    | {
        [k in PackageName]: boolean;
      };
  outputFormat: OutputFormat;
  sourceType: SourceType;
  isLibrary: boolean;
  shouldOptimize: boolean;
  shouldScopeHoist: boolean;
  sourceMap: TargetSourceMapOptions | undefined | null;
  loc: InternalSourceLocation | undefined | null;
};

export type InternalSourceLocation = {
  readonly filePath: ProjectPath;
  /** inclusive */
  readonly start: {
    readonly line: number;
    readonly column: number;
  };
  /** exclusive */
  readonly end: {
    readonly line: number;
    readonly column: number;
  };
};

export type Target = {
  distEntry?: FilePath | null;
  distDir: ProjectPath;
  env: Environment;
  name: string;
  publicUrl: string;
  loc?: InternalSourceLocation | null;
  pipeline?: string;
  source?: FilePath | Array<FilePath>;
};

export const SpecifierType = {
  esm: 0,
  commonjs: 1,
  url: 2,
  custom: 3,
};

export const Priority = {
  sync: 0,
  parallel: 1,
  lazy: 2,
};

export type Dependency = {
  id: string;
  specifier: DependencySpecifier;
  specifierType: typeof SpecifierType[keyof typeof SpecifierType];
  priority: typeof Priority[keyof typeof Priority];
  needsStableName: boolean;
  bundleBehavior:
    | typeof BundleBehavior[keyof typeof BundleBehavior]
    | undefined
    | null;
  isEntry: boolean;
  isOptional: boolean;
  loc: InternalSourceLocation | undefined | null;
  env: Environment;
  meta: Meta;
  resolverMeta?: Meta | null;
  target: Target | undefined | null;
  sourceAssetId: string | undefined | null;
  sourcePath: ProjectPath | undefined | null;
  sourceAssetType?: string | null;
  resolveFrom: ProjectPath | undefined | null;
  range: SemverRange | undefined | null;
  symbols:
    | Map<
        Symbol,
        {
          local: Symbol;
          loc: InternalSourceLocation | undefined | null;
          isWeak: boolean;
          meta?: Meta | null;
        }
      >
    | undefined
    | null;
  pipeline?: string | null;
};

export const BundleBehavior = {
  inline: 0,
  isolated: 1,
};

export const BundleBehaviorNames: Array<keyof typeof BundleBehavior> =
  Object.keys(BundleBehavior);

export type Asset = {
  id: ContentKey;
  committed: boolean;
  hash: string | undefined | null;
  filePath: ProjectPath;
  query: string | undefined | null;
  type: string;
  dependencies: Map<string, Dependency>;
  bundleBehavior:
    | typeof BundleBehavior[keyof typeof BundleBehavior]
    | undefined
    | null;
  isBundleSplittable: boolean;
  isSource: boolean;
  env: Environment;
  meta: Meta;
  stats: Stats;
  contentKey: string | undefined | null;
  mapKey: string | undefined | null;
  outputHash: string | undefined | null;
  pipeline: string | undefined | null;
  astKey: string | undefined | null;
  astGenerator: ASTGenerator | undefined | null;
  symbols:
    | Map<
        Symbol,
        {
          local: Symbol;
          loc: InternalSourceLocation | undefined | null;
          meta?: Meta | null;
        }
      >
    | undefined
    | null;
  sideEffects: boolean;
  uniqueKey: string | undefined | null;
  configPath?: ProjectPath;
  plugin: PackageName | undefined | null;
  configKeyPath?: string;
  isLargeBlob?: boolean;
};

export type InternalGlob = ProjectPath;

export type InternalFile = {
  readonly filePath: ProjectPath;
  readonly hash?: string;
};

export type FileInvalidation = {
  type: 'file';
  filePath: ProjectPath;
};

export type EnvInvalidation = {
  type: 'env';
  key: string;
};

export type OptionInvalidation = {
  type: 'option';
  key: string;
};

export type RequestInvalidation =
  | FileInvalidation
  | EnvInvalidation
  | OptionInvalidation;

export type InternalFileInvalidation = {
  filePath: ProjectPath;
};

export type InternalGlobInvalidation = {
  glob: InternalGlob;
};

export type InternalFileAboveInvalidation = {
  fileName: string;
  aboveFilePath: ProjectPath;
};

export type InternalFileCreateInvalidation =
  | InternalFileInvalidation
  | InternalGlobInvalidation
  | InternalFileAboveInvalidation;

export type DevDepRequest = {
  specifier: DependencySpecifier;
  resolveFrom: ProjectPath;
  hash: string;
  invalidateOnFileCreate?: Array<InternalFileCreateInvalidation>;
  invalidateOnFileChange?: Set<ProjectPath>;
  additionalInvalidations?: Array<{
    specifier: DependencySpecifier;
    resolveFrom: ProjectPath;
    range?: SemverRange | null;
  }>;
};

export type ParcelOptions = {
  entries: Array<ProjectPath>;
  config?: DependencySpecifier;
  defaultConfig?: DependencySpecifier;
  env: EnvMap;
  targets:
    | Array<string>
    | {
        readonly [x: string]: TargetDescriptor;
      }
    | undefined
    | null;
  shouldDisableCache: boolean;
  cacheDir: FilePath;
  mode: BuildMode;
  hmrOptions: HMROptions | undefined | null;
  shouldContentHash: boolean;
  serveOptions: ServerOptions | false;
  shouldBuildLazily: boolean;
  shouldAutoInstall: boolean;
  logLevel: LogLevel;
  projectRoot: FilePath;
  shouldProfile: boolean;
  shouldPatchConsole: boolean;
  detailedReport?: DetailedReportOptions | null;
  inputFS: FileSystem;
  outputFS: FileSystem;
  cache: Cache;
  packageManager: PackageManager;
  additionalReporters: Array<{
    packageName: DependencySpecifier;
    resolveFrom: ProjectPath;
  }>;
  instanceId: string;
  readonly defaultTargetOptions: {
    readonly shouldOptimize: boolean;
    readonly shouldScopeHoist?: boolean;
    readonly sourceMaps: boolean;
    readonly publicUrl: string;
    readonly distDir?: ProjectPath;
    readonly engines?: Engines;
    readonly outputFormat?: OutputFormat;
    readonly isLibrary?: boolean;
  };
};

export type AssetNode = {
  id: ContentKey;
  readonly type: 'asset';
  value: Asset;
  usedSymbols: Set<Symbol>;
  hasDeferred?: boolean;
  usedSymbolsDownDirty: boolean;
  usedSymbolsUpDirty: boolean;
  requested?: boolean;
};

export type DependencyNode = {
  id: ContentKey;
  type: 'dependency';
  value: Dependency;
  complete?: boolean;
  correspondingRequest?: string;
  deferred: boolean;
  /** dependency was deferred (= no used symbols (in immediate parents) & side-effect free) */
  hasDeferred?: boolean;
  usedSymbolsDown: Set<Symbol>;
  /**
   * a requested symbol -> either
   *  - if ambiguous (e.g. dependency to asset group with both CSS modules and JS asset): undefined
   *  - if external: null
   *  - the asset it resolved to, and the potentially renamed export name
   */
  usedSymbolsUp: Map<
    Symbol,
    {
      asset: ContentKey;
      symbol: Symbol | undefined | null;
    } | void | null
  >;
  /** for the "down" pass, the dependency resolution asset needs to be updated */
  usedSymbolsDownDirty: boolean;
  /** for the "up" pass, the parent asset needs to be updated */
  usedSymbolsUpDirtyUp: boolean;
  /** for the "up" pass, the dependency resolution asset needs to be updated */
  usedSymbolsUpDirtyDown: boolean;
  /** dependency was excluded (= no used symbols (globally) & side-effect free) */
  excluded: boolean;
};

export type RootNode = {
  id: ContentKey;
  readonly type: 'root';
  value: string | null;
};

export type AssetRequestInput = {
  name?: string; // AssetGraph name, needed so that different graphs can isolated requests since the results are not stored
  filePath: ProjectPath;
  env: Environment;
  isSource?: boolean;
  canDefer?: boolean;
  sideEffects?: boolean;
  code?: string;
  pipeline?: string | null;
  optionsRef: SharedReference;
  isURL?: boolean;
  query?: string | null;
};

export type AssetRequestResult = Array<Asset>;
// Asset group nodes are essentially used as placeholders for the results of an asset request
export type AssetGroup = Omit<AssetRequestInput, 'optionsRef'>;
export type AssetGroupNode = {
  id: ContentKey;
  readonly type: 'asset_group';
  value: AssetGroup;
  correspondingRequest?: string;
  /** this node was deferred (= no used symbols (in immediate parents) & side-effect free) */
  deferred?: boolean;
  hasDeferred?: boolean;
  usedSymbolsDownDirty: boolean;
};

export type TransformationRequest = {
  invalidations: Array<RequestInvalidation>;
  invalidateReason: number;
  devDeps: Map<PackageName, string>;
  invalidDevDeps: Array<{
    specifier: DependencySpecifier;
    resolveFrom: ProjectPath;
  }>;
} & AssetGroup;

export type DepPathRequestNode = {
  id: ContentKey;
  readonly type: 'dep_path_request';
  value: Dependency;
};

export type AssetRequestNode = {
  id: ContentKey;
  readonly type: 'asset_request';
  value: AssetRequestInput;
};

export type EntrySpecifierNode = {
  id: ContentKey;
  readonly type: 'entry_specifier';
  value: ProjectPath;
  correspondingRequest?: string;
};

export type Entry = {
  filePath: ProjectPath;
  packagePath: ProjectPath;
  target?: string;
  loc?: InternalSourceLocation | null;
};

export type EntryFileNode = {
  id: ContentKey;
  readonly type: 'entry_file';
  value: Entry;
  correspondingRequest?: string;
};

export type AssetGraphNode =
  | AssetGroupNode
  | AssetNode
  | DependencyNode
  | EntrySpecifierNode
  | EntryFileNode
  | RootNode;

export type BundleGraphNode =
  | AssetNode
  | DependencyNode
  | EntrySpecifierNode
  | EntryFileNode
  | RootNode
  | BundleGroupNode
  | BundleNode;

export type InternalDevDepOptions = {
  specifier: DependencySpecifier;
  resolveFrom: ProjectPath;
  range?: SemverRange | null;
  additionalInvalidations?: Array<{
    specifier: DependencySpecifier;
    resolveFrom: ProjectPath;
    range?: SemverRange | null;
  }>;
};

export type Config = {
  id: string;
  isSource: boolean;
  searchPath: ProjectPath;
  env: Environment;
  cacheKey: string | undefined | null;
  result: ConfigResult;
  invalidateOnFileChange: Set<ProjectPath>;
  invalidateOnFileCreate: Array<InternalFileCreateInvalidation>;
  invalidateOnEnvChange: Set<string>;
  invalidateOnOptionChange: Set<string>;
  devDeps: Array<InternalDevDepOptions>;
  invalidateOnStartup: boolean;
  invalidateOnBuild: boolean;
};

export type EntryRequest = {
  specifier: DependencySpecifier;
  result?: ProjectPath;
};

export type EntryRequestNode = {
  id: ContentKey;
  readonly type: 'entry_request';
  value: string;
};

export type TargetRequestNode = {
  id: ContentKey;
  readonly type: 'target_request';
  value: ProjectPath;
};

export type CacheEntry = {
  filePath: ProjectPath;
  env: Environment;
  hash: string;
  assets: Array<Asset>;
  // Initial assets, pre-post processing
  initialAssets: Array<Asset> | undefined | null;
};

export type Bundle = {
  id: ContentKey;
  publicId: string | undefined | null;
  hashReference: string;
  type: string;
  env: Environment;
  entryAssetIds: Array<ContentKey>;
  mainEntryId: ContentKey | undefined | null;
  needsStableName: boolean | undefined | null;
  bundleBehavior:
    | typeof BundleBehavior[keyof typeof BundleBehavior]
    | undefined
    | null;
  isSplittable: boolean | undefined | null;
  isPlaceholder?: boolean;
  target: Target;
  name: string | undefined | null;
  displayName: string | undefined | null;
  pipeline: string | undefined | null;
};

export type BundleNode = {
  id: ContentKey;
  readonly type: 'bundle';
  value: Bundle;
};

export type BundleGroup = {
  target: Target;
  entryAssetId: string;
};

export type BundleGroupNode = {
  id: ContentKey;
  readonly type: 'bundle_group';
  value: BundleGroup;
};

export type PackagedBundleInfo = {
  filePath: ProjectPath;
  type: string;
  stats: Stats;
};

export type TransformationOpts = {
  request: AssetGroup;
  optionsRef: SharedReference;
  configCachePath: string;
};

export type ValidationOpts = {
  requests: AssetGroup[];
  optionsRef: SharedReference;
  configCachePath: string;
};

export type ReportFn = (event: ReporterEvent) => void;
