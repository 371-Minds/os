# Update agent

> Update an existing agent

## OpenAPI

````yaml patch /api/agents/{agentId}
paths:
  path: /api/agents/{agentId}
  method: patch
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
              description: ID of the agent to update
              format: uuid
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties: {}
            required: true
            description: Agent updates
        examples:
          example:
            value: {}
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
                  - $ref: '#/components/schemas/AgentInfo'
        examples:
          example:
            value:
              success: true
              data:
                id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                name: <string>
                status: active
        description: Agent updated successfully
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
        description: Error updating agent
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
