# Convert conversation to speech

> Convert a conversation (multiple messages) to speech

## OpenAPI

````yaml post /api/audio/{agentId}/speech/conversation
paths:
  path: /api/audio/{agentId}/speech/conversation
  method: post
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
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              messages:
                allOf:
                  - type: array
                    items:
                      type: object
                      properties:
                        text:
                          type: string
                        speaker:
                          type: string
                        timestamp:
                          type: integer
            required: true
            requiredProperties:
              - messages
        examples:
          example:
            value:
              messages:
                - text: <string>
                  speaker: <string>
                  timestamp: 123
  response:
    '200':
      audio/mpeg:
        schemaArray:
          - type: file
            contentEncoding: binary
        examples:
          example: {}
        description: Conversation converted to speech successfully
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
        description: Error converting conversation
  deprecated: false
  type: path
components:
  schemas: {}

````
