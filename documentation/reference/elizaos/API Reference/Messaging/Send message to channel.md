# Send message to channel

> Send a message to a channel

## OpenAPI

````yaml post /api/messaging/central-channels/{channelId}/messages
paths:
  path: /api/messaging/central-channels/{channelId}/messages
  method: post
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        channelId:
          schema:
            - type: string
              required: true
              format: uuid
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              author_id:
                allOf:
                  - type: string
                    format: uuid
                    description: Central ID of the author sending the message
              content:
                allOf:
                  - type: string
                    description: Message content
              in_reply_to_message_id:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the root message being replied to (optional)
              server_id:
                allOf:
                  - type: string
                    format: uuid
                    description: Central server ID this channel belongs to
              raw_message:
                allOf:
                  - description: Raw message payload (string or JSON object)
                    oneOf:
                      - type: object
                      - type: string
              metadata:
                allOf:
                  - type: object
                    description: Additional metadata such as user_display_name
              source_type:
                allOf:
                  - type: string
                    description: Source identifier (e.g. 'eliza_gui')
            required: true
            requiredProperties:
              - author_id
              - content
              - server_id
        examples:
          example:
            value:
              author_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              content: <string>
              in_reply_to_message_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              server_id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              raw_message: {}
              metadata: {}
              source_type: <string>
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
                  - type: object
                    properties:
                      message:
                        $ref: '#/components/schemas/Message'
        examples:
          example:
            value:
              success: true
              data:
                message:
                  id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  text: <string>
                  userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  createdAt: 123
                  metadata: {}
        description: Message sent successfully
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
        description: Channel not found
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
