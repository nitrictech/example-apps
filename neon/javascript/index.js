// index.js Used in development for hot reloading/nodemon
import fs from "fs";
import yaml from "js-yaml";
import { globSync } from "glob";
import { dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = yaml.load(fs.readFileSync("nitric.yaml", "utf8"));

if (!config.handlers) {
  throw new Error("Handlers not defined in config file");
}

config.handlers.forEach((handlerGlob) => {
  const files = globSync(`${__dirname}/${handlerGlob}`, { absolute: true });
  files
    .filter((file) => file.slice(-3) === ".js")
    .forEach((file) => {
      import(`./${relative('.', file)}`);
    });
});
