# Process external message

> Process a message from an external platform

## OpenAPI

````yaml post /api/messaging/external-messages
paths:
  path: /api/messaging/external-messages
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
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              platform:
                allOf:
                  - type: string
                    enum:
                      - discord
                      - telegram
                      - twitter
              messageId:
                allOf:
                  - type: string
              channelId:
                allOf:
                  - type: string
              userId:
                allOf:
                  - type: string
              content:
                allOf:
                  - type: string
              attachments:
                allOf:
                  - type: array
                    items:
                      type: object
              metadata:
                allOf:
                  - type: object
            required: true
            requiredProperties:
              - platform
              - messageId
              - channelId
              - userId
              - content
        examples:
          example:
            value:
              platform: discord
              messageId: <string>
              channelId: <string>
              userId: <string>
              content: <string>
              attachments:
                - {}
              metadata: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
              data:
                allOf:
                  - type: object
                    properties:
                      messageId:
                        type: string
                      response:
                        type: string
        examples:
          example:
            value:
              success: true
              data:
                messageId: <string>
                response: <string>
        description: Message processed successfully
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
        description: Invalid request
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
        description: Error processing message
  deprecated: false
  type: path
components:
  schemas: {}

````
