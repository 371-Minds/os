# Create a new agent

> Creates a new agent from character configuration

## OpenAPI

````yaml post /api/agents
paths:
  path: /api/agents
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
              characterPath:
                allOf:
                  - type: string
                    description: Path to a character file
              characterJson:
                allOf:
                  - type: object
                    description: Character configuration in JSON format
            required: true
        examples:
          example:
            value:
              characterPath: <string>
              characterJson: {}
  response:
    '201':
      application/json:
        schemaArray:
          - type: object
            properties:
              success:
                allOf:
                  - type: boolean
                    example: true
              data:
                allOf:
                  - type: object
                    properties:
                      character:
                        $ref: '#/components/schemas/Character'
        examples:
          example:
            value:
              success: true
              data:
                character:
                  id: 3c90c3cc-0d44-4b50-8888-8dd25736052a
                  name: <string>
                  bio: <string>
                  settings: {}
                  system: <string>
                  style: {}
                  lore:
                    - <string>
                  messageExamples:
                    - <string>
                  topics:
                    - <string>
                  plugins:
                    - <string>
        description: Agent created successfully
    '400':
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
        description: Error creating agent
  deprecated: false
  type: path
components:
  schemas:
    Character:
      type: object
      required:
        - name
      properties:
        id:
          type: string
          format: uuid
          description: Unique identifier for the character
        name:
          type: string
          description: Name of the character
        bio:
          type: string
          description: Short biography of the character
        settings:
          type: object
          description: Character-specific settings
        system:
          type: string
          description: System prompt for the character
        style:
          type: object
          description: Character's communication style
        lore:
          type: array
          items:
            type: string
          description: Extended lore and background information
        messageExamples:
          type: array
          items:
            type: string
          description: Example messages for character training
        topics:
          type: array
          items:
            type: string
          description: Topics the character is knowledgeable about
        plugins:
          type: array
          items:
            type: string
          description: Plugins used by the character

````
