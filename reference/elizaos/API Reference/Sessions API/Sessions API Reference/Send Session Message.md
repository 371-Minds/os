# Send Session Message

> Send a message to a conversation session with automatic renewal tracking

## OpenAPI

````yaml post /api/messaging/sessions/{sessionId}/messages
paths:
  path: /api/messaging/sessions/{sessionId}/messages
  method: post
  servers:
    - url: http://localhost:3000
      description: Local development server
  request:
    security: []
    parameters:
      path:
        sessionId:
          schema:
            - type: string
              required: true
              description: ID of the session
      query: {}
      header: {}
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              content:
                allOf:
                  - type: string
                    description: The message content
              attachments:
                allOf:
                  - type: array
                    items:
                      type: object
                      properties:
                        type:
                          type: string
                          description: Type of attachment
                        url:
                          type: string
                          description: URL of the attachment
                        name:
                          type: string
                          description: Name of the attachment
              metadata:
                allOf:
                  - type: object
                    description: Additional message metadata
            required: true
            requiredProperties:
              - content
        examples:
          example:
            value:
              content: <string>
              attachments:
                - type: <string>
                  url: <string>
                  name: <string>
              metadata: {}
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    description: Message ID
              content:
                allOf:
                  - type: string
                    description: The message content
              authorId:
                allOf:
                  - type: string
                    format: uuid
              createdAt:
                allOf:
                  - type: string
                    format: date-time
              metadata:
                allOf:
                  - type: object
              sessionStatus:
                allOf:
                  - type: object
                    description: Current session status after sending the message
                    properties:
                      expiresAt:
                        type: string
                        format: date-time
                        description: Updated expiration timestamp
                      renewalCount:
                        type: integer
                        description: Total number of times the session has been renewed
                      wasRenewed:
                        type: boolean
                        description: Whether the session was renewed by this message
                      isNearExpiration:
                        type: boolean
                        description: Whether the session is within the warning threshold
        examples:
          example:
            value:
              id: <string>
              content: <string>
              authorId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              createdAt: '2023-11-07T05:31:56Z'
              metadata: {}
              sessionStatus:
                expiresAt: '2023-11-07T05:31:56Z'
                renewalCount: 123
                wasRenewed: true
                isNearExpiration: true
        description: Message sent and processed successfully
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
        description: Invalid request parameters
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
        description: Session not found
    '410':
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
        description: Session has expired
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
        description: Internal server error
  deprecated: false
  type: path
components:
  schemas: {}

````
