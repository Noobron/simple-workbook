import axios from "axios";
import { OnLoadResult, PluginBuild } from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: process.env.REACT_APP_CACHE_DB,
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: PluginBuild) {
      build.onLoad({ filter: /^index\.js$/i }, async (args: any) => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      // Check if the file is already available in the system else send request to NPM CDN
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        } else {
          return null;
        }
      });

      // Load CSS files
      build.onLoad({ filter: /.css$/i }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const contents = `
        const style = document.createElement("style")
        style.innerText = '${data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")}';
        document.head.appendChild(style);
        `;

        const result: OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // store result in cache
        await fileCache.setItem(args.path, result);

        return result;
      });

      // Load the file if other regex expressions dosen't matches
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const result: OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // store result in cache
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
