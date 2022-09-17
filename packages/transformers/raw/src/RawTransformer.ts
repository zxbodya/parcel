import {Transformer} from '@parcel/plugin';

export default new Transformer({
  transform({asset}) {
    asset.bundleBehavior = 'isolated';
    return [asset];
  },
}) as Transformer;
