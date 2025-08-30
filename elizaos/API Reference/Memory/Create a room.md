# Create a room

> Create a new room for an agent

## OpenAPI

````yaml post /api/memory/{agentId}/rooms
paths:
  path: /api/memory/{agentId}/rooms
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
              type:
                allOf:
                  - type: string
                    enum:
                      - DM
                      - GROUP
                      - CHANNEL
                    default: DM
                    description: Type of room
              source:
                allOf:
                  - type: string
                    default: client
                    description: Source of the room
              worldId:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the world
              serverId:
                allOf:
                  - type: string
                    description: Server ID
              metadata:
                allOf:
                  - type: object
                    description: Additional room metadata
            required: true
            requiredProperties:
              - name
        examples:
          example:
            value:
              name: <string>
              type: DM
              source: client
              worldId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              serverId: <string>
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
                    example: true
              data:
                allOf:
                  - type: object
                    properties:
                      id:
                        type: string
                        format: uuid
                      name:
                        type: string
                      agentId:
                        type: string
                        format: uuid
                      createdAt:
                        type: integer
                      source:
                        type: string
                      type:
                        type: string
                      worldId:
                        type: string
                        format: uuid
                      serverId:
                        type: string
                      metadata:
                        type: object
        examples:
          example:
            value:
              success: true
              data:
                id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                name: <string>
                agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                createdAt: 123
                source: <string>
                type: <string>
                worldId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                serverId: <string>
                metadata: {}
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
        description: Invalid agent ID or missing required fields
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
  schemas: {}

````
