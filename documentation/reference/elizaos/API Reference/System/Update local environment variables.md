# Update local environment variables

> Update local environment variables in .env file

## OpenAPI

````yaml post /api/system/environment/local
paths:
  path: /api/system/environment/local
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
              content:
                allOf:
                  - type: object
                    additionalProperties:
                      type: string
                    description: Key-value pairs of environment variables
            required: true
        examples:
          example:
            value:
              content: {}
  response:
    '200':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
                    example: true
              message:
                allOf:
                  - type: string
                    example: Local env updated
        examples:
          example:
            value:
              success: true
              message: Local env updated
        description: Environment variables updated
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
        description: Error updating environment variables
  deprecated: false
  type: path
components:
  schemas: {}

````
