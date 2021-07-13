import { ReporterEvent, PluginOptions } from '@parcel/types';
import { Reporter } from '@parcel/plugin';

declare function _report(event: ReporterEvent, options: PluginOptions): Promise<void>;
declare const _default: Reporter;

export default _default;
export { _report };
