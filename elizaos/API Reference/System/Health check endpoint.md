# Health check endpoint

> Detailed health check for the system

## OpenAPI

````yaml get /api/server/health
paths:
  path: /api/server/health
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
              status:
                allOf:
                  - type: string
                    example: OK
              version:
                allOf:
                  - type: string
              timestamp:
                allOf:
                  - type: string
                    format: date-time
              dependencies:
                allOf:
                  - type: object
                    properties:
                      agents:
                        type: string
                        example: healthy
        examples:
          example:
            value:
              status: OK
              version: <string>
              timestamp: '2023-11-07T05:31:56Z'
              dependencies:
                agents: healthy
        description: System is healthy
    '503':
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
        description: System is unhealthy
  deprecated: false
  type: path
components:
  schemas: {}

````
