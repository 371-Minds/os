# Remove agent from server

> Remove an agent from a server

## OpenAPI

````yaml delete /api/messaging/servers/{serverId}/agents/{agentId}
paths:
  path: /api/messaging/servers/{serverId}/agents/{agentId}
  method: delete
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        serverId:
          schema:
            - type: string
              required: true
              format: uuid
        agentId:
          schema:
            - type: string
              required: true
              format: uuid
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
        examples:
          example:
            value:
              success: true
        description: Agent removed successfully
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
        description: Server or agent not found
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
        description: Error removing agent
  deprecated: false
  type: path
components:
  schemas: {}

````
