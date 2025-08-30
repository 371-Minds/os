# Stop the server

> Initiates server shutdown

## OpenAPI

````yaml post /api/server/stop
paths:
  path: /api/server/stop
  method: post
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
              message:
                allOf:
                  - type: string
                    example: Server stopping...
        examples:
          example:
            value:
              message: Server stopping...
        description: Server is shutting down
  deprecated: false
  type: path
components:
  schemas: {}

````
