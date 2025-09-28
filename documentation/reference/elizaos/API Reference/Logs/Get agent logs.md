# Get agent logs

> Retrieve logs for a specific agent

## OpenAPI

````yaml get /api/agents/{agentId}/logs
paths:
  path: /api/agents/{agentId}/logs
  method: get
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        agentId:
          schema:
            - type: string
              required: true
              description: ID of the agent
              format: uuid
      query:
        since:
          schema:
            - type: integer
              description: Timestamp (ms) to get logs from
        until:
          schema:
            - type: integer
              description: Timestamp (ms) to get logs until
        level:
          schema:
            - type: enum<string>
              enum:
                - trace
                - debug
                - info
                - warn
                - error
                - fatal
              default: info
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
              success:
                allOf:
                  - type: boolean
                    example: true
              data:
                allOf:
                  - type: object
                    properties:
                      logs:
                        type: array
                        items:
                          $ref: '#/components/schemas/LogEntry'
                      count:
                        type: integer
        examples:
          example:
            value:
              success: true
              data:
                logs:
                  - level: 123
                    time: 123
                    msg: <string>
                    agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                    agentName: <string>
                count: 123
        description: Agent logs retrieved successfully
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
        description: Invalid agent ID
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
        description: Agent not found
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
