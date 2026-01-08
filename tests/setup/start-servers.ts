import { ChildProcess, exec, spawn } from "child_process";
import * as http from "http";
import * as net from "net";
import * as path from "path";
import { promisify } from "util";

const sleep = promisify(setTimeout);
const execAsync = promisify(exec);

interface ServerProcess {
  process: ChildProcess;
  name: string;
  port: number;
  url: string;
}

const servers: ServerProcess[] = [];

/**
 * Check if a port is available
 */
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.once("close", () => resolve(true));
      server.close();
    });
    server.on("error", () => resolve(false));
  });
}

/**
 * Find an available port starting from the given port
 */
async function findAvailablePort(
  startPort: number,
  maxAttempts = 10,
): Promise<number> {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i;
    const available = await isPortAvailable(port);
    if (available) {
      return port;
    }
  }
  throw new Error(
    `Could not find an available port starting from ${startPort} after ${maxAttempts} attempts`,
  );
}

/**
 * Check if a server is ready by making an HTTP request and verifying it returns a valid response
 */
async function waitForServer(url: string, timeout = 60000): Promise<boolean> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(url, (res) => {
          // Check for valid status code (200-499 means server is responding)
          if (res.statusCode && res.statusCode < 500) {
            resolve();
          } else {
            reject(new Error(`Server returned status ${res.statusCode}`));
          }
        });
        req.on("error", (err: any) => {
          if (err.code === "ECONNREFUSED") {
            reject(new Error("Server not ready"));
          } else {
            reject(err);
          }
        });
        req.setTimeout(5000, () => {
          req.destroy();
          reject(new Error("Request timeout"));
        });
      });

      // For frontend, also verify it can actually serve a page
      const frontendPort = process.env.TEST_FRONTEND_PORT || "3000";
      if (url.includes(`localhost:${frontendPort}`)) {
        // Try to verify the server is actually ready by checking if it can serve the homepage
        // Wait to ensure Next.js has finished compiling
        await sleep(2000);
        try {
          await new Promise<void>((resolve, reject) => {
            const req = http.get(url, (res) => {
              // If we get a response, server is ready
              resolve();
            });
            req.on("error", reject);
            req.setTimeout(5000, () => {
              req.destroy();
              reject(new Error("Request timeout"));
            });
          });
        } catch {
          await sleep(1000);
          continue;
        }
      }

      return true;
    } catch (error) {
      await sleep(1000);
    }
  }

  return false;
}

/**
 * Check if a server is already running
 */
async function isServerRunning(url: string, retries = 3): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(url, { timeout: 5000 }, (res) => {
          // Any response means server is running
          resolve();
        });
        req.on("error", (err: any) => {
          // ECONNREFUSED means server is not running
          if (err.code === "ECONNREFUSED") {
            reject(new Error("Server not running"));
          } else {
            reject(err);
          }
        });
        req.on("timeout", () => {
          req.destroy();
          reject(new Error("Request timeout"));
        });
      });
      return true;
    } catch (error: any) {
      if (i === retries - 1 || error.message === "Server not running") {
        return false;
      }
      // Wait a bit before retrying
      await sleep(1000);
    }
  }
  return false;
}

/**
 * Start Mockoon server via docker-compose
 */
async function startMockoon(): Promise<ServerProcess | null> {
  const mockoonUrl = "http://localhost:3001";

  // Check if already running
  const alreadyRunning = await isServerRunning(mockoonUrl);
  if (alreadyRunning) {
    console.log("✓ Mockoon API is already running");
    return null;
  }

  console.log("Starting Mockoon API via docker-compose...");

  const scriptDir = __dirname;
  const rootDir = path.resolve(scriptDir, "../..");

  process.env.MOCKOON_STARTED = "true";

  // Start Mockoon via docker-compose
  // On Windows, we need shell to find docker-compose in PATH
  const dockerComposeProcess = spawn(
    "docker-compose",
    ["up", "-d", "mockoon-api"],
    {
      cwd: rootDir,
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
      windowsHide: true,
    },
  );

  // Capture output to detect startup errors
  let dockerOutput = "";
  if (dockerComposeProcess.stderr) {
    dockerComposeProcess.stderr.on("data", (data) => {
      const output = data.toString();
      dockerOutput += output;
    });
  }

  if (dockerComposeProcess.stdout) {
    dockerComposeProcess.stdout.on("data", (data) => {
      const output = data.toString();
      dockerOutput += output;
    });
  }

  // Handle process errors
  dockerComposeProcess.on("error", (error) => {
    console.error(`Failed to start Mockoon: ${error.message}`);
    throw error;
  });

  // Wait for docker-compose to finish
  await new Promise<void>((resolve, reject) => {
    dockerComposeProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`docker-compose failed with code ${code}`));
      }
    });
  });

  // Wait for Mockoon to be ready
  console.log("Waiting for Mockoon API to be ready...");
  const mockoonReady = await waitForServer(mockoonUrl, 120000);

  if (!mockoonReady) {
    const tail =
      dockerOutput.length > 5000 ? dockerOutput.slice(-5000) : dockerOutput;
    throw new Error(
      `Mockoon API failed to start.\n\nLast output:\n${tail}`.trim(),
    );
  }

  console.log("✓ Mockoon API is ready");

  return null;
}

/**
 * Start frontend server (Next.js)
 */
async function startFrontend(): Promise<ServerProcess | null> {
  // Find an available port starting from 3000
  const port = await findAvailablePort(3000);
  const url = `http://localhost:${port}`;

  // Check if server is already running on this port
  const alreadyRunning = await isServerRunning(url, 5);
  if (alreadyRunning) {
    console.log(`✓ Frontend (Next.js) is already running on port ${port}`);
    // Store port in environment variable for tests to use
    process.env.TEST_FRONTEND_PORT = port.toString();
    return null;
  }

  console.log(`Starting frontend (Next.js dev server) on port ${port}...`);

  // Get root directory - use __dirname to get the script's directory
  const scriptDir = __dirname;
  const rootDir = path.resolve(scriptDir, "../..");

  // Start frontend with the selected port
  // Use shell: false on Unix, but on Windows we need shell for yarn to be found
  const frontendProcess = spawn("yarn", ["dev"], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    shell: process.platform === "win32",
    detached: false,
    windowsHide: true,
    env: {
      ...process.env,
      PORT: port.toString(),
    },
  });

  // Store port in environment variable for tests to use
  process.env.TEST_FRONTEND_PORT = port.toString();

  // Capture both stdout and stderr to detect startup errors
  let frontendOutput = "";
  let frontendError = "";

  if (frontendProcess.stdout) {
    frontendProcess.stdout.on("data", (data) => {
      const output = data.toString();
      frontendOutput += output;
      // Log all output for debugging
      process.stdout.write(output);
    });
  }

  if (frontendProcess.stderr) {
    frontendProcess.stderr.on("data", (data) => {
      const output = data.toString();
      frontendError += output;
      frontendOutput += output;
      // Log all errors
      process.stderr.write(output);
    });
  }

  // Handle process errors
  frontendProcess.on("error", (error) => {
    console.error(`Failed to start frontend: ${error.message}`);
    throw error;
  });

  // Monitor stderr for port already in use error
  let portInUse = false;
  const currentPort = port;
  if (frontendProcess.stderr) {
    const errorHandler = (data: Buffer) => {
      const output = data.toString();
      if (
        output.includes("EADDRINUSE") ||
        output.includes("address already in use")
      ) {
        portInUse = true;
        console.log(
          `Port ${currentPort} is in use, checking if server is already running...`,
        );
        // Check if server is actually running on this port
        isServerRunning(url).then((running) => {
          if (running) {
            console.log(
              `✓ Frontend (Next.js) is already running on port ${currentPort}`,
            );
            frontendProcess.kill();
          }
        });
      }
    };
    frontendProcess.stderr.on("data", errorHandler);
  }

  // Wait for frontend to be ready
  console.log("Waiting for frontend to be ready...");

  // Set up exit handler to capture exit code
  let exitCode: number | null = null;
  frontendProcess.on("exit", (code) => {
    exitCode = code;
  });

  // Give process time to start or fail
  await sleep(3000);

  // Check if process exited (might have failed due to port in use)
  if (exitCode !== null || frontendProcess.exitCode !== null) {
    const actualExitCode = exitCode ?? frontendProcess.exitCode;
    // Process exited - wait a moment and check if server is actually running
    // Sometimes the server takes a moment to fully start
    await sleep(2000);
    const running = await isServerRunning(url, 5);
    if (running) {
      console.log(
        `✓ Frontend (Next.js) is already running on port ${currentPort}`,
      );
      return null;
    }

    // Process exited but server is not running
    if (portInUse) {
      console.log(
        `Port ${currentPort} is in use, waiting a bit longer to verify server is running...`,
      );
      await sleep(5000);
      const runningAgain = await isServerRunning(url, 5);
      if (runningAgain) {
        console.log(
          `✓ Frontend (Next.js) is already running on port ${currentPort}`,
        );
        return null;
      }

      console.warn(
        `Warning: Port ${currentPort} is in use but server check failed. Assuming server is running and continuing...`,
      );
      return null;
    }
    await sleep(1000);
    const errorTail =
      frontendOutput.length > 2000
        ? frontendOutput.slice(-2000)
        : frontendOutput;
    throw new Error(
      `Frontend server exited with code ${actualExitCode}\n\nLast output:\n${errorTail}`,
    );
  }

  // If port is in use, check if server is actually running
  if (portInUse) {
    const running = await isServerRunning(url);
    if (running) {
      frontendProcess.kill();
      console.log(
        `✓ Frontend (Next.js) is already running on port ${currentPort}`,
      );
      return null; // Server is already running
    }
  }

  const frontendReady = await waitForServer(url, 60000);

  if (!frontendReady) {
    // Check if process exited while we were waiting
    if (frontendProcess.exitCode !== null) {
      if (portInUse) {
        // Port was in use, check one more time if server is running
        const running = await isServerRunning(url);
        if (running) {
          console.log(
            `✓ Frontend (Next.js) is already running on port ${currentPort}`,
          );
          return null;
        }
      }
      throw new Error(
        `Frontend server exited with code ${frontendProcess.exitCode}`,
      );
    }
    frontendProcess.kill();
    const errorTail =
      frontendOutput.length > 2000
        ? frontendOutput.slice(-2000)
        : frontendOutput;
    throw new Error(
      `Frontend server failed to start - server not responding\n\nLast output:\n${errorTail}`,
    );
  }

  console.log(`✓ Frontend server is ready on port ${currentPort}`);

  return {
    process: frontendProcess,
    name: "frontend",
    port: currentPort,
    url: url,
  };
}

/**
 * Verify server is actually ready by making a real request
 */
async function verifyServerReady(url: string, retries = 5): Promise<boolean> {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(url, { timeout: 5000 }, (res) => {
          if (res.statusCode && res.statusCode < 500) {
            resolve();
          } else {
            reject(new Error(`Server returned status ${res.statusCode}`));
          }
        });
        req.on("error", (err: any) => {
          if (err.code === "ECONNREFUSED") {
            reject(new Error("Server not ready"));
          } else {
            reject(err);
          }
        });
        req.on("timeout", () => {
          req.destroy();
          reject(new Error("Request timeout"));
        });
      });
      return true;
    } catch (error) {
      if (i < retries - 1) {
        await sleep(2000);
      }
    }
  }
  return false;
}

/**
 * Start all servers
 */
export async function startServers(): Promise<void> {
  try {
    await startMockoon();

    const frontend = await startFrontend();
    if (frontend) {
      servers.push(frontend);
    }

    // Verify servers are ready
    console.log("Verifying servers are ready...");
    const mockoonReady = await verifyServerReady("http://localhost:3001");
    const frontendPort = process.env.TEST_FRONTEND_PORT || "3000";
    const frontendUrl = `http://localhost:${frontendPort}`;
    const frontendReady = await verifyServerReady(frontendUrl);

    if (!mockoonReady) {
      throw new Error("Mockoon API server is not responding");
    }
    if (!frontendReady) {
      throw new Error("Frontend server is not responding");
    }

    console.log("All servers are ready!");
  } catch (error) {
    console.error("Failed to start servers:", error);
    await stopServers();
    throw error;
  }
}

/**
 * Stop all servers
 */
export async function stopServers(): Promise<void> {
  if (servers.length === 0) {
    return;
  }

  console.log("Stopping servers...");

  const pidExists = (pid: number): boolean => {
    try {
      // Signal 0 doesn't actually kill; it just checks existence/permissions
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  };

  const waitForPidExit = async (pid: number, timeoutMs = 15000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (!pidExists(pid)) {
        return;
      }
      await sleep(250);
    }
    throw new Error(`Timed out waiting for pid ${pid} to exit`);
  };

  for (const server of servers) {
    try {
      if (server.process && !server.process.killed && server.process.pid) {
        console.log(`Stopping ${server.name}...`);

        // Kill the process and all its children
        const pid = server.process.pid;
        if (process.platform === "win32") {
          // On Windows, use taskkill to kill the process tree and await completion
          try {
            await execAsync(`taskkill /pid ${pid} /f /t`);
          } catch {
            // Fallback to direct kill (may not kill children)
            try {
              server.process.kill("SIGTERM");
            } catch {
              // ignore
            }
          }
        } else {
          try {
            // On Unix, kill the process group
            process.kill(-pid, "SIGTERM");
          } catch {
            // If killing process group fails, try killing the process directly
            server.process.kill("SIGTERM");
          }
        }

        // Ensure the process is actually gone (and force-kill if needed)
        try {
          await waitForPidExit(pid, 15000);
        } catch {
          try {
            if (process.platform === "win32") {
              await execAsync(`taskkill /pid ${pid} /f /t`);
            } else {
              server.process.kill("SIGKILL");
            }
          } catch {
            // ignore
          }

          try {
            await waitForPidExit(pid, 5000);
          } catch {
            // ignore
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to stop ${server.name}:`, error);
    }
  }

  // Stop Mockoon docker container if it was started by the script
  if (servers.length > 0 || process.env.MOCKOON_STARTED === "true") {
    const scriptDir = __dirname;
    const rootDir = path.resolve(scriptDir, "../..");

    try {
      console.log("Stopping Mockoon API...");
      await execAsync("docker-compose stop mockoon-api", {
        cwd: rootDir,
      });
    } catch {
      // Ignore errors when stopping docker container
    }
  }

  servers.length = 0;
  console.log("Servers stopped");
}

// Handle process termination
process.on("SIGINT", async () => {
  await stopServers();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await stopServers();
  process.exit(0);
});
