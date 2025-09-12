# Synthesize speech from text

> Convert text to speech using agent's voice settings

## OpenAPI

````yaml post /api/audio/{agentId}/audio-messages/synthesize
paths:
  path: /api/audio/{agentId}/audio-messages/synthesize
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
              text:
                allOf:
                  - type: string
                    description: Text to convert to speech
              options:
                allOf:
                  - type: object
                    properties:
                      voice:
                        type: string
                        description: Voice ID or name
                      language:
                        type: string
                        description: Language code
            required: true
            requiredProperties:
              - text
        examples:
          example:
            value:
              text: <string>
              options:
                voice: <string>
                language: <string>
  response:
    '200':
      audio/mpeg:
        schemaArray:
          - type: file
            contentEncoding: binary
        examples:
          example: {}
        description: Speech synthesized successfully
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
        description: Error synthesizing speech
  deprecated: false
  type: path
components:
  schemas: {}

````
