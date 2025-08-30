# Create Session

> Create a new conversation session with an agent with configurable timeout and renewal policies

## OpenAPI

````yaml post /api/messaging/sessions
paths:
  path: /api/messaging/sessions
  method: post
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              agentId:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the agent to start a session with
              userId:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the user creating the session
              metadata:
                allOf:
                  - type: object
                    description: Additional metadata for the session
                    properties:
                      platform:
                        type: string
                        description: Platform the session is created from
                      username:
                        type: string
                        description: Username of the user
                      discriminator:
                        type: string
                        description: User discriminator (e.g., Discord discriminator)
                      avatar:
                        type: string
                        description: URL to user's avatar
              timeoutConfig:
                allOf:
                  - type: object
                    description: Optional timeout configuration for the session
                    properties:
                      timeoutMinutes:
                        type: integer
                        minimum: 5
                        maximum: 1440
                        description: Inactivity timeout in minutes (5-1440). Default 30
                      autoRenew:
                        type: boolean
                        description: >-
                          Whether to automatically renew on activity. Default
                          true
                      maxDurationMinutes:
                        type: integer
                        description: >-
                          Maximum total session duration in minutes. Default 720
                          (12 hours)
                      warningThresholdMinutes:
                        type: integer
                        description: >-
                          Minutes before expiration to trigger warning. Default
                          5
            required: true
            requiredProperties:
              - agentId
              - userId
        examples:
          example:
            value:
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              metadata:
                platform: <string>
                username: <string>
                discriminator: <string>
                avatar: <string>
              timeoutConfig:
                timeoutMinutes: 722
                autoRenew: true
                maxDurationMinutes: 123
                warningThresholdMinutes: 123
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              sessionId:
                allOf:
                  - type: string
                    description: Unique identifier for the created session
              agentId:
                allOf:
                  - type: string
                    format: uuid
              userId:
                allOf:
                  - type: string
                    format: uuid
              createdAt:
                allOf:
                  - type: string
                    format: date-time
              metadata:
                allOf:
                  - type: object
              expiresAt:
                allOf:
                  - type: string
                    format: date-time
                    description: When the session will expire
              timeoutConfig:
                allOf:
                  - type: object
                    description: Active timeout configuration for the session
                    properties:
                      timeoutMinutes:
                        type: integer
                      autoRenew:
                        type: boolean
                      maxDurationMinutes:
                        type: integer
                      warningThresholdMinutes:
                        type: integer
        examples:
          example:
            value:
              sessionId: <string>
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              createdAt: '2023-11-07T05:31:56Z'
              metadata: {}
              expiresAt: '2023-11-07T05:31:56Z'
              timeoutConfig:
                timeoutMinutes: 123
                autoRenew: true
                maxDurationMinutes: 123
                warningThresholdMinutes: 123
        description: Session created successfully
    '400':
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
        description: Invalid request parameters
    '404':
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
        description: Agent not found
    '500':
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
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas: {}

````
