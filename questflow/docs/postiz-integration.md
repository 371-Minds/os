# Postiz Integration Guide

## Overview

This guide explains how to integrate Postiz with the QuestFlow platform. Postiz is a social media management platform that allows you to schedule posts, generate content with AI, and manage multiple social media accounts from a single interface.

## Prerequisites

1. Postiz account and API key
2. QuestFlow platform installed and running
3. Bun package manager installed

## Configuration

### 1. Update Configuration File

Add your Postiz API key to `config/default.json`:

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

## Core Integration Components

### Postiz Manager (`src/agents/postiz-manager.js`)

The Postiz manager provides functions for:
- Creating social media posts
- Scheduling posts for future publication
- Retrieving connected social media accounts
- Listing existing posts

### C-Suite Coordinator Integration

The C-Suite coordinator has been extended with social media management capabilities:
- Create social media posts
- Schedule posts for future publication
- Retrieve connected accounts

### Orchestrator Integration

The orchestrator has been extended with social media management capabilities:
- Create social media posts
- Schedule posts for future publication
- Retrieve connected accounts
- List existing posts

## API Endpoints

### Create Social Media Post

```http
POST /api/social/posts
Content-Type: application/json

{
  "content": "Your social media post content",
  "platforms": ["twitter", "facebook", "linkedin"]
}
```

### Schedule Social Media Post

```http
POST /api/social/posts/schedule
Content-Type: application/json

{
  "content": "Your scheduled social media post content",
  "platforms": ["twitter", "facebook", "linkedin"],
  "scheduleTime": "2023-12-31T12:00:00Z"
}
```

### Get Connected Social Media Accounts

```http
GET /api/social/accounts
```

### List Social Media Posts

```http
GET /api/social/posts?limit=10&offset=0
```

## Agent Configuration

A specialized social media manager agent has been created in `agents/specialized/social-media-manager.json` with the following capabilities:

- Content creation
- Social media scheduling
- Audience engagement analysis
- Analytics reporting

## Workflow Integration

### Social Media Campaign Workflow

QuestFlow can orchestrate social media campaigns using the Postiz integration:

1. **Content Creation**: Generate engaging content using AI
2. **Platform Selection**: Choose appropriate platforms for the content
3. **Scheduling**: Schedule posts for optimal engagement times
4. **Monitoring**: Track engagement and performance metrics
5. **Reporting**: Generate reports on campaign performance

## Best Practices

### 1. Content Strategy

- Tailor content to each platform's audience
- Use relevant hashtags for discoverability
- Include engaging visuals when possible
- Maintain consistent brand voice

### 2. Scheduling Strategy

- Schedule posts during peak engagement hours
- Maintain consistent posting frequency
- Consider time zones for global audiences
- Plan content themes and campaigns

### 3. Error Handling

Implement robust error handling that accounts for:

- API rate limiting
- Invalid API keys
- Network connectivity issues
- Platform-specific restrictions

## Testing

### Unit Tests

Run unit tests for integration components:

```bash
bun test:unit
```

### Integration Tests

Run integration tests that interact with Postiz:

```bash
bun test:integration
```

## Deployment

### Development Environment

1. Set up Postiz account and obtain API key
2. Configure QuestFlow with Postiz API key
3. Run integration tests

### Production Environment

1. Use production Postiz API key
2. Configure appropriate error handling and logging
3. Set up monitoring and alerting

## Troubleshooting

### Common Issues

1. **Invalid API Key**: Verify API key in configuration
2. **Rate Limiting**: Implement exponential backoff for requests
3. **Platform Errors**: Check platform-specific restrictions
4. **Network Issues**: Verify connectivity to Postiz API

### Debugging

Enable debug logging to troubleshoot integration issues:

```bash
DEBUG=questflow:* bun run dev
```

## Extending the Integration

### Custom Workflows

Create custom workflows that leverage the Postiz integration by combining social media management with other QuestFlow capabilities.

### Advanced Features

Implement advanced features such as:
- AI-powered content generation
- Engagement analytics and insights
- Automated scheduling based on optimal times
- Cross-platform campaign coordination