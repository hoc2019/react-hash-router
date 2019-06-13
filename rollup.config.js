import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';
const outputFile = isProd ? './lib/index.js' : './dev/index.js';
const outputCss = isProd ? './lib/index.css' : './dev/index.css';
const uglifyCheck = isProd ? [uglify()] : [];

export default {
    // 入口 可以是一个字符串，也可以是对象
    input: 'src/index.js',
    // 出口
    output: {
        file: outputFile,
        format: 'cjs'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        babel({
            exclude: 'node_modules/**'
        }),
		postcss({
		// modules: true, // 增加 css-module 功能
		extensions: ['.less', '.css'],
		  use: [
			['less', {
			  javascriptEnabled: true
			}]
		  ],
//		  inject: isDev, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
		  extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
		}),
        resolve(),
        commonjs(),
        ...uglifyCheck
    ],
    external: id => /^react/.test(id)
};
