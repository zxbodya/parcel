import { Transformer as Transformer$1, Resolver as Resolver$1, Bundler as Bundler$1, Namer as Namer$1, Runtime as Runtime$1, Validator as Validator$1, Packager as Packager$1, Optimizer as Optimizer$1, Compressor as Compressor$1, Reporter as Reporter$1 } from '@parcel/types';

declare class Transformer<T> {
    constructor(opts: Transformer$1<T>);
}
declare class Resolver {
    constructor(opts: Resolver$1);
}
declare class Bundler<T> {
    constructor(opts: Bundler$1<T>);
}
declare class Namer<T> {
    constructor(opts: Namer$1<T>);
}
declare class Runtime<T> {
    constructor(opts: Runtime$1<T>);
}
declare class Validator {
    constructor(opts: Validator$1);
}
declare class Packager<T, U> {
    constructor(opts: Packager$1<T, U>);
}
declare class Optimizer<T, U> {
    constructor(opts: Optimizer$1<T, U>);
}
declare class Compressor {
    constructor(opts: Compressor$1);
}
declare class Reporter {
    constructor(opts: Reporter$1);
}

export { Bundler, Compressor, Namer, Optimizer, Packager, Reporter, Resolver, Runtime, Transformer, Validator };
