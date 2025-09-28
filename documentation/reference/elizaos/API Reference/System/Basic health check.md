# Basic health check

> Simple hello world test endpoint

## OpenAPI

````yaml get /api/server/hello
paths:
  path: /api/server/hello
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
              message:
                allOf:
                  - type: string
                    example: Hello World!
        examples:
          example:
            value:
              message: Hello World!
        description: Hello world response
  deprecated: false
  type: path
components:
  schemas: {}

````
