# Get channel participants

> Get all participants in a channel

## OpenAPI

````yaml get /api/messaging/central-channels/{channelId}/participants
paths:
  path: /api/messaging/central-channels/{channelId}/participants
  method: get
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
              data:
                allOf:
                  - type: array
                    items:
                      $ref: '#/components/schemas/Participant'
        examples:
          example:
            value:
              success: true
              data:
                - id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  userId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  name: <string>
                  role: admin
                  joinedAt: 123
        description: Participants retrieved successfully
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
  schemas:
    Participant:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the participant
        userId:
          type: string
          format: uuid
          description: User ID of the participant
        name:
          type: string
          description: Name of the participant
        role:
          type: string
          enum:
            - admin
            - member
            - guest
          description: Role in the channel
        joinedAt:
          type: integer
          format: int64
          description: Unix timestamp when the participant joined

````
