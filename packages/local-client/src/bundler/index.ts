import * as esbuild from "esbuild-wasm";
import { fetchPlugin } from "./plugins/fetch.plugins";
import { pathResolverPlugin } from "./plugins/path-resolver.plugin";

let service: esbuild.Service;

const bundle = async (code: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: process.env.REACT_APP_WEB_ASSEMBLY_URL!,
    });
  }

  const result = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [pathResolverPlugin(), fetchPlugin(code)],
    define: {
      "process.env.NODE_ENV": '"production"',
      global: "window",
    },
  });

  return result;
};

export default bundle;
