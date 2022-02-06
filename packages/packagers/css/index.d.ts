import { Dependency } from '@parcel/types';
import { Packager } from '@parcel/plugin';

declare const _default: Packager<unknown, unknown>;

declare function getSpecifier(dep: Dependency): string;

export default _default;
export { getSpecifier };
