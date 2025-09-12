# Get server debug info

> Get debug information about active servers (debug endpoint)

## OpenAPI

````yaml get /api/server/servers
paths:
  path: /api/server/servers
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
                        name:
                          type: string
                        status:
                          type: string
                        agents:
                          type: array
                          items:
                            type: string
        examples:
          example:
            value:
              servers:
                - id: <string>
                  name: <string>
                  status: <string>
                  agents:
                    - <string>
        description: Server debug information
  deprecated: false
  type: path
components:
  schemas: {}

````
