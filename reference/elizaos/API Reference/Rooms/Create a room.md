# Create a room

> Creates a new room for an agent

## OpenAPI

````yaml post /api/agents/{agentId}/rooms
paths:
  path: /api/agents/{agentId}/rooms
  method: post
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
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              name:
                allOf:
                  - type: string
                    description: Name of the room
              worldId:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the world
              roomId:
                allOf:
                  - type: string
                    format: uuid
                    description: Optional custom room ID
              entityId:
                allOf:
                  - type: string
                    format: uuid
                    description: Entity ID to add to the room
            required: true
        examples:
          example:
            value:
              name: <string>
              worldId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              entityId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
  response:
    '201':
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
                  - $ref: '#/components/schemas/Room'
        examples:
          example:
            value:
              success: true
              data:
                id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                name: <string>
                source: <string>
                worldId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                entities:
                  - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    name: <string>
        description: Room created successfully
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
        description: Error creating room
  deprecated: false
  type: path
components:
  schemas:
    Room:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the room
        name:
          type: string
          description: Name of the room
        source:
          type: string
          description: Source of the room
        worldId:
          type: string
          format: uuid
          description: ID of the world this room belongs to
        entities:
          type: array
          items:
            type: object
            properties:
              id:
                type: string
                format: uuid
              name:
                type: string
          description: Entities in this room

````
