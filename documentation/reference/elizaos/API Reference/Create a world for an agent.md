# Create a world for an agent

> Create a new world for a specific agent

## OpenAPI

````yaml post /api/agents/{agentId}/worlds
paths:
  path: /api/agents/{agentId}/worlds
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
                    description: Name of the world
              sourceType:
                allOf:
                  - type: string
                    description: Type of source (e.g., discord, telegram)
              sourceId:
                allOf:
                  - type: string
                    description: Platform-specific identifier
              metadata:
                allOf:
                  - type: object
                    description: Additional world metadata
            required: true
        examples:
          example:
            value:
              name: <string>
              sourceType: <string>
              sourceId: <string>
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
                      world:
                        $ref: '#/components/schemas/World'
        examples:
          example:
            value:
              success: true
              data:
                world:
                  id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  name: <string>
                  agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  sourceType: <string>
                  sourceId: <string>
                  metadata: {}
        description: World created successfully
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
        description: Invalid agent ID or request
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
        description: Error creating world
  deprecated: false
  type: path
components:
  schemas:
    World:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the world
        name:
          type: string
          description: Name of the world
        agentId:
          type: string
          format: uuid
          description: ID of the agent that owns this world
        sourceType:
          type: string
          description: Type of source (discord, telegram, etc)
        sourceId:
          type: string
          description: Platform-specific identifier
        metadata:
          type: object
          description: Additional world metadata

````
