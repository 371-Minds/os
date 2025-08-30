# Ping health check

> Simple ping endpoint to check if server is responsive

## OpenAPI

````yaml get /api/server/ping
paths:
  path: /api/server/ping
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
              pong:
                allOf:
                  - type: boolean
                    example: true
              timestamp:
                allOf:
                  - type: integer
                    description: Current timestamp in milliseconds
        examples:
          example:
            value:
              pong: true
              timestamp: 123
        description: Server is responsive
  deprecated: false
  type: path
components:
  schemas: {}

````
