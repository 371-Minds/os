📘 Developer Guide – Spec-Driven Nx + Akash System for QuestFlow Dev Team

📚 Developer Guide – Spec-Driven Nx + Akash System for QuestFlow Dev Team

**Note**: This guide covers the legacy QuestFlow dev-team workspace. For new agent development, consider using the 371 OS unified architecture with agent definitions in `../../os-workspace/libs/prompts/agent-definitions/` and implementations in `../../os-workspace/apps/`. See the [Chief of Staff Agent (Ortega)](../../os-workspace/apps/chief-of-staff-agent/) for an example.

1. Core Idea

This repo is spec-driven.
Everything starts from:

specs/openapi.yaml → defines API contract.

specs/tasks.feature → defines expected behaviors (BDD).

Agents (like code-mern, code-t3, qa, deploy) consume these specs to generate, test, or deploy code.

2. Repo Layout
apps/
  api/                # QuestFlow API (Express + MongoDB)
  agents/
    code-mern/        # AI coder for MERN stack
    code-t3/          # AI coder for T3 stack
    qa/               # QA agent (tests specs)
    deploy/           # Deploy agent (Akash deploys)

libs/
  agents-core/        # Shared utils (logger, config, Akash, Mongo, AI)

specs/
  openapi.yaml        # API contract
  tasks.feature       # BDD scenarios

docker/
  deploy.yaml         # Base Akash deployment
  profiles/           # Resource profiles (minimal, standard, high)

config.*.yaml/json    # Env configs
config.schema.json    # Validation rules

3. Agents
Code-MERN Agent

Reads: specs/openapi.yaml

Action: Generates MERN routes/tests.

Code-T3 Agent

Reads: specs/tasks.feature

Action: Generates T3 stack (Next.js/Prisma) features.

QA Agent

Reads: config.*, specs/openapi.yaml, specs/tasks.feature

Action: Runs tests:

Biome (unit tests for agents/libs, fast).

Bun Test + Supertest (integration tests for API).

Cucumber (executes tasks.feature).

Modes:

qaUseMocks: true → uses mongo-mock.ts + akash-mock.ts.

qaUseMocks: false → runs against live services.

Deploy Agent

Reads: config.*, docker/deploy.yaml, docker/profiles/*.yaml

Action:

If env=test → simulate deploy (akash-mock.ts).

If env=staging → real deploy with minimal profile.

If env=production → real deploy with high profile.

4. Config System

All agents and API call loadConfig() from agents-core/config.ts.

Supported sources:

process.env

config.yaml / config.json

Environment-specific: config.test.yaml, config.staging.yaml, config.production.yaml

Validation:

Uses config.schema.json (Ajv).

Required: env + optional mongoUri, dbName, akashWallet, akashProfile.

Example config.staging.yaml
env: staging
mongoUri: mongodb://mongo:27017
dbName: questflow_staging
akashWallet: staging-wallet
akashProfile: minimal
qaUseMocks: false

5. Akash Profiles

Located in docker/profiles/.

minimal.yaml → cheap staging (0.1 CPU, 0.25Gi RAM).

standard.yaml → normal dev/prod (0.5 CPU, 1Gi RAM).

high.yaml → production (2 CPU, 4Gi RAM).

Deploy Agent merges base deploy.yaml with the profile.

6. CI/CD Workflow
Pipeline Steps

Lint + Unit Tests → bun nx run-many -t lint test --all

Integration Tests (API) → bun nx test api

OpenAPI Validation → bun swagger-cli validate specs/openapi.yaml

BDD Tests → bun cucumber-js specs/tasks.feature --require tests/bdd

Deploy:

test → Deploy Agent in mock mode.

staging → Deploy Agent with minimal profile.

production → Deploy Agent with high profile (manual approval required).

Deployment Promotion Flow

Test → auto

Staging → auto

Production → requires GitHub approval (production environment protection).

7. Commands for Agents
Run API (dev)
NODE_ENV=development bun nx serve api

Run QA Agent (mock mode for CI)
QA_USE_MOCKS=true NODE_ENV=test bun nx serve qa-agent

Run Deploy Agent (staging)
NODE_ENV=staging bun nx serve deploy-agent

Run Deploy Agent (production)
NODE_ENV=production bun nx serve deploy-agent

8. Key Guarantees

Config-validated → if config.* fails schema, system won't run.

Mocks in CI → fast, isolated test runs (no real Mongo/Akash).

Staging deploys cheap → minimal profile saves tokens.

Production deploys gated → requires manual approval.

Spec is truth → agents, API, QA, Deploy all reference same OpenAPI + BDD specs.

✅ This doc is designed so your AI coder agents know:

Where specs/configs live.

Which files to consume.

Which commands to run.

What guarantees/tests are enforced.

## Migration to Unified Architecture

For new agents, consider the 371 OS unified architecture:
- **Agent "Brain"**: Define in `../../os-workspace/libs/prompts/agent-definitions/agent-name.yml`
- **Agent "Body"**: Implement in `../../os-workspace/apps/agent-name/`
- **Benefits**: Better separation of concerns, centralized agent definitions, improved maintainability
- **Example**: See the Chief of Staff Agent (Ortega) implementation

Akash Code-Server
Need to install  F:\os-main\questflow\dev-team\akash-console-server

 
 

👉 Next steps could be adding a rollback job (using Deploy Agent with last good config) to auto-revert production on failure.