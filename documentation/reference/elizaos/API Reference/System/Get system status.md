# Get system status

> Returns the current status of the system with agent count and timestamp

## OpenAPI

````yaml get /api/server/status
paths:
  path: /api/server/status
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
                    example: ok
              agentCount:
                allOf:
                  - type: integer
                    description: Number of active agents
              timestamp:
                allOf:
                  - type: string
                    format: date-time
                    description: Current timestamp
        examples:
          example:
            value:
              status: ok
              agentCount: 123
              timestamp: '2023-11-07T05:31:56Z'
        description: System status information
  deprecated: false
  type: path
components:
  schemas: {}

````
