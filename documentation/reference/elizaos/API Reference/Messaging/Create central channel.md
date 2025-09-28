# Create central channel

> Create a channel in the central database

## OpenAPI

````yaml post /api/messaging/central-channels
paths:
  path: /api/messaging/central-channels
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
              name:
                allOf:
                  - type: string
              serverId:
                allOf:
                  - type: string
                    format: uuid
              description:
                allOf:
                  - type: string
              type:
                allOf:
                  - type: string
                    enum:
                      - text
                      - voice
                      - dm
                      - group
            required: true
            requiredProperties:
              - name
              - serverId
        examples:
          example:
            value:
              name: <string>
              serverId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              description: <string>
              type: text
  response:
    '201':
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
                      channel:
                        $ref: '#/components/schemas/Channel'
        examples:
          example:
            value:
              success: true
              data:
                channel:
                  id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  name: <string>
                  serverId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  type: text
                  description: <string>
                  metadata: {}
        description: Central channel created successfully
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
        description: Error creating channel
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
