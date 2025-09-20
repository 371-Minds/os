# QuestFlow Agents with Full Backstories

This directory contains enhanced QuestFlow agents with comprehensive backstories, similar to ElizaOS agents. Each agent includes detailed biographical information, lore, knowledge domains, and communication styles.

**Note**: As part of the 371 OS unified architecture, new agents should follow the brain/body separation pattern:
- **Agent "Brain"**: Defined in `os-workspace/libs/prompts/agent-definitions/` as YAML files
- **Agent "Body"**: Implemented as dedicated Nx applications in `os-workspace/apps/`

For examples of the new unified architecture, see the [Chief of Staff Agent (Ortega)](../../os-workspace/apps/chief-of-staff-agent/) implementation.

## Agent Structure

Each agent JSON file includes:

- **Basic Information**: name, role, description
- **Provider Details**: provider, model, parameters
- **Backstory Elements**: bio, lore, knowledge
- **Communication Style**: messageExamples, postExamples, style
- **Expertise**: topics, adjectives, capabilities
- **Functionality**: instructions, plugins
- **Blockchain Integration**: decentralized identity and reputation

## Template

Use the `templates/agent-backstory-template.json` as a starting point for creating new agents with full backstories.

## Benefits of Full Backstories

1. **Enhanced Context**: Agents understand their role and responsibilities more deeply
2. **Consistent Personality**: Standardized communication style and tone
3. **Domain Expertise**: Clear knowledge boundaries and specializations
4. **Better Interaction**: Improved examples for training and demonstration
5. **Blockchain Identity**: Integrated decentralized identification and reputation

## Creating New Agents

### Legacy QuestFlow Agents (JSON Format)
1. Copy the template: `cp templates/agent-backstory-template.json core/new-agent-name.json`
2. Customize all fields with agent-specific information
3. Ensure blockchain DID is unique
4. Test the agent configuration for consistency

### New Unified Architecture Agents (Recommended)
1. Create agent "brain" in `os-workspace/libs/prompts/agent-definitions/agent-name.yml`
2. Generate agent "body" using: `bun nx generate @nx/node:application agent-name --directory=apps/agent-name`
3. Follow the pattern established by the [Chief of Staff Agent (Ortega)](../../os-workspace/apps/chief-of-staff-agent/)
4. Validate using the agent definition standards in project memory

## Directory Structure

- `core/` - Core C-Suite and essential agents
- `specialized/` - Agents with specific domain expertise
- `templates/` - Templates for creating new agents