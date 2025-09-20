# Chief of Staff Agent (Ortega)

This agent serves as the bridge between high-level strategic intent and formal governance in the 371 DAO.

## Function

The Chief of Staff Agent (Ortega) transforms Stratplans from the `bizbuilderprompts` repository into formal DAO proposals in both Markdown and JSON formats.

## Agent Definition

The agent's "brain" is defined in the centralized prompt library:
[`libs/prompts/agent-definitions/ortega_chief_of_staff.yml`](file:///f:/os-main/os-workspace/libs/prompts/agent-definitions/ortega_chief_of_staff.yml)

## Usage

```bash
# Build the agent
nx build chief-of-staff-agent

# Run the agent
nx serve chief-of-staff-agent

# Test the agent
nx test chief-of-staff-agent
```

## Implementation Status

- [x] Agent "brain" created in centralized prompt library
- [x] Agent "body" created as Nx application
- [ ] Implement core logic to process Stratplans
- [ ] Generate DAO proposals in Markdown and JSON formats
- [ ] Connect to bizbuilderprompts repository