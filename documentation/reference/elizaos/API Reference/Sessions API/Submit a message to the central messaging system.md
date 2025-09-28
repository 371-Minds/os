# Submit a message to the central messaging system

> Submit a message to the central messaging bus for agent processing. This is the primary endpoint
for sending messages to agents, replacing the deprecated agent-specific message endpoints.

The message is submitted to a central channel and the appropriate agent(s) will process it
based on the channel and room configuration. This architecture allows for multi-agent
conversations and better message routing.

**Important**: Do not use `/api/agents/{agentId}/message` - that endpoint no longer exists.
All messages should go through this central messaging system.


## OpenAPI

````yaml post /api/messaging/submit
paths:
  path: /api/messaging/submit
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
              channel_id:
                allOf:
                  - type: string
                    format: uuid
                    description: Central channel ID where the message is posted
              server_id:
                allOf:
                  - type: string
                    format: uuid
                    description: >-
                      Server ID (use '00000000-0000-0000-0000-000000000000' for
                      default)
              author_id:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the message author (user or agent)
              content:
                allOf:
                  - type: string
                    description: The message content text
              in_reply_to_message_id:
                allOf:
                  - type: string
                    format: uuid
                    description: Optional ID of the message being replied to
              source_type:
                allOf:
                  - type: string
                    description: Source type (e.g., 'agent_response', 'user_message')
              raw_message:
                allOf:
                  - type: object
                    description: Raw message object containing additional data
              metadata:
                allOf:
                  - type: object
                    description: Additional metadata including agent_name if from agent
            required: true
            requiredProperties:
              - channel_id
              - server_id
              - author_id
              - content
              - source_type
              - raw_message
        examples:
          example:
            value:
              channel_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              server_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              author_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              content: <string>
              in_reply_to_message_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              source_type: <string>
              raw_message: {}
              metadata: {}
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
              data:
                allOf:
                  - $ref: '#/components/schemas/Message'
        examples:
          example:
            value:
              success: true
              data:
                id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                text: <string>
                userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                createdAt: 123
                metadata: {}
        description: Message submitted successfully
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
        description: Invalid request
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
        description: Error processing message
  deprecated: false
  type: path
components:
  schemas:
    Message:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the message
        text:
          type: string
          description: Message text content
        userId:
          type: string
          format: uuid
          description: ID of the user who sent the message
        agentId:
          type: string
          format: uuid
          description: ID of the agent (if sent by agent)
        roomId:
          type: string
          format: uuid
          description: ID of the room the message belongs to
        createdAt:
          type: integer
          format: int64
          description: Unix timestamp when the message was created
        metadata:
          type: object
          description: Additional message metadata

````
