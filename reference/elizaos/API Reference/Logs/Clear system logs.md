# Clear system logs

> Clear all system logs

## OpenAPI

````yaml delete /api/server/logs
paths:
  path: /api/server/logs
  method: delete
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
                    example: success
              message:
                allOf:
                  - type: string
                    example: Logs cleared successfully
        examples:
          example:
            value:
              status: success
              message: Logs cleared successfully
        description: Logs cleared successfully
    '500':
      application/json:
        schemaArray:
          - type: object
            properties:
              error:
                allOf:
                  - type: string
              message:
                allOf:
                  - type: string
        examples:
          example:
            value:
              error: <string>
              message: <string>
        description: Error clearing logs
  deprecated: false
  type: path
components:
  schemas: {}

````
