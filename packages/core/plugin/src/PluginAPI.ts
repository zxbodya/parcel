import type {
  Transformer as TransformerOpts,
  Resolver as ResolverOpts,
  Bundler as BundlerOpts,
  Namer as NamerOpts,
  Runtime as RuntimeOpts,
  Packager as PackagerOpts,
  Optimizer as OptimizerOpts,
  Compressor as CompressorOpts,
  Reporter as ReporterOpts,
  Validator as ValidatorOpts,
} from '@parcel/types';

const CONFIG = Symbol.for('parcel-plugin-config');

export class Transformer<T> {
  constructor(opts: TransformerOpts<T>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Resolver {
  constructor(opts: ResolverOpts) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Bundler<T> {
  constructor(opts: BundlerOpts<T>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Namer<T> {
  constructor(opts: NamerOpts<T>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Runtime<T> {
  constructor(opts: RuntimeOpts<T>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Validator {
  constructor(opts: ValidatorOpts) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Packager<T, U> {
  constructor(opts: PackagerOpts<T, U>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Optimizer<T, U> {
  constructor(opts: OptimizerOpts<T, U>) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Compressor {
  constructor(opts: CompressorOpts) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}

export class Reporter {
  constructor(opts: ReporterOpts) {
    // $FlowFixMe
    this[CONFIG] = opts;
  }
}
