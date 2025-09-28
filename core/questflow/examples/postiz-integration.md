# Postiz Integration Example

This example demonstrates how to use the Postiz integration with QuestFlow to manage social media content.

## Prerequisites

1. Postiz account with API key
2. QuestFlow platform installed and running

## Configuration

First, configure your Postiz API key in `config/default.json`:

```json
{
  "integration": {
    "postiz": {
      "apiKey": "YOUR_POSTIZ_API_KEY",
      "baseUrl": "https://api.postiz.com/v1"
    }
  }
}
```

## Running the Example

Start the QuestFlow server:

```bash
bun run dev
```

## API Usage Examples

### Create a Social Media Post

```bash
curl -X POST http://localhost:3001/api/social/posts \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello, world! This is a test post from QuestFlow integration with Postiz 🚀",
    "platforms": ["twitter", "facebook"]
  }'
```

### Schedule a Social Media Post

```bash
curl -X POST http://localhost:3001/api/social/posts/schedule \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Scheduled post for tomorrow! 📅",
    "platforms": ["twitter", "linkedin"],
    "scheduleTime": "2023-12-31T12:00:00Z"
  }'
```

### Get Connected Accounts

```bash
curl -X GET http://localhost:3001/api/social/accounts
```

### List Posts

```bash
curl -X GET "http://localhost:3001/api/social/posts?limit=5&offset=0"
```

## Using the Social Media Manager Agent

You can also use the specialized social media manager agent defined in `agents/specialized/social-media-manager.json`:

```javascript
import { QuestFlowOrchestrator } from '../src/orchestrator.js';
import fs from 'fs';

// Load configuration
const config = JSON.parse(fs.readFileSync('./config/default.json', 'utf8'));
const orchestrator = new QuestFlowOrchestrator(config);

// Create a post using the orchestrator
const result = await orchestrator.createSocialMediaPost(
  "Check out our new AI workflow automation platform! #AI #Automation",
  ["twitter", "linkedin"]
);

console.log(result);
```

## Workflow Example

Create a social media campaign workflow using the template in `workflows/templates/social-media-campaign.json`:

```bash
curl -X POST http://localhost:3001/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "template": "social-media-campaign",
    "parameters": {
      "campaign_topic": "AI Workflow Automation",
      "platforms": ["twitter", "linkedin"],
      "posting_schedule": "weekly",
      "campaign_name": "Q4 AI Campaign"
    }
  }'
```

## Error Handling

The integration includes proper error handling for common issues:

1. **Invalid API Key**: Returns appropriate error message
2. **Network Issues**: Retries with exponential backoff
3. **Rate Limiting**: Handles Postiz API rate limits
4. **Platform Errors**: Provides detailed error information

## Best Practices Demonstrated

1. **Configuration Management**: API keys stored securely in config
2. **Error Handling**: Comprehensive error handling and logging
3. **Modular Design**: Separate manager class for Postiz operations
4. **Testing**: Unit tests for all Postiz integration functions
5. **Documentation**: Complete API documentation and examples

This integration allows you to seamlessly manage your social media presence through the QuestFlow platform while leveraging the powerful features of Postiz.