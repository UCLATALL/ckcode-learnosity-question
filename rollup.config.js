import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import svg from "rollup-plugin-svg";
import { terser } from "rollup-plugin-terser";

// noinspection JSUnusedGlobalSymbols
export default {
  input: "src/ckcode.js",
  output: {
    file: "build/ckcode.bundle.js",
    format: "esm",
    // sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      "Reflect.decorate": "undefined",
      preventAssignment: true,
    }),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    svg(),
  ],
};
