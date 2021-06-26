import { BaseAsset, PluginOptions, AST, FilePath, SourceLocation as SourceLocation$1 } from '@parcel/types';
import { File, SourceLocation } from '@babel/types';
import SourceMap from '@parcel/source-map';

declare type BabelError = Error & {
    loc?: {
        line: number;
        column: number;
    };
    source?: string;
    filePath?: string;
};
declare function babelErrorEnhancer(error: BabelError, asset: BaseAsset): Promise<BabelError>;

declare function remapAstLocations(ast: File, map: SourceMap): void;
declare function parse({ asset, code, options, }: {
    asset: BaseAsset;
    code: string;
    options: PluginOptions;
}): Promise<AST>;
declare function generateAST({ ast, sourceFileName, sourceMaps, options, }: {
    ast: File;
    sourceFileName?: FilePath;
    sourceMaps?: boolean;
    options: PluginOptions;
}): {
    content: string;
    map: SourceMap;
};
declare function generate({ asset, ast, options, }: {
    asset: BaseAsset;
    ast: AST;
    options: PluginOptions;
}): Promise<{
    content: string;
    map: SourceMap | undefined | null;
}>;
declare function convertBabelLoc(options: PluginOptions, loc?: SourceLocation | null): SourceLocation$1 | undefined | null;

export { babelErrorEnhancer, convertBabelLoc, generate, generateAST, parse, remapAstLocations };
