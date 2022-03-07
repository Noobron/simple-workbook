import * as esbuild from "esbuild-wasm";
import { Constants } from "../../constants/constants";
import { formatString } from "../../utils/utils";

export const pathResolverPlugin = () => {
  return {
    name: "path-resolver-plugin",
    setup(build: esbuild.PluginBuild) {
      // Resolve entry file `index.js`
      build.onResolve({ filter: /^index\.js$/i }, () => {
        return { path: "index.js", namespace: "a" };
      });

      // Resolve relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: "a",
          path: new URL(
            args.path,
            formatString(Constants.BUNDLER.RELATIVE_MODULE_URL, [args.resolveDir])
          ).href,
        };
      });

      // Resolve main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: "a",
          path: formatString(Constants.BUNDLER.MODULE_URL, [args.path]),
        };
      });
    },
  };
};
