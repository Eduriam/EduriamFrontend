import { spawn } from "child_process";
import * as fs from "fs";
import { createRequire } from "module";
import * as path from "path";

import { startServers, stopServers } from "./start-servers";

async function runTests() {
  let exitCode = 0;
  // Yarn forwards args after `--`, but also includes the separator itself in argv in some setups.
  // If present, drop it so Cucumber doesn't interpret subsequent args as feature paths.
  const rawCliArgs = process.argv.slice(2);
  const cucumberArgsFromCli =
    rawCliArgs[0] === "--" ? rawCliArgs.slice(1) : rawCliArgs;
  const requireFromHere = createRequire(__filename);

  try {
    await startServers();

    console.log("Waiting for servers to fully stabilize...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("\nRunning E2E tests...\n");

    const scriptDir = __dirname;
    const rootDir = path.resolve(scriptDir, "../..");

    const defaultFeatureGlob = "../features/**/*.feature";
    const hasCliFeaturePath = cucumberArgsFromCli.some((a) =>
      a.endsWith(".feature"),
    );

    // Run cucumber-js directly via Node to ensure the CLI and support-code use the same
    // @cucumber/cucumber installation (avoids "invalid installation (status: PENDING)" issues).
    const cucumberMain = requireFromHere.resolve("@cucumber/cucumber");
    const findUp = (startDir: string, fileName: string) => {
      let dir = startDir;
      for (;;) {
        const candidate = path.join(dir, fileName);
        if (fs.existsSync(candidate)) {
          return dir;
        }
        const parent = path.dirname(dir);
        if (parent === dir) {
          return null;
        }
        dir = parent;
      }
    };
    const cucumberPkgRoot =
      findUp(path.dirname(cucumberMain), "package.json") ||
      path.dirname(cucumberMain);

    const cucumberBinCandidates = [
      path.join(cucumberPkgRoot, "bin", "cucumber-js"),
      path.join(cucumberPkgRoot, "bin", "cucumber-js.js"),
      path.join(cucumberPkgRoot, "bin", "cucumber.js"),
    ];
    const cucumberBin = cucumberBinCandidates.find((p) => fs.existsSync(p));
    if (!cucumberBin) {
      throw new Error(
        `Could not locate cucumber-js binary. Looked in:\n${cucumberBinCandidates.join(
          "\n",
        )}`,
      );
    }

    // Use `yarn exec cucumber-js` so the binary and step-definitions share the same
    // resolved @cucumber/cucumber installation.
    const testProcess = spawn(
      "yarn",
      [
        "exec",
        "cucumber-js",
        "--require-module",
        "ts-node/register",
        "--require",
        "tests/e2e/step-definitions/**/*.ts",
        "--require",
        "tests/e2e/support/**/*.ts",
        "--format",
        "progress-bar",
        "--format",
        "json:tests/reports/cucumber-report.json",
        "--format",
        "html:tests/reports/cucumber-report.html",
        "--exit",
        ...cucumberArgsFromCli,
        ...(hasCliFeaturePath ? [] : [defaultFeatureGlob]),
      ],
      {
        cwd: rootDir,
        stdio: "inherit",
        shell: true,
        env: {
          ...process.env,
          TS_NODE_PROJECT: "tests/tsconfig.json",
        },
      },
    );

    exitCode = await new Promise<number>((resolve) => {
      testProcess.on("close", (code) => {
        resolve(code || 0);
      });

      testProcess.on("error", (error) => {
        console.error("Test process error:", error);
        resolve(1);
      });
    });
  } catch (error) {
    console.error("Test runner error:", error);
    exitCode = 1;
  } finally {
    await stopServers();
  }

  process.exit(exitCode);
}

// Run if called directly
if (require.main === module) {
  runTests();
}

export { runTests };
