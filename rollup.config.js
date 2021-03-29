import alias from '@rollup/plugin-alias';
import cjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';
import stripCode from 'rollup-plugin-strip-code';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import builtins from 'builtin-modules';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';

const prod = !process.env.ROLLUP_WATCH;

// Date of the build (YYYYMMDD).
const dateString =
  String(new Date().getFullYear()) +
  String(new Date().getMonth() + 1).padStart(2, '0') +
  String(new Date().getDate()).padStart(2, '0');

const nodeEnv = JSON.stringify(prod ? 'production' : 'development');

// Sub-folder for JS chunks.
// Add the date to prod to make it easy to delete old files.
const jsChunksSubfolder = prod ? `chunks/${dateString}` : `chunks/dev`

export default [
  {
    input: 'app/src/server.ts',

    output: {
      dir: 'app/',
      format: 'cjs',
      sourcemap: prod ? false : 'inline',
    },

    plugins: [
      replace({
        values: {
          'process.env.NODE_ENV': nodeEnv,
          '<%BUILD%>': dateString,
        },
      }),
      json(),
      resolve({
        preferBuiltins: true,
      }),
      cjs(),
      typescript({
        sourceMap: !prod,
      }),
      prod && terser({ output: { comments: false } }),
      !prod && run({ execArgv: ['--inspect'] }),
    ],
    external: [...builtins, /@google-cloud/],
  },
  {
    input: 'run/src/server.ts',

    output: {
      file: 'run/index.js',
      format: 'cjs',
      sourcemap: prod ? false : 'inline',
    },

    plugins: [
      replace({
        values: {
          'process.env.NODE_ENV': nodeEnv,
          '<%BUILD%>': dateString,
        },
      }),
      json(),
      resolve({
        preferBuiltins: true,
      }),
      cjs(),
      typescript({
        sourceMap: !prod,
      }),
      prod && terser({ output: { comments: false } }),
      !prod && run({ env: { ...process.env, PORT: 8084 } }),
    ],
    external: [...builtins, /@google-cloud/],
  },
  buildFrontEnd('frontend/src/viewer/flyxc.ts', {
    visualizer: true,
    output: {
      chunkFileNames: `js/${jsChunksSubfolder}/[name]-[hash].js`,
    },
  }),
  buildFrontEnd('frontend/src/viewer/workers/track.ts', { isWorker: true }),
  buildFrontEnd('frontend/src/viewer/workers/live-track.ts', { isWorker: true }),
  buildFrontEnd('frontend/src/archives/archives.ts'),
  buildFrontEnd('frontend/src/tracking/devices.ts'),
  buildFrontEnd('frontend/src/admin/admin.ts'),
];

function buildFrontEnd(input, options = {}) {
  const m = input.match(/\/([\w-]+)\.ts$/);
  if (m == null) {
    throw Error('Can not find project name');
  }
  const cssFile = `css/${m[1]}.css`;

  return {
    input,

    output: {
      dir: 'frontend/static/',
      entryFileNames: options.isWorker ? 'js/workers/[name].js' : 'js/[name].js',
      format: 'esm',
      sourcemap: prod ? false : 'inline',
      ...options.output,
    },

    plugins: [
      replace({
        values: {
          'process.env.NODE_ENV': nodeEnv,
          '<%BUILD%>': dateString,
        },
        delimiters: ['', ''],
      }),
      prod &&
        stripCode({
          start_comment: 'strip-from-prod',
          end_comment: 'end-strip-from-prod',
        }),
      postcss({
        extract: cssFile,
        plugins: [cssnano()],
      }),
      minifyHTML(),
      alias({
        entries: [
          {
            find: 'lit-html/lib/shady-render.js',
            replacement: 'frontend/node_modules/lit-html/lit-html.js',
          },
        ],
      }),
      resolve(),
      cjs(),
      typescript({
        lib: options.isWorker ? 
          ['ES2020', 'WebWorker'] : 
          ['ES2020', 'DOM'],
        sourceMap: !prod,
      }),
      prod && terser({ output: { comments: false } }),
      process.env.ROLLUP_VISU && options.visualizer && visualizer(),
    ],
  };
}
