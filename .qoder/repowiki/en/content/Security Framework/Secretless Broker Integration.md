# Secretless Broker Integration

<cite>
**Referenced Files in This Document**   
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [secretless.yml](file://config/security/secretless.yml)
- [start-with-security.sh](file://scripts/start-with-security.sh)
- [secretless-integration.ts](file://packages/enterprise-security/src/secretless-integration.ts)
- [aci-integration.ts](file://packages/enterprise-security/src/aci-integration.ts)
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [Sessions Architecture Deep Dive.md](file://elizaos/Deep Dive/Sessions Architecture Deep Dive.md)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture Overview](#architecture-overview)
3. [Credential Management and Lifecycle](#credential-management-and-lifecycle)
4. [Token Acquisition and Injection Mechanism](#token-acquisition-and-injection-mechanism)
5. [Integration with Credential Warehouse Agent](#integration-with-credential-warehouse-agent)
6. [Configuration Parameters](#configuration-parameters)
7. [Common Issues and Mitigation Strategies](#common-issues-and-mitigation-strategies)
8. [Performance Implications and Caching](#performance-implications-and-caching)
9. [Security Benefits](#security-benefits)

## Introduction
The Secretless Broker Integration is a critical component of the Security Framework designed to eliminate the need for applications and agents to directly handle sensitive credentials. By acting as a secure proxy, the Secretless Broker intercepts outbound service calls and transparently injects authentication tokens, ensuring credentials are never exposed to the calling agent or stored in configuration files, environment variables, or agent memory. This document details the architecture, implementation, and operational aspects of the Secretless Broker, focusing on its integration with ACI.dev for dynamic token issuance and the Credential Warehouse Agent for centralized credential lifecycle management.

## Architecture Overview

```mermaid
graph TD
subgraph "Agent Environment"
A[Agent Application]
B[Secretless Broker]
end
subgraph "External Services"
C[ACI.dev Token Service]
D[Target Service<br/>(Database, API, SSH)]
E[Credential Warehouse]
end
A --> |Connect to localhost:8081| B
B --> |Request identity credential| C
C --> |Issue short-lived token| B
B --> |Retrieve service credentials| E
B --> |Authenticate and proxy| D
E --> |Audit log| E
B --> |Stream data| A
style A fill:#f9f,stroke:#333
style B fill:#bbf,stroke:#333
style C fill:#f96,stroke:#333
style D fill:#9f9,stroke:#333
style E fill:#6cf,stroke:#333
```

**Diagram sources**
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L858-L878)
- [secretless.yml](file://config/security/secretless.yml)

**Section sources**
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L806-L820)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html#L528-L550)

## Credential Management and Lifecycle

The Secretless Broker operates in conjunction with the Credential Warehouse Agent to provide centralized management of credentials. The Credential Warehouse Agent securely stores credentials using AES encryption and enforces role-based access control between agents. It maintains comprehensive audit logging for all credential access and operations.

```python
# Example of credential storage and retrieval
async def run_credential_warehouse_benchmark():
    warehouse = SecureCredentialWarehouse(master_key="test-master-key")
    
    # Store a credential
    cred_id = await warehouse.store_credential(
        name="DigitalOcean API Key",
        credential_type="digital_ocean_api",
        credential_data={"api_token": "do_tok_1234567890abcdef"},
        agent_id="devops_agent_003",
        tags=["cloud", "production"]
    )
    
    # Retrieve a credential
    retrieved = await warehouse.retrieve_credential(cred_id, agent_id="devops_agent_003")
```

The Credential Warehouse supports credential rotation, access granting, and expiration tracking. Only the credential creator can grant access to other agents, enforcing strict access control. The system automatically checks for expiring credentials and can trigger rotation workflows.

**Section sources**
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py#L0-L202)

## Token Acquisition and Injection Mechanism

The Secretless Broker uses a multi-step process to authenticate with external services on behalf of agents. When an agent connects to the Secretless Broker, the broker authenticates with ACI.dev to obtain an identity credential, which is then used to retrieve service-specific credentials from the Credential Warehouse.

```yaml
# config/security/secretless.yml
version: "2"
services:
  - name: elizaos-agents
    connector: generic_http
    authentication:
      - type: oauth2
        config:
          token_url: "${ACI_TOKEN_URL}"
          client_id: "${ACI_CLIENT_ID}"
          client_secret: "${ACI_CLIENT_SECRET}"
          scope: "agent:execute blockchain:read"
    config:
      headers:
        Authorization: "Bearer {{ .access_token }}"
```

The broker then injects these credentials into outbound requests, typically as HTTP headers or database connection parameters. The actual token value is never exposed to the agent; it is managed entirely within the Secretless Broker process.

```typescript
// packages/enterprise-security/src/secretless-integration.ts
export class SecretlessIntegration {
  async injectCredentials<T>(operation: () => Promise<T>): Promise<T> {
    const context = await this.getSecureContext();
    return await operation();
  }

  async getSecureContext(): Promise<SecureContext> {
    return {
      authenticated: true,
      permissions: await this.getPermissions(),
      auditTrail: this.initializeAuditTrail(),
    };
  }
}
```

**Section sources**
- [secretless.yml](file://config/security/secretless.yml)
- [secretless-integration.ts](file://packages/enterprise-security/src/secretless-integration.ts)
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L858-L878)

## Integration with Credential Warehouse Agent

The Secretless Broker and Credential Warehouse Agent work together to provide a comprehensive security solution. The Secretless Broker acts as the runtime credential injector, while the Credential Warehouse provides the centralized storage and lifecycle management.

When the Secretless Broker needs to establish a connection to a target service, it queries the Credential Warehouse Agent for the required credentials. The warehouse verifies the broker's authorization and returns the encrypted credential, which the broker then decrypts and uses for authentication.

This integration allows for seamless credential rotation—when a credential is rotated in the warehouse, the Secretless Broker automatically retrieves the new credential for subsequent connections, eliminating the need to restart services.

**Section sources**
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L880-L909)

## Configuration Parameters

The Secretless Broker is configured through a YAML file that specifies services, connectors, authentication methods, and injection rules.

**Key Configuration Parameters:**
- **Lease Duration**: Controlled by the OAuth2 token expiration from ACI.dev
- **Retry Policies**: Configured in the startup script with sleep intervals
- **Fallback Behaviors**: Determined by the agent's error handling in the operation callback

```bash
# scripts/start-with-security.sh
#!/bin/bash
secretless-broker -f config/security/secretless.yml &
sleep 5
npm run start:agents:production
```

The `sleep 5` command provides a basic retry mechanism, waiting for the Secretless Broker to become ready before starting agents. More sophisticated retry logic could be implemented using exponential backoff.

**Section sources**
- [start-with-security.sh](file://scripts/start-with-security.sh)
- [secretless.yml](file://config/security/secretless.yml)

## Common Issues and Mitigation Strategies

### Token Expiration During Long-Running Tasks
Long-running tasks may exceed the token's lease duration, causing authentication failures. The mitigation strategy involves implementing heartbeat mechanisms and renewal logic.

```typescript
class SessionRenewalEngine {
  attemptRenewal(session: Session): boolean {
    if (!session.timeoutConfig.autoRenew) {
      return false;
    }
    
    const totalDuration = Date.now() - session.createdAt.getTime();
    const maxDurationMs = session.timeoutConfig.maxDurationMinutes * 60 * 1000;
    
    if (totalDuration >= maxDurationMs) {
      return false;
    }
    
    session.lastActivity = new Date();
    session.expiresAt = new Date(Date.now() + effectiveTimeout);
    return true;
  }
}
```

### Network Partitioning
Network issues between the Secretless Broker and credential stores can prevent token acquisition. The system should implement circuit breaker patterns and fallback to cached credentials when possible.

```javascript
class SessionManager {
  startHeartbeat(intervalMs = 5 * 60 * 1000) {
    this.heartbeatInterval = setInterval(async () => {
      try {
        const response = await this.sendHeartbeat();
        
        if (response.isNearExpiration && !this.warningShown) {
          this.onExpirationWarning(response.timeRemaining);
          this.warningShown = true;
        }
      } catch (error) {
        this.stopHeartbeat();
        this.onSessionLost(error);
      }
    }, intervalMs);
  }
}
```

**Section sources**
- [Sessions Architecture Deep Dive.md](file://elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L225-L261)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L495-L558)

## Performance Implications and Caching

The Secretless Broker introduces a proxy layer that can impact performance, particularly during the initial authentication phase. To mitigate this, the system implements caching strategies for frequently accessed data.

```typescript
class AgentConfigCache {
  private cache = new Map<UUID, SessionTimeoutConfig>();
  private maxAge = 5 * 60 * 1000; // 5 minutes
  
  get(agentId: UUID): SessionTimeoutConfig | undefined {
    const timestamp = this.timestamps.get(agentId);
    
    if (timestamp && Date.now() - timestamp > this.maxAge) {
      this.cache.delete(agentId);
      this.timestamps.delete(agentId);
      return undefined;
    }
    
    return this.cache.get(agentId);
  }
  
  set(agentId: UUID, config: SessionTimeoutConfig) {
    this.cache.set(agentId, config);
    this.timestamps.set(agentId, Date.now());
  }
}
```

For production deployments, additional scalability considerations include:
- Using Redis for distributed session storage
- Implementing message queues for agent processing
- Database connection pooling
- Read replicas for message retrieval

The data-transfer phases of the protocol are direct pass-through between the client and target service, minimizing the performance impact after the initial authentication.

**Section sources**
- [Sessions Architecture Deep Dive.md](file://elizaos/Deep Dive/Sessions Architecture Deep Dive.md#L560-L611)
- [State Management.md](file://elizaos/Guides/State Management.md#L287-L333)
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L880-L909)

## Security Benefits

The Secretless Broker provides significant security advantages:

**Reduced Attack Surface:**
- Applications never handle credentials directly
- No credentials stored in environment variables or configuration files
- Agent memory does not contain sensitive authentication data

**Elimination of Credential Leakage Risks:**
- Prevents accidental credential exposure in logs or source control
- Protects against attacks on privileged users (phishing, machine compromise)
- Mitigates risks from application vulnerabilities (RCE, environment variable dumps)

**Simplified Audit Trails:**
- All credential access is logged through the centralized Credential Warehouse
- Comprehensive audit logs track who accessed what credential and when
- Access patterns can be monitored for anomalous behavior

**Operational Security:**
- Seamless secret rotation without service restarts
- Centralized management reduces configuration errors
- Consistent security enforcement across technologies and platforms

By abstracting credential management to a specialized module, the Secretless Broker allows developers to focus on business logic while maintaining enterprise-grade security.

**Section sources**
- [researchprotocol.md](file://thought_leadership/AASA/researchprotocol.md#L822-L837)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html#L528-L550)