# Get system logs

> Retrieve system logs with optional filtering

## OpenAPI

````yaml get /api/server/logs
paths:
  path: /api/server/logs
  method: get
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path: {}
      query:
        since:
          schema:
            - type: integer
              description: Timestamp (ms) to get logs from
        level:
          schema:
            - type: enum<string>
              enum:
                - all
                - trace
                - debug
                - info
                - warn
                - error
                - fatal
              default: info
        agentName:
          schema:
            - type: string
        agentId:
          schema:
            - type: string
              format: uuid
        limit:
          schema:
            - type: integer
              maximum: 1000
              default: 100
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              logs:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/LogEntry'
              count:
                allOf:
                  - type: integer
              total:
                allOf:
                  - type: integer
              level:
                allOf:
                  - type: string
              levels:
                allOf:
                  - type: array
                    items:
                      type: string
        examples:
          example:
            value:
              logs:
                - level: 123
                  time: 123
                  msg: <string>
                  agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  agentName: <string>
              count: 123
              total: 123
              level: <string>
              levels:
                - <string>
        description: System logs
    '500':
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
        description: Error retrieving logs
  deprecated: false
  type: path
components:
  schemas:
    LogEntry:
      type: object
      properties:
        level:
          type: number
          description: Log level
        time:
          type: number
          format: int64
          description: Timestamp of the log entry
        msg:
          type: string
          description: Log message
        agentId:
          type: string
          format: uuid
          description: ID of the related agent (if applicable)
        agentName:
          type: string
          description: Name of the related agent (if applicable)

````
