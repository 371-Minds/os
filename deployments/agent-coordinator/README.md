# Agent Coordinator Deployment

This directory contains the deployment configuration for the Agent Coordinator component of 371 OS.

## Deployment to Akash Network

The service is configured to be deployed to the Akash Network using the GitHub Deploy feature, which provides:

- 97.6% cost reduction compared to traditional cloud providers
- Automatic builds from the GitHub repository
- Seamless deployment workflow

## Configuration

The [deploy.yml](deploy.yml) file defines:

- Resource allocation (0.25 CPU, 256MB RAM, 512MB storage)
- Environment variables for coordination configuration
- Network exposure on port 3001

## GitHub Deploy Integration

This deployment is designed to work with Akash Console's GitHub Deploy feature:

1. Connect your GitHub repository to Akash Console
2. Configure the deployment with the SDL file
3. Set environment variables in the Akash Console
4. Deploy automatically on code changes

## Environment Variables

The following environment variables need to be configured in the Akash Console:

- `COORDINATION_PORT` - Port for coordination services (default: 3001)