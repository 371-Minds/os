Quickstart with Nx https://nx.dev/getting-started  https://github.com/nrwl/nx?utm_source=nx.dev

Nx Quickstart

Get up and running with Nx in just a few minutes by following these simple steps.

Install the Nx CLI
Installing Nx globally is optional - you can use ["npx"] to run Nx commands without installing it globally, especially if you're working with Node.js projects.

However, if you prefer a global installation, here are some options:

npm
Homebrew (macOS, Linux)
Chocolatey (Windows)
apt (Ubuntu)

["choco install nx"]

Start fresh or add to existing project
For JavaScript-based projects you can start with a new workspace using the following command:

["npx create-nx-workspace@latest"]

Add to an existing project: (recommended also for non-JS projects)

["npx nx@latest init"]

Get the complete experience: For a fully integrated development workflow with AI-powered CI features, start directly from Nx Cloud.

Learn more: Start New Project • Add to Existing • Complete Nx Experience

Run Your First Commands
Nx provides powerful task execution with built-in caching. Here are some essential commands:

Run a task for a single project:

["nx build my-app"]

["nx test my-lib"]

Run tasks for multiple projects:

["nx run-many -t build test lint"]

Learn more: Run Tasks • Cache Task Results

Quickstart Guides
Install the Nx CLI - Installing Nx globally is optional. Start fresh or add to existing project - For JavaScript-based projects you can start with a new workspace using the following command: npx create-nx-workspace@latest. Run Your First Commands - Nx provides powerful task execution with built-in caching. Here are some essential commands: nx build my-app, nx test my-lib, nx run-many -t build test lint.
