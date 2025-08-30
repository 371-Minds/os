# List all agents

> Returns a list of all available agents

## OpenAPI

````yaml get /api/agents
paths:
  path: /api/agents
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
                      agents:
                        type: array
                        items:
                          $ref: '#/components/schemas/AgentInfo'
        examples:
          example:
            value:
              success: true
              data:
                agents:
                  - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    name: <string>
                    status: active
        description: List of agents
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
        description: Error retrieving agents
  deprecated: false
  type: path
components:
  schemas:
    AgentInfo:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the agent
        name:
          type: string
          description: Name of the agent
        status:
          type: string
          enum:
            - active
            - inactive
          description: Current status of the agent

````
