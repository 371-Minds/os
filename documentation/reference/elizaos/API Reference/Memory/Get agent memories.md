# Get agent memories

> Retrieve all memories for a specific agent

## OpenAPI

````yaml get /api/memory/{agentId}/memories
paths:
  path: /api/memory/{agentId}/memories
  method: get
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        agentId:
          schema:
            - type: string
              required: true
              description: ID of the agent
              format: uuid
      query:
        tableName:
          schema:
            - type: string
              description: Table name to query
              default: messages
        includeEmbedding:
          schema:
            - type: boolean
              description: Include embedding vectors in response
              default: false
        channelId:
          schema:
            - type: string
              description: Filter by channel ID
              format: uuid
        roomId:
          schema:
            - type: string
              description: Filter by room ID
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
                    example: true
              data:
                allOf:
                  - type: object
                    properties:
                      memories:
                        type: array
                        items:
                          $ref: '#/components/schemas/Memory'
        examples:
          example:
            value:
              success: true
              data:
                memories:
                  - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    entityId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    createdAt: 123
                    content:
                      text: <string>
                      thought: <string>
                      plan: <string>
                      actions:
                        - <string>
                      source: <string>
                      inReplyTo: 3c90c3cc-0d44-4b50-8888-8dd25736052a
        description: Agent memories retrieved successfully
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
        description: Invalid agent ID
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
        description: Error retrieving memories
  deprecated: false
  type: path
components:
  schemas:
    Content:
      type: object
      properties:
        text:
          type: string
          description: Text content of the message
        thought:
          type: string
          description: Agent's internal thought process
        plan:
          type: string
          description: Agent's plan or reasoning
        actions:
          type: array
          items:
            type: string
          description: Actions the agent wants to take
        source:
          type: string
          description: Source of the message
        inReplyTo:
          type: string
          format: uuid
          description: ID of the message this is in reply to
    Memory:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the memory
        entityId:
          type: string
          format: uuid
          description: ID of the entity associated with this memory
        agentId:
          type: string
          format: uuid
          description: ID of the agent associated with this memory
        roomId:
          type: string
          format: uuid
          description: ID of the room this memory belongs to
        createdAt:
          type: integer
          format: int64
          description: Unix timestamp when the memory was created
        content:
          $ref: '#/components/schemas/Content'

````
