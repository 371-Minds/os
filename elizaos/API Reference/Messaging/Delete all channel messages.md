# Delete all channel messages

> Delete all messages in a channel

## OpenAPI

````yaml delete /api/messaging/central-channels/{channelId}/messages
paths:
  path: /api/messaging/central-channels/{channelId}/messages
  method: delete
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        channelId:
          schema:
            - type: string
              required: true
              format: uuid
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
              success:
                allOf:
                  - type: boolean
              deleted:
                allOf:
                  - type: integer
        examples:
          example:
            value:
              success: true
              deleted: 123
        description: Messages deleted successfully
    '404':
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
        description: Channel not found
  deprecated: false
  type: path
components:
  schemas: {}

````
