# Upload media to channel

> Upload media file to a specific channel

## OpenAPI

````yaml post /api/messaging/channels/{channelId}/upload-media
paths:
  path: /api/messaging/channels/{channelId}/upload-media
  method: post
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
              description: ID of the channel
              format: uuid
      query: {}
      header: {}
      cookie: {}
    body:
      multipart/form-data:
        schemaArray:
          - type: object
            properties:
              file:
                allOf:
                  - type: string
                    format: binary
                    description: Media file to upload
              agentId:
                allOf:
                  - type: string
                    format: uuid
                    description: ID of the agent uploading the media
            required: true
        examples:
          example:
            value:
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              id:
                allOf:
                  - type: string
                    format: uuid
              url:
                allOf:
                  - type: string
                    description: URL of the uploaded media
              channelId:
                allOf:
                  - type: string
                    format: uuid
              agentId:
                allOf:
                  - type: string
                    format: uuid
              type:
                allOf:
                  - type: string
                    enum:
                      - image
                      - video
              mimeType:
                allOf:
                  - type: string
              size:
                allOf:
                  - type: integer
        examples:
          example:
            value:
              id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              url: <string>
              channelId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              agentId: 3c90c3cc-0d44-4b50-8888-8dd25736052a
              type: image
              mimeType: <string>
              size: 123
        description: Media uploaded successfully
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
    '413':
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
        description: File too large
    '415':
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
        description: Unsupported media type
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
        description: Error uploading media
  deprecated: false
  type: path
components:
  schemas: {}

````
