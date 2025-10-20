Turn Your Codebase into an LLM Prompt with code2prompt
Ever tried feeding an entire codebase to an LLM like ChatGPT or Claude, only to spend hours manually copying files, structuring context, and counting tokens? code2prompt automates all that—turning your project into a clean, templated prompt with a file tree, syntax-highlighted code, and token tracking.

It’s a CLI tool (with Python SDK and server options) designed to streamline AI-assisted coding, debugging, and documentation. No more copy-pasting files into a chat window.

What It Does
code2prompt
scans your project directory, builds a structured overview of your codebase, and formats it into a single, LLM-ready prompt. Key features:

File tree generation: Shows the project structure before dumping the actual code.
Smart filtering: Respects
.gitignore
and supports glob patterns to exclude files (e.g.,
node_modules
).
Token counting: Avoids context window overflows by estimating token usage upfront.
Templating: Customize prompts using Handlebars (e.g., add instructions, focus on specific files).
Git integration: Optionally include
git diff
or branch comparisons for change-aware context.
The output is copied to your clipboard by default, ready to paste into any LLM chat.

Why It’s Cool
No more manual stitching: It handles the tedious work of formatting code snippets, adding line numbers, and organizing files logically.
Flexible for workflows: Use it for debugging ("Explain this error in context"), refactoring ("Suggest improvements"), or onboarding ("Summarize this codebase").
Extensible: The Rust core can be integrated into other tools, and the Python SDK makes it usable in AI agent pipelines.
Privacy-first: Runs locally—no uploading your code to third-party servers.
How to Try It
Install via Cargo (Rust) or Homebrew:

# Cargo
cargo install code2prompt

# Homebrew
brew install code2prompt
Or use the Python SDK:

pip install code2prompt-rs
Then run it in your project directory:

code2prompt . --output prompt.txt
Check the docs for advanced options like custom templates or token limits.

Final Thoughts
This is one of those tools that feels obvious after it exists. If you regularly use LLMs for coding,
code2prompt
eliminates a frustrating bottleneck. It’s not magic—you still need to craft good prompts—but it removes the grunt work of context assembly.

I’d love to see IDE plugins or deeper LLM integrations (imagine a VS Code extension that auto-generates prompts for the selected code). For now, it’s a solid CLI utility that does one thing well.
