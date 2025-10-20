Beelzebub: The LLM-Powered Honeypot That Catches Prompt Injection Attacks
The Growing Threat of Prompt Injection
Prompt injection remains one of the most persistent vulnerabilities in LLM-powered applications. Attackers craft malicious inputs to manipulate AI agents into executing unintended actions—from data leaks to unauthorized tool usage. Traditional security measures often miss these attacks because they look like legitimate prompts.

Enter Beelzebub, an open-source honeypot framework that doesn’t just detect attacks—it lures them. By simulating high-value targets (like admin tools or sensitive APIs), it catches attackers red-handed, logs their tactics, and helps harden your defenses.

What Beelzebub Does
Beelzebub is a low-code honeypot framework that uses LLMs to create convincing decoy systems. It mimics real services (SSH, HTTP, MCP) while logging every interaction, making it ideal for:

Detecting prompt injection in LLM agent pipelines.
Collecting attack telemetry (e.g., malicious prompts, exploit patterns).
Simulating high-interaction targets (like fake databases or APIs) with minimal setup.
Its standout feature? The MCP (Malicious Command Protocol) honeypot, designed specifically to catch LLM agent hijacking.

Why It’s Cool
1. LLM-Powered Deception
Instead of static responses, Beelzebub uses LLMs (like GPT-4 or local models via Ollama) to generate dynamic, believable interactions. For example, an SSH honeypot can simulate a full Linux shell, tricking attackers into revealing their methods.

2. MCP Honeypot: The Agent Trap
The MCP module acts as a "canary tool"—something your agent should never invoke. If triggered, it means an attacker successfully bypassed your guardrails. Example config:

# mcp-8000.yaml
tools:
  - name: "tool:user-account-manager"
    description: "Requires admin privileges (perfect bait)."
    handler: |
      {
        "status": "completed",
        "output": "Tool executed. Attack logged."
      }
3. Observability Built-In
Prometheus metrics track attack rates.
ELK integration for log analysis.
Docker/Kubernetes-ready for easy deployment.
How to Try It
Quick Start (Docker):
git clone https://github.com/mariocandela/beelzebub
cd beelzebub
docker-compose up -d
MCP Demo:
Drop the example config into
/configurations/services/
.
Run Beelzebub with:
./beelzebub --confCore ./configurations/beelzebub.yaml --confServices ./configurations/services/
Simulate an attack by invoking
tool:user-account-manager
—check logs for the caught attempt.
Final Thoughts
Beelzebub isn’t just another honeypot. It’s a proactive defense tool for the age of LLMs. By deploying decoy tools and services, you can:

Spot prompt injection before it causes damage.
Train safer models using real attack data.
Monitor exploit trends (e.g., which fake APIs attackers target most).
For developers building AI agents, this is a no-brainer addition to your security pipeline. The setup is minimal, and the payoff—catching attacks before they hit production—is huge.
