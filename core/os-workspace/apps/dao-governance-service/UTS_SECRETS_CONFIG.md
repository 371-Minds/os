# Universal Tool Server (UTS) Secrets Configuration

This document describes the secrets that need to be populated in the Universal Tool Server for the DAO Governance Service to operate in zero-trust mode.

## Required Secrets

### Database Credentials (dao-governance-db)

The following secrets must be stored in the UTS at the specified paths:

#### Database Username
- **Path**: `http://uts.internal/secrets/dao-governance-db/username`
- **Type**: String
- **Example**: `dao_governance_user`
- **Description**: Database user with appropriate permissions for governance operations

#### Database Password
- **Path**: `http://uts.internal/secrets/dao-governance-db/password`
- **Type**: String (sensitive)
- **Description**: Password for the database user
- **Security**: Must be rotated every 90 days

#### Database Host
- **Path**: `http://uts.internal/secrets/dao-governance-db/host`
- **Type**: String
- **Example**: `tidb.371minds.production.com` or `postgres.akash.network`
- **Description**: Fully qualified domain name or IP address of the database server

#### Database Port
- **Path**: `http://uts.internal/secrets/dao-governance-db/port`
- **Type**: Number
- **Example**: `5432` (PostgreSQL) or `4000` (TiDB)
- **Description**: Port number for database connections

---

### Novu API Credentials

#### Novu API Key
- **Path**: `http://uts.internal/secrets/novu/api-key`
- **Type**: String (sensitive)
- **Description**: API key for Novu notification service
- **Format**: Bearer token
- **Security**: Must be rotated every 180 days

#### Novu API URL
- **Path**: `http://uts.internal/secrets/novu/api-url`
- **Type**: String
- **Example**: `https://api.novu.co` or self-hosted endpoint
- **Description**: Base URL for Novu API endpoint

---

### Blockchain RPC Credentials (Optional)

#### Blockchain RPC URL
- **Path**: `http://uts.internal/secrets/blockchain/rpc-url`
- **Type**: String
- **Example**: `https://mainnet.infura.io/v3/YOUR-PROJECT-ID`
- **Description**: RPC endpoint for blockchain interactions

#### Blockchain API Key
- **Path**: `http://uts.internal/secrets/blockchain/api-key`
- **Type**: String (sensitive)
- **Description**: API key for blockchain RPC provider
- **Security**: Must be rotated every 180 days

---

## Populating Secrets in UTS

### Using UTS API

```bash
# Store database username
curl -X POST http://uts.internal/secrets/dao-governance-db/username \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "dao_governance_user"}'

# Store database password (SENSITIVE - Use secure method)
curl -X POST http://uts.internal/secrets/dao-governance-db/password \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "SECURE_PASSWORD_HERE", "encrypted": true}'

# Store database host
curl -X POST http://uts.internal/secrets/dao-governance-db/host \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "tidb.371minds.production.com"}'

# Store database port
curl -X POST http://uts.internal/secrets/dao-governance-db/port \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "5432"}'

# Store Novu API key
curl -X POST http://uts.internal/secrets/novu/api-key \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "NOVU_API_KEY_HERE", "encrypted": true}'

# Store Novu API URL
curl -X POST http://uts.internal/secrets/novu/api-url \
  -H "Authorization: Bearer ${UTS_ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"value": "https://api.novu.co"}'
```

### Using UTS CLI (if available)

```bash
# Install UTS CLI
npm install -g @371minds/uts-cli

# Authenticate
uts-cli auth login

# Store secrets
uts-cli secrets set dao-governance-db/username "dao_governance_user"
uts-cli secrets set dao-governance-db/password "SECURE_PASSWORD" --encrypted
uts-cli secrets set dao-governance-db/host "tidb.371minds.production.com"
uts-cli secrets set dao-governance-db/port "5432"
uts-cli secrets set novu/api-key "NOVU_API_KEY" --encrypted
uts-cli secrets set novu/api-url "https://api.novu.co"
```

---

## Security Best Practices

1. **Encryption at Rest**: All sensitive secrets (passwords, API keys) must be encrypted in the UTS storage
2. **Access Control**: Use UTS RBAC to limit which services can access which secrets
3. **Audit Logging**: Enable audit logs in UTS to track all secret access attempts
4. **Rotation Policy**: Implement automated secret rotation using UTS rotation policies
5. **Backup**: Ensure UTS has encrypted backups with disaster recovery procedures

---

## Verification

After populating secrets, verify they are accessible:

```bash
# Test database secret retrieval
curl http://uts.internal/secrets/dao-governance-db/username \
  -H "Authorization: Bearer ${SERVICE_TOKEN}"

# Test Novu secret retrieval
curl http://uts.internal/secrets/novu/api-key \
  -H "Authorization: Bearer ${SERVICE_TOKEN}"
```

---

## Migration from Environment Variables

If migrating from existing `.env` files:

1. **Identify Current Secrets**: Review `.env` files for database and API credentials
2. **Map to UTS Paths**: Use the paths specified in this document
3. **Populate UTS**: Use the API or CLI methods above
4. **Update Application**: Ensure application uses broker localhost endpoints
5. **Test**: Verify application connects successfully through broker
6. **Remove .env**: Delete or archive old `.env` files (DO NOT commit to git)

---

## Troubleshooting

### Broker Cannot Fetch Secrets
- Check UTS authentication token is correctly set in broker environment
- Verify network connectivity from broker to UTS
- Check UTS audit logs for access denied errors

### Application Connection Fails
- Verify application is connecting to `127.0.0.1:5432` (localhost)
- Check Secretless Broker logs for injection errors
- Ensure secrets exist at the specified UTS paths

### Performance Issues
- Consider UTS caching for frequently accessed secrets
- Monitor UTS response times
- Implement circuit breakers for UTS unavailability

---

**Last Updated**: October 11, 2025  
**Owner**: 371 Minds Infrastructure Team  
**Classification**: Internal - Zero-Trust Architecture
