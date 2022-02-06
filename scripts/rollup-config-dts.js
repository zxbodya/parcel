/**
 * run as yarn run rollup -c scripts/rollup-config-dts.js
 */
const dts = require('rollup-plugin-dts').default;
const fs = require('fs');

const fsPromises = fs.promises;
const path = require('path');

const pkgs = [
  'packages/bundlers/default',
  'packages/bundlers/experimental',
  'packages/compressors/brotli',
  'packages/compressors/gzip',
  'packages/compressors/raw',
  'packages/configs/default',
  'packages/configs/webextension',
  'packages/core/cache',
  'packages/core/codeframe',
  'packages/core/core',
  'packages/core/diagnostic',
  'packages/core/fs',
  'packages/core/graph',
  'packages/core/integration-tests',
  'packages/core/is-v2-ready-yet',
  'packages/core/logger',
  'packages/core/markdown-ansi',
  'packages/core/package-manager',
  'packages/core/parcel',
  'packages/core/plugin',
  'packages/core/register',
  'packages/core/test-utils',
  'packages/core/types',
  'packages/core/utils',
  'packages/core/workers',
  'packages/dev/babel-preset',
  'packages/dev/babel-register',
  'packages/dev/eslint-config',
  'packages/dev/eslint-config-browser',
  'packages/dev/eslint-plugin',
  'packages/dev/esm-fuzzer',
  'packages/namers/default',
  'packages/optimizers/blob-url',
  'packages/optimizers/css',
  'packages/optimizers/cssnano',
  'packages/optimizers/data-url',
  'packages/optimizers/esbuild',
  'packages/optimizers/htmlnano',
  'packages/optimizers/image',
  'packages/optimizers/svgo',
  'packages/optimizers/swc',
  'packages/optimizers/terser',
  'packages/packagers/css',
  'packages/packagers/html',
  'packages/packagers/js',
  'packages/packagers/raw',
  'packages/packagers/raw-url',
  'packages/packagers/svg',
  'packages/packagers/ts',
  'packages/packagers/xml',
  'packages/reporters/build-metrics',
  'packages/reporters/bundle-analyzer',
  'packages/reporters/bundle-buddy',
  'packages/reporters/cli',
  'packages/reporters/dev-server',
  'packages/reporters/json',
  'packages/reporters/sourcemap-visualiser',
  'packages/resolvers/default',
  'packages/resolvers/glob',
  'packages/runtimes/hmr',
  'packages/runtimes/js',
  'packages/runtimes/react-refresh',
  'packages/runtimes/service-worker',
  'packages/transformers/babel',
  'packages/transformers/coffeescript',
  'packages/transformers/css',
  'packages/transformers/elm',
  'packages/transformers/glsl',
  'packages/transformers/graphql',
  'packages/transformers/html',
  'packages/transformers/image',
  'packages/transformers/inline',
  'packages/transformers/inline-string',
  'packages/transformers/js',
  'packages/transformers/json',
  'packages/transformers/jsonld',
  'packages/transformers/less',
  'packages/transformers/mdx',
  'packages/transformers/postcss',
  'packages/transformers/posthtml',
  'packages/transformers/pug',
  'packages/transformers/raw',
  'packages/transformers/react-refresh-wrap',
  'packages/transformers/sass',
  'packages/transformers/stylus',
  'packages/transformers/sugarss',
  'packages/transformers/svg',
  'packages/transformers/svg-react',
  'packages/transformers/toml',
  'packages/transformers/typescript-tsc',
  'packages/transformers/typescript-types',
  'packages/transformers/vue',
  'packages/transformers/webextension',
  'packages/transformers/webmanifest',
  'packages/transformers/worklet',
  'packages/transformers/xml',
  'packages/transformers/yaml',
  'packages/utils/babel-plugin-transform-runtime',
  'packages/utils/babel-preset-env',
  //'packages/utils/create-react-app',
  'packages/utils/events',
  'packages/utils/fs-search',
  //'packages/utils/fs-write-stream-atomic',
  'packages/utils/hash',
  'packages/utils/node-resolver-core',
  'packages/utils/service-worker',
  'packages/utils/ts-utils',
  'packages/validators/eslint',
  'packages/validators/typescript',
];

async function main() {
  const config = [];

  for (const packagePath of pkgs) {
    console.log(packagePath);
    const dtsPath = packagePath.replace(/^packages\//, 'dts-tmp/');

    const pkg = JSON.parse(
      await fsPromises.readFile(path.join(packagePath, 'package.json')),
    );

    let input;
    if (pkg.source) {
      if (pkg.source.endsWith('.js')) throw new Error(packagePath);
      input = path.join(dtsPath, pkg.source.replace(/.ts$/, '.d.ts'));
    } else {
      input = path.join(dtsPath, 'index.d.ts');
      if (!fs.existsSync(input)) {
        input = path.join(dtsPath, 'src', 'index.d.ts');
      }
    }

    if (!fs.existsSync(input)) {
      console.log(input);
    } else {
      config.push({
        input: input,
        output: [{file: path.join(packagePath, 'index.d.ts'), format: 'es'}],
        plugins: [dts()],
      });
    }
  }
  return config;
}

const config = main();

module.exports = config;
