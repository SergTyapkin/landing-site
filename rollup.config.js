import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';

import styles from 'rollup-plugin-styles';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        file: 'build/bundle.min.js',
        format: 'es',
        assetFileNames: 'assets/[name][hash][extname]'
    },
    plugins: [
        typescript({
            target: 'ES6',
            sourceMap: true // if true => would broke rollup's source map
        }),
        styles({
            mode: ['extract', 'styles.css'],
            minimize: true
        }),
        nodeResolve(),
        commonjs(),
        terser({ format: { comments: false } }),
        html({
            title: 'Landing',
            attributes: {
                html: { lang: 'ru' }
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'theme-color', content: '#303030' }
            ]
        }),
        copy({
            targets: [
                { src: 'src/images/*', dest: 'build/images' },
                { src: 'src/sw.js', dest: 'build/' }
            ]
        })
    ]
};
