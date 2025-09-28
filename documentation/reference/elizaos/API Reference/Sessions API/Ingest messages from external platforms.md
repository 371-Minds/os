# Ingest messages from external platforms

> Ingest messages from external platforms (Discord, Telegram, etc.) into the central
messaging system. This endpoint handles messages from external sources and routes
them to the appropriate agents through the central message bus.


## OpenAPI

````yaml post /api/messaging/ingest-external
paths:
  path: /api/messaging/ingest-external
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
              agentId:
                allOf:
                  - type: string
                    format: uuid
              roomId:
                allOf:
                  - type: string
                    format: uuid
              userId:
                allOf:
                  - type: string
                    format: uuid
              text:
                allOf:
                  - type: string
              sourceId:
                allOf:
                  - type: string
              sourceType:
                allOf:
                  - type: string
                    enum:
                      - discord
                      - telegram
                      - twitter
              metadata:
                allOf:
                  - type: object
            required: true
            requiredProperties:
              - agentId
              - roomId
              - userId
              - text
              - sourceId
              - sourceType
        examples:
          example:
            value:
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              text: <string>
              sourceId: <string>
              sourceType: discord
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
        examples:
          example:
            value:
              success: true
        description: Message ingested successfully
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
        description: Error ingesting message
  deprecated: false
  type: path
components:
  schemas: {}

````
