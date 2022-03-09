import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

export const serveCommand = new Command()
  .command("serve [filaname]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4200")
  .action((filename = "workbook.js", options) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

    serve(parseInt(options.port), filename, dir);
  });
