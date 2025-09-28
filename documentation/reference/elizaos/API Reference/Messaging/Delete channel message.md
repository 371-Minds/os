# Delete channel message

> Delete a specific message from a channel

## OpenAPI

````yaml delete /api/messaging/central-channels/{channelId}/messages/{messageId}
paths:
  path: /api/messaging/central-channels/{channelId}/messages/{messageId}
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
        messageId:
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
        examples:
          example:
            value:
              success: true
        description: Message deleted successfully
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
        description: Channel or message not found
  deprecated: false
  type: path
components:
  schemas: {}

````
