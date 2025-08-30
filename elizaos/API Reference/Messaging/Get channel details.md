# Get channel details

> Get details for a specific channel

## OpenAPI

````yaml get /api/messaging/central-channels/{channelId}/details
paths:
  path: /api/messaging/central-channels/{channelId}/details
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
                  - $ref: '#/components/schemas/Channel'
        examples:
          example:
            value:
              success: true
              data:
                id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                name: <string>
                serverId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                type: text
                description: <string>
                metadata: {}
        description: Channel details retrieved
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
    Channel:
      type: object
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the channel
        name:
          type: string
          description: Name of the channel
        serverId:
          type: string
          format: uuid
          description: ID of the server this channel belongs to
        type:
          type: string
          enum:
            - text
            - voice
            - dm
            - group
          description: Type of channel
        description:
          type: string
          description: Channel description
        metadata:
          type: object
          description: Additional channel metadata

````
