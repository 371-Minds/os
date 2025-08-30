# Sessions Health Check

> Check the health status of the sessions service and get active session statistics

## OpenAPI

````yaml get /api/messaging/sessions/health
paths:
  path: /api/messaging/sessions/health
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
                    enum:
                      - healthy
                      - degraded
                      - unhealthy
              activeSessions:
                allOf:
                  - type: integer
                    description: Number of currently active sessions
              timestamp:
                allOf:
                  - type: string
                    format: date-time
              expiringSoon:
                allOf:
                  - type: integer
                    description: Number of sessions near expiration
              invalidSessions:
                allOf:
                  - type: integer
                    description: Number of invalid sessions detected (only shown if > 0)
              uptime:
                allOf:
                  - type: number
                    description: Service uptime in seconds
        examples:
          example:
            value:
              status: healthy
              activeSessions: 123
              timestamp: '2023-11-07T05:31:56Z'
              expiringSoon: 123
              invalidSessions: 123
              uptime: 123
        description: Sessions API is healthy
  deprecated: false
  type: path
components:
  schemas: {}

````
