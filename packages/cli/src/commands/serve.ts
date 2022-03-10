import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command("serve [filaname]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4200")
  .action(async (filename = "workbook.js", options) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));

      await serve(parseInt(options.port), filename, dir, !isProduction);

      console.log(
        `Opened \x1b[33m'${filename}'\x1b[0m. Navigate to \x1b[36mhttp://localhost:${options.port}\x1b[0m to edit the file.`
      );
    } catch (error: any) {
      console.log(`\x1b[31m${error.message}`, "\x1b[0m");
      process.exit(1);
    }
  });
