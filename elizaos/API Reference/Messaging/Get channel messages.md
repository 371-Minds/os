# Get channel messages

> Get messages for a channel

## OpenAPI

````yaml get /api/messaging/central-channels/{channelId}/messages
paths:
  path: /api/messaging/central-channels/{channelId}/messages
  method: get
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
      query:
        limit:
          schema:
            - type: integer
              default: 50
        before:
          schema:
            - type: string
              format: uuid
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
              data:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Message'
        examples:
          example:
            value:
              success: true
              data:
                - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  text: <string>
                  userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  createdAt: 123
                  metadata: {}
        description: Messages retrieved successfully
    '404':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
                    example: false
              error:
                allOf:
                  - type: object
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
