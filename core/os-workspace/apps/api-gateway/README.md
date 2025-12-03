# 371 OS API Gateway

**Phase 1: Foundation** - Unified API Gateway for 371 Minds Autonomous Agent Operating System

## 🚀 Overview

The API Gateway provides a centralized entry point for all 371 OS services with:

- **Unified Routing** - Single endpoint for all services
- **Authentication** - JWT and API key support
- **Authorization** - Role-based access control
- **Rate Limiting** - Per-service and global limits
- **OpenAPI Documentation** - Interactive API docs
- **Health Monitoring** - Service health checks
- **Request Tracing** - Unique request IDs

## 📦 Installation

```bash
cd core/os-workspace/apps/api-gateway
bun install
```

## 🏃 Running

### Development
```bash
bun run dev
```

### Production
```bash
bun run build
bun run start
```

## 🔐 Authentication

### API Key
Include your API key in the request header:
```
X-API-Key: your-api-key
```

### JWT Token
First, get a token:
```bash
curl -X POST http://localhost:3000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "your-api-key"}'
```

Then use the token:
```
Authorization: Bearer <your-jwt-token>
```

## 📚 API Documentation

Interactive documentation is available at:
```
http://localhost:3000/api/docs
```

OpenAPI specification:
```
http://localhost:3000/api/openapi.json
```

## 🔗 Endpoints

| Path | Service | Auth Required |
|------|---------|---------------|
| `/api/v1/governance/*` | DAO Governance | ✅ |
| `/api/v1/email/*` | Enhanced Mail-Conduit | ✅ |
| `/api/v1/workflow/*` | QuestFlow | ✅ |
| `/api/v1/agents/*` | Agent Coordination | ✅ (admin) |
| `/api/v1/analytics/*` | Business Intelligence | ✅ |
| `/api/v1/mcp/docs/*` | Documentation MCP | ❌ |
| `/api/v1/mcp/cognition/*` | Cognition MCP | ❌ |

## ⚡ Rate Limits

| Service | Window | Max Requests |
|---------|--------|--------------|
| Global | 15 min | 100 |
| Governance | 1 min | 50 |
| Email | 1 min | 30 |
| Workflow | 1 min | 60 |
| Agents | 1 min | 40 |
| Analytics | 1 min | 100 |
| MCP | 1 min | 200 |

## 🔧 Configuration

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `GATEWAY_PORT` | Gateway port | 3000 |
| `GATEWAY_HOST` | Gateway host | 0.0.0.0 |
| `JWT_SECRET` | JWT signing secret | (dev secret) |
| `JWT_EXPIRES_IN` | Token expiration | 24h |
| `CORS_ORIGIN` | Allowed origins | localhost |
| `GOVERNANCE_PORT` | Governance service | 3001 |
| `EMAIL_PORT` | Email service | 3002 |
| `WORKFLOW_PORT` | Workflow service | 3003 |
| `AGENTS_PORT` | Agents service | 3004 |
| `ANALYTICS_PORT` | Analytics service | 3005 |

## 🏥 Health Checks

Gateway health:
```bash
curl http://localhost:3000/api/v1/health
```

All services health:
```bash
curl http://localhost:3000/api/v1/health/services
```

## 📊 Response Headers

All responses include:
- `X-Request-ID` - Unique request identifier
- `X-RateLimit-Limit` - Rate limit maximum
- `X-RateLimit-Remaining` - Remaining requests
- `X-RateLimit-Reset` - Reset timestamp

## 🛡️ Security Features

- Helmet.js security headers
- CORS configuration
- Rate limiting
- Request size limits (10MB)
- Input validation
- Error sanitization in production

## 📁 Project Structure

```
apps/api-gateway/
├── src/
│   ├── config/
│   │   └── gateway.config.ts    # Configuration
│   ├── middleware/
│   │   ├── auth.middleware.ts   # Authentication
│   │   └── rate-limit.middleware.ts
│   ├── routes/
│   │   └── api.routes.ts        # Route definitions
│   ├── main.ts                  # Entry point
│   └── openapi.spec.ts          # OpenAPI specification
├── package.json
├── project.json
└── README.md
```

## 🔄 Phase 1 Checklist

- [x] Unified API Gateway
- [x] JWT Authentication
- [x] API Key Authentication
- [x] Role-based Authorization
- [x] Rate Limiting
- [x] OpenAPI Specification
- [x] Health Checks
- [x] Request Logging
- [x] Error Handling
- [x] CORS Configuration

---

*Part of the 371 OS Phase 1: Foundation implementation*
