import { bumpVersions } from "https://raw.githubusercontent.com/drashland/services/master/console/bump_versions.ts";

const branch: string = Deno.args[0].split("=")[1]; // ["--version", "release-vX.X.X"]
const version = branch.substring(branch.indexOf("v") + 1); // 1.0.5

bumpVersions([
  {
    filename: "./egg.json",
    replaceTheRegex: /"version": "[0-9\.]+[0-9\.]+[0-9\.]"/,
    replaceWith: `"version": "${version}"`,
  },
  {
    filename: "./README.md",
    replaceTheRegex: /dmm@v[0-9\.]+[0-9\.]+[0-9\.]/g,
    replaceWith: `dmm@v${version}`,
  },
  {
    filename: "./src/commands/version.ts",
    replaceTheRegex: /version = "[0-9\.]+[0-9\.]+[0-9\.]"/,
    replaceWith: `version = "${version}"`,
  },
]);