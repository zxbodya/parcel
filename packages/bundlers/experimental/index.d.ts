import { Asset, BundleBehavior, Target, Environment } from '@parcel/types';
import { NodeId } from '@parcel/graph';

declare type AssetId = string;
declare type Bundle = {
    assets: Set<Asset>;
    internalizedAssetIds: Array<AssetId>;
    bundleBehavior?: BundleBehavior | null;
    needsStableName: boolean;
    mainEntryAsset: Asset | undefined | null;
    size: number;
    sourceBundles: Set<NodeId>;
    target: Target;
    env: Environment;
    type: string;
};
declare const _default: any;

export default _default;
export { Bundle };
