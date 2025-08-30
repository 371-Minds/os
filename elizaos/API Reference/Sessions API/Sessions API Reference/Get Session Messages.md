# Get Session Messages

> Retrieve messages from a conversation session with cursor-based pagination

## OpenAPI

````yaml get /api/messaging/sessions/{sessionId}/messages
paths:
  path: /api/messaging/sessions/{sessionId}/messages
  method: get
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
      query:
        limit:
          schema:
            - type: integer
              description: Maximum number of messages to return
              maximum: 100
              minimum: 1
              default: 50
        before:
          schema:
            - type: string
              description: Get messages before this timestamp
              format: date-time
        after:
          schema:
            - type: string
              description: Get messages after this timestamp
              format: date-time
      header: {}
      cookie: {}
    body: {}
  response:
    '200':
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
                        id:
                          type: string
                        content:
                          type: string
                        authorId:
                          type: string
                          format: uuid
                        isAgent:
                          type: boolean
                        createdAt:
                          type: string
                          format: date-time
                        metadata:
                          type: object
              hasMore:
                allOf:
                  - type: boolean
                    description: Whether there are more messages available
              cursors:
                allOf:
                  - type: object
                    description: Pagination cursors for fetching additional messages
                    properties:
                      before:
                        type: integer
                        description: Use this timestamp to get older messages
                      after:
                        type: integer
                        description: Use this timestamp to get newer messages
        examples:
          example:
            value:
              messages:
                - id: <string>
                  content: <string>
                  authorId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  isAgent: true
                  createdAt: '2023-11-07T05:31:56Z'
                  metadata: {}
              hasMore: true
              cursors:
                before: 123
                after: 123
        description: Messages retrieved successfully
    '404':
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
