import { assertEquals, colours } from "../../deps.ts";
import DenoService from "../../src/services/deno_service.ts";
import NestService from "../../src/services/nest_service.ts";
import { outOfDateDepsDir, upToDateDepsDir } from "./test_constants.ts";

const latestDrashRelease = await DenoService.getLatestModuleRelease(
  "drash",
);
const latestCliffyRelease = await NestService.getLatestModuleRelease(
  "cliffy",
);
const latestStdRelease = await DenoService.getLatestModuleRelease("std");

// Check a specific dep that can be updated
Deno.test({
  name: "Check | Single | Modules to Update Exist - deno.land/x",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "fs",
      ],
      cwd: outOfDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    const output = await p.output();
    await p.close();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.yellow(
          `fs can be updated from 0.53.0 to ${latestStdRelease}`,
        ) +
        "\n" +
        "To update, run: \n" +
        "    dmm update fs" +
        "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check a specific dep that is already up to date
Deno.test({
  name: "Check | Single | No Modules to Update - deno.land/x",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "fs",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.green("Your dependencies are up to date") + "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check a specific dep that can be updated
Deno.test({
  name: "Check | Single | Modules to Update Exist - nest.land",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "cliffy",
      ],
      cwd: outOfDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    const output = await p.output();
    await p.close();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.yellow(
          `cliffy can be updated from 0.11.2 to ${latestCliffyRelease}`,
        ) +
        "\n" +
        "To update, run: \n" +
        "    dmm update cliffy" +
        "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check a specific dep that is already up to date
Deno.test({
  name: "Check | Single | No Modules to Update - nest.land",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "cliffy",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.green("Your dependencies are up to date") + "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check a list of deps that can be updated
Deno.test({
  name: "Check | Many | Modules to Update Exist",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "fs",
        "drash",
      ],
      cwd: outOfDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.yellow(
          `drash can be updated from v1.0.0 to ${latestDrashRelease}`,
        ) + "\n" +
        colours.yellow(
          `fs can be updated from 0.53.0 to ${latestStdRelease}`,
        ) +
        "\n" +
        "To update, run: \n" +
        "    dmm update drash fs" +
        "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check a list of deps that are already up to date
Deno.test({
  name: "Check | Many | No Modules to Update",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "fs",
        "drash",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.green("Your dependencies are up to date") + "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check every dep and all of them are out of date
Deno.test({
  name: "Check | All | Modules to Update Exist",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
      ],
      cwd: outOfDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.yellow(
          `drash can be updated from v1.0.0 to ${latestDrashRelease}`,
        ) + "\n" +
        colours.yellow(
          `fs can be updated from 0.53.0 to ${latestStdRelease}`,
        ) +
        "\n" +
        colours.yellow(
          `fmt can be updated from 0.53.0 to ${latestStdRelease}`,
        ) + "\n" +
        colours.yellow(
          `cliffy can be updated from 0.11.2 to ${latestCliffyRelease}`,
        ) + "\n" +
        colours.yellow(
          `log can be updated from 0.53.0 to ${latestStdRelease}`,
        ) + "\n" +
        colours.yellow(
          `uuid can be updated from 0.61.0 to ${latestStdRelease}`,
        ) + "\n" +
        "To update, run: \n" +
        "    dmm update drash fs fmt cliffy log uuid" +
        "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

// Check every dep and all of them are already up to date
Deno.test({
  name: "Check | All | No Modules to Update",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(stderr, "");
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n" +
        "Comparing versions...\n" +
        colours.green("Your dependencies are up to date") + "\n",
    );
    assertEquals(status.code, 0);
    assertEquals(status.success, true);
  },
});

Deno.test({
  name: "Check | Modules Dont Exist in Dependencies",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "denon",
        "io",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(
      stderr,
      colours.red("Modules specified do not exist in your dependencies.") +
        "\n",
    );
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n",
    );
    assertEquals(status.code, 1);
    assertEquals(status.success, false);
  },
});

Deno.test({
  name: "Check | std | Not Found",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "http",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(
      stderr,
      colours.red("Modules specified do not exist in your dependencies.") +
        "\n",
    );
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n",
    );
    assertEquals(status.code, 1);
    assertEquals(status.success, false);
  },
});

Deno.test({
  name: "Check | 3rd Party | Not Found",

  //ignore: true,
  async fn(): Promise<void> {
    const p = await Deno.run({
      cmd: [
        "deno",
        "run",
        "--allow-net",
        "--allow-read",
        "../../../mod.ts",
        "check",
        "io",
      ],
      cwd: upToDateDepsDir,
      stdout: "piped",
      stderr: "piped",
    });
    const status = await p.status();
    p.close();
    const output = await p.output();
    const stdout = new TextDecoder("utf-8").decode(output);
    const error = await p.stderrOutput();
    const stderr = new TextDecoder("utf-8").decode(error);
    assertEquals(
      stderr,
      colours.red("Modules specified do not exist in your dependencies.") +
        "\n",
    );
    assertEquals(
      stdout,
      "Gathering facts...\n" +
        "Reading deps.ts to gather your dependencies...\n",
    );
    assertEquals(status.code, 1);
    assertEquals(status.success, false);
  },
});
