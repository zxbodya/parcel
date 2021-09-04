import {Transformer} from '@parcel/plugin';
import mdx from '@mdx-js/mdx';

export default new Transformer({
  async transform({asset}) {
    let code = await asset.getCode();
    let compiled = await mdx(code);

    asset.type = 'js';
    asset.setCode(`/* @jsxRuntime classic */
/* @jsx mdx */
import React from 'react';
import { mdx } from '@mdx-js/react'
${compiled}
`);

    return [asset];
  },
});
