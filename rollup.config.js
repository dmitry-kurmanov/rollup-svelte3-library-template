import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import buble from "rollup-plugin-buble";
import { terser } from "rollup-plugin-terser";
import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";

import pkg from "./package.json";

// const production = !process.env.ROLLUP_WATCH;
const name = "SurveyJSBuilder";

export default {
  input: "src/index.html",
  output: [
    { file: pkg.module, format: "es" },
    {
      file: pkg.main,
      format: "umd",
      name,
      amd: {
        id: pkg.name
      }
    }
  ],
  plugins: [
    svelte({
      // opt in to v3 behaviour today
      skipIntroByDefault: true,
      nestedTransitions: true,

      //   shared: production,

      // enable run-time checks when not in production
      //   dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write("dist/" + pkg.name + ".css");
      }
    }),
    resolve(), // so Rollup can find 3dparty modules in `node_modules`
    commonjs(), // so Rollup can convert 3dparty modules in `node_modules` to an ES module
    babel({
      exclude: "node_modules/**"
    })
    // buble({
    //   // transpile ES2015+ to ES5
    //   exclude: ["node_modules/**"]
    // })
    // !production && serve("dist"),
    // production && terser()
  ]
};
