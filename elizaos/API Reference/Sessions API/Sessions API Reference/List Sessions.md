# List Sessions

> List all active sessions (admin endpoint)

## OpenAPI

````yaml get /api/messaging/sessions
paths:
  path: /api/messaging/sessions
  method: get
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              sessions:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/SessionInfo'
              total:
                allOf:
                  - type: integer
                    description: Total number of active sessions
              stats:
                allOf:
                  - type: object
                    properties:
                      totalSessions:
                        type: integer
                      activeSessions:
                        type: integer
                      expiredSessions:
                        type: integer
        examples:
          example:
            value:
              sessions:
                - sessionId: <string>
                  agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  createdAt: '2023-11-07T05:31:56Z'
                  lastActivity: '2023-11-07T05:31:56Z'
                  metadata: {}
                  expiresAt: '2023-11-07T05:31:56Z'
                  timeoutConfig:
                    timeoutMinutes: 123
                    autoRenew: true
                    maxDurationMinutes: 123
                    warningThresholdMinutes: 123
                  renewalCount: 123
                  timeRemaining: 123
                  isNearExpiration: true
              total: 123
              stats:
                totalSessions: 123
                activeSessions: 123
                expiredSessions: 123
        description: Sessions list retrieved successfully
  deprecated: false
  type: path
components:
  schemas:
    SessionInfo:
      type: object
      description: Complete session information with status and timeout details
      properties:
        sessionId:
          type: string
          description: Unique session identifier
        agentId:
          type: string
          format: uuid
          description: UUID of the agent
        userId:
          type: string
          format: uuid
          description: UUID of the user
        createdAt:
          type: string
          format: date-time
          description: Session creation timestamp
        lastActivity:
          type: string
          format: date-time
          description: Last activity timestamp
        metadata:
          type: object
          description: Session metadata
        expiresAt:
          type: string
          format: date-time
          description: When the session will expire
        timeoutConfig:
          type: object
          description: Current timeout configuration
          properties:
            timeoutMinutes:
              type: integer
              description: Inactivity timeout in minutes
            autoRenew:
              type: boolean
              description: Whether auto-renewal is enabled
            maxDurationMinutes:
              type: integer
              description: Maximum total session duration
            warningThresholdMinutes:
              type: integer
              description: Minutes before expiration to trigger warning
        renewalCount:
          type: integer
          description: Number of times the session has been renewed
        timeRemaining:
          type: integer
          description: Milliseconds until session expiration
        isNearExpiration:
          type: boolean
          description: Whether the session is within the warning threshold

````
