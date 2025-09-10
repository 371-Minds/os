# 371 OS GitHub Deploy to Akash Integration

This directory contains the deployment configurations for the 371 OS components to be deployed on the Akash Network using GitHub Deploy feature.

## Overview

The 371 OS leverages Akash Network's GitHub Deploy feature to achieve 97.6% cost reduction compared to traditional cloud providers. This approach eliminates the need for manual Docker image building and pushing, streamlining the deployment process.

## Deployment Components

1. **Universal Tool Server** - The core blockchain-based coordination service
2. **CEO Agent** - The strategic decision-making component
3. **Agent Coordinator** - The component responsible for agent orchestration

## Directory Structure

```
deployments/
├── universal-tool-server/
│   ├── deploy.yml          # Akash SDL configuration
│   ├── Dockerfile          # Container definition
│   └── README.md           # Component-specific documentation
├── ceo-agent/
│   ├── deploy.yml          # Akash SDL configuration
│   └── README.md           # Component-specific documentation
├── agent-coordinator/
│   ├── deploy.yml          # Akash SDL configuration
│   └── README.md           # Component-specific documentation
└── README.md               # This file
```

## GitHub Actions Workflows

The deployment process is automated through GitHub Actions workflows located in `.github/workflows/`:

- `deploy-uts.yml` - Deploys the Universal Tool Server to Akash

## Deployment Process

1. **Connect Repository**: Connect your GitHub repository to Akash Console
2. **Configure Deployment**: Use the SDL files in each component directory
3. **Set Environment Variables**: Configure required environment variables in Akash Console
4. **Deploy**: Trigger deployment through GitHub Actions or manually via Akash Console

## Cost Optimization

By leveraging the Akash Network, 371 OS achieves significant cost savings:

- **Traditional Cloud**: ~$500/month
- **Akash Network**: ~$12/month
- **Savings**: 97.6% cost reduction

## Environment Variables

Each component requires specific environment variables to be set in the Akash Console:

### Universal Tool Server
- `ETHEREUM_RPC_URL` - Ethereum RPC endpoint
- `REGISTRY_CONTRACT_ADDRESS` - Blockchain registry contract address
- `IPFS_API_URL` - IPFS API endpoint

### CEO Agent
- `ELIZAOS_ENVIRONMENT` - Environment identifier (production/staging)
- `PORT` - Port to listen on (default: 3000)

### Agent Coordinator
- `COORDINATION_PORT` - Port for coordination services (default: 3001)

## GitHub Deploy Integration

This deployment approach uses Akash Console's GitHub Deploy feature which provides:

1. **One-click deployment** from GitHub repositories
2. **Automatic builds** without manual Docker image management
3. **Framework detection** for proper configuration
4. **Environment variable management** through the console
5. **Cost-effective deployment** at a fraction of traditional cloud costs

## Next Steps

1. Review each component's README for specific deployment instructions
2. Configure environment variables in Akash Console
3. Test deployments in staging environment
4. Monitor and optimize resource allocation