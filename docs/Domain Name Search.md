What is Does
You give it some keywords, optionally add prefixes, suffixes, or TLDs. Then it checks what’s available.

$ tldx google
❌ google.com is not available
$ tldx openai -p get,use -s ly,hub -t com,io,ai --only-available
✔️ getopenaily.com is available
✔️ useopenaihub.io is available
   ...
Features
Keyword-based domain permutations (prefixes, suffixes, TLDs)
Fast and concurrent RDAP availability checks
Streams results as they’re found
Optional filtering by domain length
Great for technical founders, indie hackers, and naming brainstorms
Usage
Usage:
  tldx [keywords] [flags]
  tldx [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  version     Print the version

Flags:
  -h, --help                    help for tldx
  -m, --max-domain-length int   Maximum length of domain name (default 64)
  -a, --only-available          Show only available domains
  -p, --prefixes strings        Prefixes to add (e.g. get,my,use)
      --show-stats              Show statistics
  -s, --suffixes strings        Suffixes to add (e.g. ify,ly)
  -t, --tlds strings            TLDs to check (e.g. com,io,ai)
  -v, --verbose                 Show verbose output
More Examples
Checking Domain Availability

$ tldx google
❌ google.com is not available
$ tldx google youtube reddit
  ❌ reddit.com is not available
  ❌ google.com is not available
  ❌ youtube.com is not available
Permutations
This permutates the keywords with the specified prefixes, suffixes, and TLDs, checking for availability:

$ tldx google --prefixes get,my --suffixes ly,hub --tlds com,io,ai
  ✔️  mygooglely.com is available
  ✔️  getgooglely.ai is available
  ❌ mygoogle.ai is not available
  ...
Show Only Available Domains
$ tldx google reddit facebook -p get,my -s ly,hub -t com,io,ai --only-available
  ✔️  getgooglely.ai is available
  ✔️  getreddithub.com is available
  ✔️  getreddit.ai is available
  ✔️  googlely.ai is available
  ✔️  getredditly.com is available
  ✔️  facebookly.io is available
  ...
Installation
macOS / Linux (Homebrew)
brew install brandonyoungdev/tldx/tldx
or

brew tap brandonyoungdev/tldx
brew install tldx
Linux and Windows (Manual)
Visit the Releases page.

Download the archive for your OS and architecture:

macOS / Linux: tldx_<version>_<os>_<arch>.tar.gz

Windows: tldx_<version>_windows_<arch>.zip

Extract the binary and move it to a directory in your $PATH:

# Example for Linux/macOS
tar -xzf tldx_<version>_<os>_<arch>.tar.gz
mv tldx /usr/local/bin/
Go (Install from Source)
go install github.com/brandonyoungdev/tldx@latest
