import type {TranspileOptions} from 'typescript';

import {Transformer} from '@parcel/plugin';
import {loadTSConfig} from '@parcel/ts-utils';
import typescript from 'typescript';
import SourceMap from '@parcel/source-map';

export default new Transformer({
  loadConfig({config, options}) {
    return loadTSConfig(config, options);
  },

  async transform({asset, config, options}) {
    asset.type = 'js';

    let code = await asset.getCode();

    let transpiled = typescript.transpileModule(code, {
      compilerOptions: {
        // React is the default. Users can override this by supplying their own tsconfig,
        // which many TypeScript users will already have for typechecking, etc.
        jsx: typescript.JsxEmit.React,
        ...config,
        // Always emit output
        noEmit: false,
        // Don't compile ES `import`s -- scope hoisting prefers them and they will
        // otherwise compiled to CJS via babel in the js transformer
        module: typescript.ModuleKind.ESNext,
        sourceMap: !!asset.env.sourceMap,
      },
      fileName: asset.filePath, // Should be relativePath?
    } as TranspileOptions);

    let map;
    let {outputText, sourceMapText} = transpiled;
    if (sourceMapText != null) {
      map = new SourceMap(options.projectRoot);
      map.addVLQMap(JSON.parse(sourceMapText));

      outputText = outputText.substring(
        0,
        outputText.lastIndexOf('//# sourceMappingURL'),
      );
    }

    return [
      {
        type: 'js',
        content: outputText,
        map,
      },
    ];
  },
});
