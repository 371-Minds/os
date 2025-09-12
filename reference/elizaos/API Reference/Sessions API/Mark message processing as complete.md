# Mark message processing as complete

> Notify the system that an agent has finished processing a message. This is used
to signal completion of agent responses and update the message state.


## OpenAPI

````yaml post /api/messaging/complete
paths:
  path: /api/messaging/complete
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
              prompt:
                allOf:
                  - type: string
            required: true
            requiredProperties:
              - agentId
              - roomId
              - userId
              - prompt
        examples:
          example:
            value:
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              roomId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              prompt: <string>
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
                      response:
                        type: string
        examples:
          example:
            value:
              success: true
              data:
                response: <string>
        description: Completion successful
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
        description: Error generating completion
  deprecated: false
  type: path
components:
  schemas: {}

````
