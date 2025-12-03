/**
 * OpenAPI 3.0 Specification for 371 OS API Gateway
 * 
 * Phase 1: Foundation - Comprehensive API documentation
 */

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: '371 OS API Gateway',
    version: '1.0.0',
    description: `
# 371 Minds Autonomous Agent Operating System API

Unified API Gateway providing access to all 371 OS services with authentication, rate limiting, and comprehensive documentation.

## Authentication

The API supports two authentication methods:

### Bearer Token (JWT)
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

### API Key
\`\`\`
X-API-Key: <your-api-key>
\`\`\`

## Rate Limiting

All endpoints are rate limited. Rate limit information is returned in response headers:
- \`X-RateLimit-Limit\`: Maximum requests allowed
- \`X-RateLimit-Remaining\`: Remaining requests in window
- \`X-RateLimit-Reset\`: Time when rate limit resets

## Request Tracing

Each request is assigned a unique ID returned in the \`X-Request-ID\` header for debugging and support purposes.
    `,
    contact: {
      name: '371 Minds',
      url: 'https://github.com/371-Minds/os',
      email: 'dev@371minds.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local Development'
    },
    {
      url: 'https://api.371minds.com/api/v1',
      description: 'Production'
    }
  ],
  tags: [
    { name: 'Health', description: 'Service health and status endpoints' },
    { name: 'Authentication', description: 'Authentication and token management' },
    { name: 'Governance', description: 'DAO governance and proposal management' },
    { name: 'Email', description: 'Email campaign and coordination services' },
    { name: 'Workflow', description: 'Workflow orchestration and management' },
    { name: 'Agents', description: 'Agent coordination and management' },
    { name: 'Analytics', description: 'Business intelligence and analytics' },
    { name: 'MCP', description: 'Model Context Protocol servers' }
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Gateway health check',
        description: 'Check the health status of the API Gateway',
        responses: {
          '200': {
            description: 'Gateway is healthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthResponse' }
              }
            }
          }
        }
      }
    },
    '/health/services': {
      get: {
        tags: ['Health'],
        summary: 'All services health check',
        description: 'Check the health status of all registered services',
        responses: {
          '200': {
            description: 'All services are healthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ServicesHealthResponse' }
              }
            }
          },
          '503': {
            description: 'One or more services are unhealthy',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ServicesHealthResponse' }
              }
            }
          }
        }
      }
    },
    '/auth/token': {
      post: {
        tags: ['Authentication'],
        summary: 'Generate JWT token',
        description: 'Exchange API key for a JWT token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['apiKey'],
                properties: {
                  apiKey: {
                    type: 'string',
                    description: 'Your API key'
                  }
                }
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Token generated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TokenResponse' }
              }
            }
          },
          '401': {
            description: 'Invalid API key',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/auth/refresh': {
      post: {
        tags: ['Authentication'],
        summary: 'Refresh JWT token',
        description: 'Get a new JWT token using current valid token',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Token refreshed successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TokenResponse' }
              }
            }
          },
          '401': {
            description: 'Invalid or expired token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/auth/validate': {
      get: {
        tags: ['Authentication'],
        summary: 'Validate token',
        description: 'Validate current token and get user info',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        responses: {
          '200': {
            description: 'Token is valid',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UserResponse' }
              }
            }
          },
          '401': {
            description: 'Invalid or expired token',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' }
              }
            }
          }
        }
      }
    },
    '/governance/proposals': {
      get: {
        tags: ['Governance'],
        summary: 'List proposals',
        description: 'Get list of governance proposals with filtering and pagination',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        parameters: [
          { name: 'status', in: 'query', schema: { type: 'string', enum: ['draft', 'submitted', 'voting', 'passed', 'rejected', 'executed'] } },
          { name: 'type', in: 'query', schema: { type: 'string', enum: ['strategic', 'financial', 'technical', 'governance', 'emergency'] } },
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 20, maximum: 100 } }
        ],
        responses: {
          '200': {
            description: 'List of proposals',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProposalsListResponse' }
              }
            }
          }
        }
      },
      post: {
        tags: ['Governance'],
        summary: 'Create proposal',
        description: 'Create a new governance proposal',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProposalRequest' }
            }
          }
        },
        responses: {
          '201': {
            description: 'Proposal created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ProposalResponse' }
              }
            }
          }
        }
      }
    },
    '/email/campaign': {
      post: {
        tags: ['Email'],
        summary: 'Create email campaign',
        description: 'Create and coordinate email campaign with DAO governance',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateCampaignRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Campaign created',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CampaignResponse' }
              }
            }
          }
        }
      }
    },
    '/email/send': {
      post: {
        tags: ['Email'],
        summary: 'Send email',
        description: 'Send individual email with agent coordination and blockchain verification',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SendEmailRequest' }
            }
          }
        },
        responses: {
          '200': {
            description: 'Email sent',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/EmailResponse' }
              }
            }
          }
        }
      }
    },
    '/workflow/status': {
      get: {
        tags: ['Workflow'],
        summary: 'Get workflow status',
        description: 'Get status of active workflows',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        responses: {
          '200': {
            description: 'Workflow status',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/WorkflowStatusResponse' }
              }
            }
          }
        }
      }
    },
    '/agents/coordination/status': {
      get: {
        tags: ['Agents'],
        summary: 'Get agent coordination status',
        description: 'Get current status of agent coordination',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        responses: {
          '200': {
            description: 'Agent coordination status',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AgentStatusResponse' }
              }
            }
          }
        }
      }
    },
    '/analytics/dashboard': {
      get: {
        tags: ['Analytics'],
        summary: 'Get analytics dashboard',
        description: 'Get comprehensive analytics for CEO\'s Orrery',
        security: [{ bearerAuth: [] }, { apiKey: [] }],
        parameters: [
          { name: 'timeRange', in: 'query', schema: { type: 'string', default: '7d', enum: ['1d', '7d', '30d', '90d'] } }
        ],
        responses: {
          '200': {
            description: 'Analytics data',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AnalyticsDashboardResponse' }
              }
            }
          }
        }
      }
    },
    '/mcp/docs/search': {
      get: {
        tags: ['MCP'],
        summary: 'Search documentation',
        description: 'Search 371 OS documentation via MCP',
        parameters: [
          { name: 'q', in: 'query', required: true, schema: { type: 'string' }, description: 'Search query' }
        ],
        responses: {
          '200': {
            description: 'Search results',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/MCPSearchResponse' }
              }
            }
          }
        }
      }
    },
    '/mcp/cognition/state': {
      get: {
        tags: ['MCP'],
        summary: 'Get cognitive state',
        description: 'Get current cognitive state via MCP',
        responses: {
          '200': {
            description: 'Cognitive state',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CognitiveStateResponse' }
              }
            }
          }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtained from /auth/token endpoint'
      },
      apiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'X-API-Key',
        description: 'API key provided by 371 Minds'
      }
    },
    schemas: {
      HealthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          service: { type: 'string', example: 'api-gateway' },
          status: { type: 'string', example: 'healthy' },
          version: { type: 'string', example: '1.0.0' },
          timestamp: { type: 'string', format: 'date-time' }
        }
      },
      ServicesHealthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          gateway: { type: 'string', example: 'healthy' },
          services: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                status: { type: 'string', enum: ['healthy', 'unhealthy', 'unavailable'] },
                statusCode: { type: 'integer' }
              }
            }
          },
          timestamp: { type: 'string', format: 'date-time' }
        }
      },
      TokenResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          token: { type: 'string' },
          expiresIn: { type: 'string', example: '24h' }
        }
      },
      UserResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string', format: 'email' },
              roles: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: { type: 'string' },
          message: { type: 'string' }
        }
      },
      ProposalsListResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { type: 'array', items: { $ref: '#/components/schemas/Proposal' } },
          metadata: {
            type: 'object',
            properties: {
              total: { type: 'integer' },
              page: { type: 'integer' },
              limit: { type: 'integer' }
            }
          }
        }
      },
      Proposal: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          type: { type: 'string', enum: ['strategic', 'financial', 'technical', 'governance', 'emergency'] },
          status: { type: 'string', enum: ['draft', 'submitted', 'voting', 'passed', 'rejected', 'executed'] },
          proposer: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' }
        }
      },
      CreateProposalRequest: {
        type: 'object',
        required: ['title', 'description', 'type', 'proposer'],
        properties: {
          title: { type: 'string', minLength: 5, maxLength: 200 },
          description: { type: 'string', minLength: 20 },
          type: { type: 'string', enum: ['strategic', 'financial', 'technical', 'governance', 'emergency'] },
          proposer: { type: 'string' },
          budgetRequest: { type: 'number' },
          executionDetails: { type: 'object' }
        }
      },
      ProposalResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          data: { $ref: '#/components/schemas/Proposal' }
        }
      },
      CreateCampaignRequest: {
        type: 'object',
        required: ['campaignData'],
        properties: {
          campaignData: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              subject: { type: 'string' },
              recipients: { type: 'array', items: { type: 'string', format: 'email' } },
              template: { type: 'string' }
            }
          },
          requiresDAOApproval: { type: 'boolean', default: true }
        }
      },
      CampaignResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          campaign: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              status: { type: 'string' },
              agentApprovals: { type: 'object' },
              daoApproval: { type: 'object' }
            }
          }
        }
      },
      SendEmailRequest: {
        type: 'object',
        required: ['emailData'],
        properties: {
          emailData: {
            type: 'object',
            required: ['to', 'subject', 'body'],
            properties: {
              to: { type: 'string', format: 'email' },
              subject: { type: 'string' },
              body: { type: 'string' },
              template: { type: 'string' }
            }
          },
          useProxiedDelivery: { type: 'boolean', default: true },
          enableCognitiveOptimization: { type: 'boolean', default: true }
        }
      },
      EmailResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          email: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              status: { type: 'string' },
              verificationHash: { type: 'string' },
              deliveryMethod: { type: 'string' }
            }
          }
        }
      },
      WorkflowStatusResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          workflows: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                status: { type: 'string' },
                progress: { type: 'number' }
              }
            }
          }
        }
      },
      AgentStatusResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          coordination: {
            type: 'object',
            properties: {
              activeAgents: { type: 'array', items: { type: 'string' } },
              pendingApprovals: { type: 'integer' },
              recentActivity: { type: 'array', items: { type: 'object' } }
            }
          }
        }
      },
      AnalyticsDashboardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          analytics: {
            type: 'object',
            properties: {
              overview: { type: 'object' },
              agentPerformance: { type: 'object' },
              costOptimization: { type: 'object' },
              daoGovernance: { type: 'object' }
            }
          }
        }
      },
      MCPSearchResponse: {
        type: 'object',
        properties: {
          query: { type: 'string' },
          results: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                score: { type: 'number' }
              }
            }
          },
          totalResults: { type: 'integer' }
        }
      },
      CognitiveStateResponse: {
        type: 'object',
        properties: {
          mode: { type: 'string', enum: ['executive', 'technical', 'creative'] },
          focusLevel: { type: 'number', minimum: 0, maximum: 100 },
          cognitiveLoad: { type: 'number', minimum: 0, maximum: 100 },
          activeAgents: { type: 'array', items: { type: 'string' } }
        }
      }
    }
  }
};

export default openApiSpec;
