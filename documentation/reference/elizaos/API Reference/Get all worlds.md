# Get all worlds

> Get all worlds across all agents

## OpenAPI

````yaml get /api/agents/worlds
paths:
  path: /api/agents/worlds
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
              success:
                allOf:
                  - type: boolean
                    example: true
              data:
                allOf:
                  - type: object
                    properties:
                      worlds:
                        type: array
                        items:
                          $ref: '#/components/schemas/World'
        examples:
          example:
            value:
              success: true
              data:
                worlds:
                  - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    name: <string>
                    agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    sourceType: <string>
                    sourceId: <string>
                    metadata: {}
        description: Worlds retrieved successfully
    '500':
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
        description: Error retrieving worlds
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
