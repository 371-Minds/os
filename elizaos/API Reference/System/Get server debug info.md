# Get server debug info

> Get debug information about active servers (debug endpoint)

## OpenAPI

````yaml get /api/server/debug/servers
paths:
  path: /api/server/debug/servers
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
              servers:
                allOf:
                  - type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                          format: uuid
                        name:
                          type: string
                        status:
                          type: string
                        agents:
                          type: array
                          items:
                            type: string
                            format: uuid
        examples:
          example:
            value:
              servers:
                - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  name: <string>
                  status: <string>
                  agents:
                    - 3c90c3cc-0d44-4b50-8888-8dd25736052a
        description: Server debug information
  deprecated: false
  type: path
components:
  schemas: {}

````
