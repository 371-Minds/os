// https://proxiedmail.com/api/v1/api-docs.yaml

openapi: 3.0.0
servers:
  - url: https://proxiedmail.com/
info:
  description: ProxiedMail API
  version: 1.0.0
  title: ProxiedMail API
  license:
    name: GPL
    url: https://www.gnu.org/licenses/quick-guide-gplv3.html
paths:
  /api/v1/callback:
    post:
      tags:
        - callback
      summary: Auhtorization
      description: ''
      operationId: addCallback
      responses:
        '200':
          $ref: '#/components/responses/responseCreateCallback'
      security:
        - api_auth:
            - default

  /api/v1/callback/get/{hash}:
    get:
      parameters:
        - name: hash
          in: path
          description: Callback hash
          required: true
          schema:
            type: string
      tags:
        - callback
      summary: Auhtorization
      description: ''
      responses:
        '200':
          $ref: '#/components/responses/responseGetCallback'
      security:
        - api_key:
            - default

  /api/v1/received-emails-links/{proxyBindingId}:
    get:
      parameters:
        - name: proxyBindingId
          in: path
          description: proxyBindingId of proxy email that needs to be fetched
          required: true
          schema:
            type: string
      tags:
        - received-email
      summary: Get received emails list by proxy email (last 55)
      description: ''
      responses:
        '200':
          $ref: '#/components/responses/getReceivedEmailsLinksJson'
      security:
        - api_key:
            - default

  /api/v1/received-emails/{receivedEmailId}:
    get:
      parameters:
        - name: receivedEmailId
          in: path
          description: receivedEmailId of received email that needs to be fetched
          required: true
          schema:
            type: string
      tags:
        - received-email
      summary: Get content of received email by id
      description: ''
      responses:
        '200':
          $ref: '#/components/responses/getReceivedEmailDetailsJson'
      security:
        - api_key:
            - default



  /api/v1/proxy-bindings:
    get:
      tags:
        - proxy-binding
      summary: List of proxy emails
      description: ''
      responses:
        '200':
          $ref: '#/components/responses/getProxyBindingJson'
      security:
        - api_key:
            - default
    post:
      tags:
        - proxy-binding
      summary: Create proxy-email
      description: ''
      operationId: addProxyBinding
      responses:
        '200':
          $ref: '#/components/responses/responsePostProxyBinding'
        '401':
          description: Invalid input
          $ref: '#/components/responses/responseError'
      security:
        - api_key:
            - default
      requestBody:
        $ref: '#/components/requestBodies/postProxyBindingJson'

  /api/v1/proxy-bindings/{id}:
    patch:
      parameters:
        - name: id
          in: path
          description: ID of proxy-email that needs to be fetched
          required: true
          schema:
            type: string
      tags:
        - proxy-binding
      summary: Update proxy-email
      description: ''
      operationId: patchProxyBinding
      responses:
        '200':
          $ref: '#/components/responses/responsePostProxyBinding'
        '401':
          description: Invalid input
          $ref: '#/components/responses/responseError'
      security:
        - api_key:
            - default
      requestBody:
        $ref: '#/components/requestBodies/patchProxyBindingJson'



  /api/v1/api-token:
    get:
      tags:
        - api
      summary: Get api token
      description: ''
      responses:
        '200':
          $ref: '#/components/responses/responseTokenJson'
      security:
        - api_auth:
            - default

  /api/v1/auth:
    post:
      tags:
        - user
      summary: Auhtorization
      description: ''
      operationId: userAuth
      responses:
        '200':
          $ref: '#/components/responses/responseAuthJson'
        '401':
          description: Invalid input
          $ref: '#/components/responses/responseError'
      requestBody:
        $ref: '#/components/requestBodies/userAuthJson'
externalDocs:
  description: Find out more about Swagger
  url: http://swagger.io
components:

  schemas:
    OauthAccessToken:
      properties:
        data:
          type: object
          properties:
            type:
              type: string
              enum:
                - oauth-access-tokens
            id:
              type: string
            attributes:
              type: object
              properties:
                token:
                  type: string
                expires_at:
                  type: string
                2fa_granted:
                  type: integer
                  format: int32
                isNewAcc:
                  type: boolean
            relationships:
              type: object
              properties:
                user:
                  type: object
                  properties:
                    data:
                      type: object
                      properties:
                        type:
                          type: string
                        id:
                          type: string



    ProxyBindingList:
      properties:
        type:
          type: string
        id:
          type: string
        attributes:
          type: object
          properties:
            real_addresses:
              type: object
              additionalProperties:
                type: object
                properties:
                  is_enabled:
                    type: boolean
                  is_verification_needed:
                    type: boolean
                  is_verified:
                    type: boolean
            proxy_address:
              type: string
            is_browsable:
              type: boolean
            received_emails:
              type: integer
              format: int32
            description:
              type: string
            callback_url:
              type: string
            created_at:
              type: string
            updated_at:
              type: string
        relationships:
          type: object
          properties:
            user:
              type: object
              properties:
                data:
                  type: object
                  properties:
                    type:
                      type: string
                    id:
                      type: string
    ProxyBindingCreate:
      properties:
        data:
          type: object
          properties:
            type:
              type: string
              enum:
                - "proxy_bindings"
            attributes:
              type: object
              properties:
                real_addresses:
                  type: array
                  items:
                    type: string
                proxy_address:
                  type: string
                is_browsable:
                  type: boolean
                callback_url:
                  type: string

    CreatedCallback:
      properties:
        status:
          type: string
        call_url:
          type: string
        get_url:
          type: string
        id:
          type: string

    AuthRequest:
      properties:
        data:
          type: object
          properties:
            type:
              type: string
              enum:
                - "auth-request"
            attributes:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
    GetCallback:
      properties:
        status:
          type: string
        payload:
          type: object
          format: nullable
        code:
          type: string
        is_received:
          type: boolean
        method:
          type: string
          format: nullable


  responses:
    responseError:
      description: "Error"
      content:
        application/json:
          schema:
            type: array
            items:
              properties:
                data:
                  type: object
                  properties:
                    id:
                      type: string
                    type:
                      type: string
                    attributes:
                      type: object
                      properties:
                        message:
                          type: string
                        exception:
                          type: string
                        file:
                          type: string
                        line:
                          type: integer
                          format: int32

    getReceivedEmailsLinksJson:
      description: "Payload of received emails list by proxy email"
      content:
        application/json:
          schema:
            type: object
            properties:
              type:
                type: string
              id:
                type: string
              attributes:
                type: object
                properties:
                  recipient_email:
                    type: string
                  sender_email:
                    type: string
                  subject:
                    type: string
                  attachmentsCounter:
                    type: integer
                    format: int32
                  link:
                    type: string
                  is_processed:
                    type: boolean
                  created_at:
                    type: string
                  updated_at:
                    type: string

    getReceivedEmailDetailsJson:
      description: "Payload of received email details"
      content:
        application/json:
          schema:
            type: object
            properties:
              type:
                type: string
              id:
                type: string
              attributes:
                type: object
                properties:
                  recipient_email:
                    type: string
                  sender_email:
                    type: string
                  payload:
                    type: object
                    properties:
                      To:
                        type: string
                      From:
                        type: string
                      Subject:
                        type: string
                      recipient:
                        type: string
                      sender:
                        type: string
                      body-html:
                        type: string
                      body-plain:
                        type: string
                      attachments:
                        type: string
                        format: nullable
                  attachments:
                    type: array
                    items:
                      type: object
                      properties:
                        url:
                          type: string
                  is_processed:
                    type: boolean
                  created_at:
                    type: string
                  updated_at:
                    type: string


    responseCreateCallback:
      description: "Test"
      content:
        application/json:
          schema:
            type: object
            $ref: '#/components/schemas/CreatedCallback'


    getProxyBindingJson:
      description: "Test"
      content:
        application/json:
          schema:
            type: object
            properties:
              meta:
                type: object
                properties:
                  usedProxyBindings:
                    type: integer
                    format: int32
                  availableProxyBindings:
                    type: integer
                    format: int32
                  isVerificationEmailSend:
                    type: boolean
              data:
                type: array
                items:
                  type: object
                  $ref: '#/components/schemas/ProxyBindingList'



    responseTokenJson:
      description: "Test"
      content:
        application/json:
          schema:
            type: object
            properties:
              token:
                type: string



    responsePostProxyBinding:
      description: "Test"
      content:
        application/json:
          schema:
            type: object
            properties:
              meta:
                type: object
                properties:
                  isVerificationEmailSend:
                    type: boolean
                  firstProxyBinding:
                    type: boolean
              data:
                type: object
                properties:
                $ref: '#/components/schemas/ProxyBindingList'


    responseGetCallback:
      description: "Test"
      content:
        application/json:
          schema:
            type: object
            $ref: '#/components/schemas/GetCallback'


    responseAuthJson:
      description: "Test"
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/OauthAccessToken'

  requestBodies:
    postProxyBindingJson:
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/ProxyBindingCreate'



    userAuthJson:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/AuthRequest'

    patchProxyBindingJson:
      content:
        application/json:
          schema:
            type: array
            items:
              properties:
                data:
                  type: object
                  $ref: '#/components/schemas/ProxyBindingList'



  securitySchemes:
    api_auth:
      type: http
      scheme: bearer
    api_key:
      type: apiKey
      name: Token
      in: header
