# Renew Session

> Manually renew a session to extend its expiration time

## OpenAPI

````yaml post /api/messaging/sessions/{sessionId}/renew
paths:
  path: /api/messaging/sessions/{sessionId}/renew
  method: post
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        sessionId:
          schema:
            - type: string
              required: true
              description: ID of the session to renew
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
              sessionId:
                allOf:
                  - type: string
                    description: Unique session identifier
              agentId:
                allOf:
                  - type: string
                    format: uuid
                    description: UUID of the agent
              userId:
                allOf:
                  - type: string
                    format: uuid
                    description: UUID of the user
              createdAt:
                allOf:
                  - type: string
                    format: date-time
                    description: Session creation timestamp
              lastActivity:
                allOf:
                  - type: string
                    format: date-time
                    description: Last activity timestamp
              metadata:
                allOf:
                  - type: object
                    description: Session metadata
              expiresAt:
                allOf:
                  - type: string
                    format: date-time
                    description: When the session will expire
              timeoutConfig:
                allOf:
                  - type: object
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
                allOf:
                  - type: integer
                    description: Number of times the session has been renewed
              timeRemaining:
                allOf:
                  - type: integer
                    description: Milliseconds until session expiration
              isNearExpiration:
                allOf:
                  - type: boolean
                    description: Whether the session is within the warning threshold
            description: Complete session information with status and timeout details
            refIdentifier: '#/components/schemas/SessionInfo'
        examples:
          example:
            value:
              sessionId: <string>
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
        description: Session renewed successfully
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - &ref_0
                    type: boolean
                    example: false
              error:
                allOf:
                  - &ref_1
                    type: object
                    properties:
                      code:
                        type: string
                        description: Error code
                      message:
                        type: string
                        description: Error message
                      details:
                        type: string
                        description: Detailed error information
            refIdentifier: '#/components/schemas/Error'
        examples:
          example:
            value:
              success: false
              error:
                code: <string>
                message: <string>
                details: <string>
        description: Session not found
    '410':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            refIdentifier: '#/components/schemas/Error'
        examples:
          example:
            value:
              success: false
              error:
                code: <string>
                message: <string>
                details: <string>
        description: Session has expired
    '422':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - *ref_0
              error:
                allOf:
                  - *ref_1
            refIdentifier: '#/components/schemas/Error'
        examples:
          example:
            value:
              success: false
              error:
                code: <string>
                message: <string>
                details: <string>
        description: Cannot renew - maximum duration reached
  deprecated: false
  type: path
components:
  schemas: {}

````
