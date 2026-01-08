import { exec } from "child_process";
import * as os from "os";
import * as path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

const reportPath = path.join(__dirname, "../reports/cucumber-report.html");

// Cross-platform command to open file
const platform = os.platform();
let command: string;

if (platform === "win32") {
  // Windows
  command = `start "" "${reportPath}"`;
} else if (platform === "darwin") {
  // macOS
  command = `open "${reportPath}"`;
} else {
  // Linux and others
  command = `xdg-open "${reportPath}"`;
}

execAsync(command)
  .then(() => {
    console.log(`✓ Opening cucumber report: ${reportPath}`);
  })
  .catch((error) => {
    console.error(`Failed to open report: ${error.message}`);
    console.log(`Report location: ${reportPath}`);
    process.exit(1);
  });
