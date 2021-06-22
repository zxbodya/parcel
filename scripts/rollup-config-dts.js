/**
 * run as yarn run rollup -c scripts/rollup-config-dts.js
 */
const dts = require('rollup-plugin-dts').default;
const fs = require('fs');

const fsPromises = fs.promises;
const path = require('path');

const pkgs = [
  'packages/bundlers/default',
  'packages/core/test-utils',
  'packages/core/types',
  'packages/core/core',
  'packages/core/logger',
  'packages/core/cache',
  'packages/core/parcel',
  'packages/core/diagnostic',
  'packages/core/plugin',
  'packages/core/integration-tests',
  'packages/core/utils',
  'packages/core/markdown-ansi',
  'packages/core/register',
  'packages/core/codeframe',
  'packages/core/workers',
  'packages/core/fs',
  'packages/core/is-v2-ready-yet',
  'packages/runtimes/js',
  'packages/runtimes/hmr',
  'packages/runtimes/react-refresh',
  'packages/namers/default',
  'packages/utils/babylon-walk',
  'packages/utils/fs-search',
  'packages/utils/ts-utils',
  'packages/utils/hash',
  'packages/utils/node-libs-browser',
  'packages/utils/babel-plugin-transform-runtime',
  'packages/utils/node-resolver-core',
  'packages/utils/events',
  'packages/utils/babel-preset-env',
  'packages/utils/fs-write-stream-atomic',
  'packages/utils/create-react-app',
  'packages/shared/babel-ast-utils',
  'packages/optimizers/data-url',
  'packages/optimizers/blob-url',
  'packages/optimizers/htmlnano',
  'packages/optimizers/cssnano',
  'packages/optimizers/esbuild',
  'packages/optimizers/terser',
  'packages/optimizers/svgo',
  'packages/resolvers/default',
  'packages/resolvers/glob',
  'packages/transformers/mdx',
  'packages/transformers/posthtml',
  'packages/transformers/webextension',
  'packages/transformers/typescript-tsc',
  'packages/transformers/toml',
  'packages/transformers/sugarss',
  'packages/transformers/css',
  'packages/transformers/less',
  'packages/transformers/js',
  'packages/transformers/stylus',
  'packages/transformers/vue',
  'packages/transformers/svg-react',
  'packages/transformers/inline-string',
  'packages/transformers/pug',
  'packages/transformers/postcss',
  'packages/transformers/elm',
  'packages/transformers/html',
  'packages/transformers/image',
  'packages/transformers/webmanifest',
  'packages/transformers/glsl',
  'packages/transformers/inline',
  'packages/transformers/babel',
  'packages/transformers/json',
  'packages/transformers/graphql',
  'packages/transformers/react-refresh-wrap',
  'packages/transformers/yaml',
  'packages/transformers/coffeescript',
  'packages/transformers/typescript-types',
  'packages/transformers/sass',
  'packages/transformers/jsonld',
  'packages/transformers/raw',
  'packages/configs/webextension',
  'packages/configs/default',
  'packages/dev/babel-register',
  'packages/dev/babel-preset',
  'packages/dev/eslint-config',
  'packages/dev/esm-fuzzer',
  'packages/dev/eslint-config-browser',
  'packages/dev/eslint-plugin',
  'packages/validators/typescript',
  'packages/validators/eslint',
  'packages/packagers/css',
  'packages/packagers/js',
  'packages/packagers/html',
  'packages/packagers/raw-url',
  'packages/packagers/ts',
  'packages/packagers/raw',
  'packages/reporters/bundle-analyzer',
  'packages/reporters/dev-server',
  'packages/reporters/build-metrics',
  'packages/reporters/cli',
  'packages/reporters/json',
  'packages/reporters/sourcemap-visualiser',
  'packages/reporters/bundle-buddy',
];

async function main() {
  const config = [];

  for (const packagePath of pkgs) {
    console.log(packagePath);
    const dtsPath = packagePath.replace(/^packages\//, 'dts-tmp/');

    const pkg = JSON.parse(await fsPromises.readFile(path.join(packagePath, 'package.json')));

    let input;
    if (pkg.source) {
      input = path.join(dtsPath, pkg.source.replace(/.ts$/, '.d.ts'));
    } else {
      input = path.join(dtsPath, 'index.d.ts');
      if(!fs.existsSync(input)) {
        input = path.join(dtsPath, 'src', 'index.d.ts');
      }
    }

    if(!fs.existsSync(input)){
      console.log(input);
    } else {
      config.push(
        {
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
