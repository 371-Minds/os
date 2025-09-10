# PostHog Integration for 371 OS

## Overview

The 371 OS includes comprehensive PostHog integration for user behavior tracking and analytics. This integration enables detailed insights into user interactions, session analytics, and cognitive state changes within the cognitive-aware interface system.

## Architecture

The PostHog integration consists of several key components:

1. **PostHog Service** - Core service for event tracking and user identification
2. **PostHog Configuration** - Environment-based configuration management
3. **PostHog Initialization** - Application startup integration
4. **Analytics Service Integration** - Integration with MongoDB-based analytics

## Configuration

### Environment Variables

The PostHog integration is configured through environment variables in your `.env` file:

```env
# PostHog Configuration (Optional)
POSTHOG_ENABLE=false
POSTHOG_API_KEY=your-posthog-api-key-here
POSTHOG_HOST=https://app.posthog.com
POSTHOG_FLUSH_AT=20
POSTHOG_FLUSH_INTERVAL=10000
```

### Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTHOG_ENABLE` | Enable/disable PostHog integration | `false` |
| `POSTHOG_API_KEY` | PostHog API key for event tracking | Required if enabled |
| `POSTHOG_HOST` | PostHog server endpoint | `https://app.posthog.com` |
| `POSTHOG_FLUSH_AT` | Number of events to batch before sending | `20` |
| `POSTHOG_FLUSH_INTERVAL` | Interval (ms) to flush events | `10000` |

## Network Configuration

When using PostHog, calls to external services will come from specific static IP addresses. If you need to allowlist these IPs for firewall rules, you should add the following addresses:

- `44.205.89.55`
- `44.208.188.173`
- `52.4.194.122`

This applies to all integrations such as webhooks, apps, or batch exports.

## Implementation

### PostHog Service

The core PostHog service (`posthog-service.ts`) provides the following methods:

- `initialize(config: PostHogConfig)`: Initialize the PostHog client
- `capture(event: PostHogEvent)`: Capture a user event
- `identify(user: PostHogUser)`: Identify a user
- `alias(distinctId: string, alias: string)`: Create user alias
- `flush()`: Flush pending events
- `shutdown()`: Gracefully shutdown the client

### Analytics Integration

The analytics service (`analytics-service.ts`) automatically integrates with PostHog for all tracking operations:

- User interactions are tracked as `interaction_{type}` events
- Session start/updates are tracked as `session_started` and `session_updated` events
- Cognitive state changes are tracked as `cognitive_state_change` events

### Example Usage

```typescript
import { posthogService } from './posthog-service';

// Initialize PostHog
await posthogService.initialize({
  apiKey: process.env.POSTHOG_API_KEY,
  enable: process.env.POSTHOG_ENABLE === 'true',
});

// Capture custom event
await posthogService.capture({
  event: 'custom_event',
  distinctId: 'user_123',
  properties: {
    customProperty: 'value',
  },
});

// Identify user
await posthogService.identify({
  distinctId: 'user_123',
  properties: {
    email: 'user@example.com',
    name: 'John Doe',
  },
});
```

## Testing

The integration includes comprehensive tests:

- `posthog-config.test.ts`: Configuration service tests
- `posthog-init.test.ts`: Initialization tests
- `posthog-service.test.ts`: Core service tests
- `analytics-service.test.ts`: Integration tests

Run tests with:
```bash
bun run packages/elizaos-plugins/mongodb-integration/src/posthog-config.test.ts
bun run packages/elizaos-plugins/mongodb-integration/src/posthog-init.test.ts
bun run packages/elizaos-plugins/mongodb-integration/src/posthog-service.test.ts
```

## Events Tracked

### User Interactions
- `interaction_click`: Button clicks and UI interactions
- `interaction_hover`: Mouse hover events
- `interaction_scroll`: Page scrolling behavior
- `interaction_keypress`: Keyboard input
- `interaction_navigation`: Page navigation
- `interaction_mode_switch`: Cognitive mode changes
- `interaction_component_interaction`: Component-specific interactions

### Session Events
- `session_started`: New user session
- `session_updated`: Session updates (duration, productivity, etc.)

### Cognitive Events
- `cognitive_state_change`: Changes in cognitive mode or confidence

## Best Practices

1. **Privacy First**: Always respect user privacy and comply with data protection regulations
2. **Selective Tracking**: Only track meaningful events that provide business value
3. **Performance**: The integration is designed to be non-blocking and efficient
4. **Configuration**: Use environment variables for easy configuration across environments
5. **Testing**: Always test the integration in a staging environment before production

## Troubleshooting

### Common Issues

1. **Events Not Appearing**: Check that `POSTHOG_ENABLE` is set to `true` and `POSTHOG_API_KEY` is valid
2. **Network Errors**: Ensure your environment can reach the PostHog server
3. **Configuration Issues**: Verify all environment variables are correctly set

### Debugging

Enable debug logging by setting:
```env
DEBUG=posthog*
```

## Security

The integration follows security best practices:
- API keys are loaded from environment variables
- No sensitive data is logged
- All network communication can be configured to use HTTPS
- Service can be completely disabled via configuration

## Performance

The PostHog integration is optimized for performance:
- Events are batched and flushed periodically
- Non-blocking event capture
- Configurable flush intervals
- Automatic retry logic for failed events
- Graceful degradation when service is unavailable