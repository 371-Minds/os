# GitHub Deploy Integration for 371 OS

## Overview

This document describes the integration of GitHub Deploy feature with the 371 OS for deployment to the Akash Network. This integration enables automated, cost-effective deployment of 371 OS components while maintaining the revolutionary 97.6% cost reduction.

## Architecture

The GitHub Deploy integration follows this architecture:

```
GitHub Repository → Akash Console GitHub Deploy → Akash Network
       ↓
   GitHub Actions (CI/CD) → Docker Build → Container Registry
       ↓
   Automatic Deployment to Akash Network
```

## Benefits

1. **Automated Deployment**: Eliminates manual Docker image building and pushing
2. **Cost Optimization**: Maintains 97.6% cost reduction vs traditional cloud
3. **Streamlined Workflow**: Direct deployment from GitHub repositories
4. **Framework Detection**: Automatic configuration of deployment settings
5. **Environment Management**: Easy configuration of application settings
6. **Version Control**: Deployments tied directly to Git commits

## Supported Repository Providers

- GitHub (Primary)
- GitLab (Alternative)
- Bitbucket (Alternative)

## Supported Frameworks

The GitHub Deploy feature automatically detects and configures:

### JavaScript Frameworks
- React
- Vue.js
- Next.js
- Angular
- Ember.js

### Static Site Generators
- Gatsby.js
- Nuxt.js
- Astro
- VitePress
- 11ty.js

### Full-stack Frameworks
- Remix
- Vite
- Express.js

## Implementation Details

### 1. Repository Structure

Repositories should follow standard structures:

#### For Static Sites (React, Vue, etc.)
```
your-project/
├── package.json
├── src/
├── public/
└── README.md
```

#### For Next.js Applications
```
your-project/
├── package.json
├── pages/
├── components/
└── next.config.js
```

#### For Express.js Applications
```
your-project/
├── package.json
├── server.js
├── routes/
└── README.md
```

### 2. Required Files

- `package.json` - Must be present for Node.js applications
- `README.md` - Recommended for project documentation
- Framework-specific files - Such as `next.config.js` for Next.js

### 3. Environment Variables

Environment variables are configured in the Akash Console:

```bash
# Common environment variables
NODE_ENV=production
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

### 4. Security Considerations

- Never commit sensitive environment variables to repositories
- Use Akash Console's environment variable feature for sensitive data
- Consider Akash's secret management for production deployments

## 371 OS Deployment Configuration

### Universal Tool Server

The Universal Tool Server is configured with:

- Resource allocation: 0.25 CPU, 256MB RAM, 512MB storage
- Port exposure: 3000
- Blockchain integration environment variables

### CEO Agent

The CEO Agent is configured with:

- Resource allocation: 0.5 CPU, 512MB RAM, 1GB storage
- Port exposure: 3000
- Agent-specific environment variables

### Agent Coordinator

The Agent Coordinator is configured with:

- Resource allocation: 0.25 CPU, 256MB RAM, 512MB storage
- Port exposure: 3001
- Coordination-specific environment variables

## GitHub Actions Integration

### Workflow Configuration

GitHub Actions workflows automate the deployment process:

```yaml
name: Deploy Universal Tool Server to Akash

on:
  push:
    branches:
      - main
    paths:
      - 'packages/elizaos-plugins/universal-tool-server/**'
      - 'deployments/universal-tool-server/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build Universal Tool Server
        run: |
          bun nx build elizaos-plugin-universal-tool-server

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v4
        with:
          context: .
          file: ./deployments/universal-tool-server/Dockerfile
          push: true
          tags: |
            ghcr.io/${{ github.repository_owner }}/universal-tool-server:latest
            ghcr.io/${{ github.repository_owner }}/universal-tool-server:${{ github.sha }}

      - name: Deploy to Akash
        run: |
          # This would be replaced with actual Akash Console API calls
          echo "Deploying to Akash via GitHub Deploy feature"
```

## Best Practices

### Repository Setup
- Keep repositories public for easier deployment
- Use semantic versioning for releases
- Include proper documentation in README
- Test locally before deploying

### Deployment Configuration
- Start with minimal configuration and add complexity as needed
- Use environment variables for configuration
- Monitor deployments regularly
- Set up proper logging for debugging

### Cost Optimization
- Choose appropriate resource allocation for applications
- Monitor usage to avoid unexpected costs
- Use trial deployments for initial testing

## Troubleshooting

### Common Issues

#### Build Failures
- Check that package.json has correct build scripts
- Ensure all dependencies are properly listed
- Verify repository is public or properly connected

#### Framework Not Detected
- Ensure project follows standard structure
- Check that framework-specific files are present
- Try manually selecting framework in configuration

#### Deployment Timeout
- Check build process for hanging processes
- Ensure application starts properly
- Verify application listens on correct port

#### Environment Variables Not Working
- Check format of environment variables (KEY=value)
- Ensure application reads environment variables correctly
- Restart deployment after adding environment variables

## Advanced Configuration

### Custom Build Commands

Add custom build scripts to package.json:

```json
{
  "scripts": {
    "build": "your-custom-build-command"
  }
}
```

### Custom Domains

Configure custom domains in deployment settings:

1. Configure DNS to point to Akash deployment
2. Add domain in deployment configuration
3. Akash Console handles SSL certificate generation

### Persistent Storage

For applications requiring persistent storage:

1. Configure persistent storage in deployment settings
2. Ensure application designed to work with provided storage paths
3. Consider data backup strategies

## Examples

### React Application Deployment
Repository: https://github.com/your-username/react-app

Structure:
```
react-app/
├── package.json
├── src/
│   ├── App.js
│   └── index.js
├── public/
└── README.md
```

### Next.js Application Deployment
Repository: https://github.com/your-username/nextjs-app

Structure:
```
nextjs-app/
├── package.json
├── pages/
│   ├── index.js
│   └── _app.js
├── components/
├── next.config.js
└── README.md
```

### Express.js API Deployment
Repository: https://github.com/your-username/express-api

Structure:
```
express-api/
├── package.json
├── server.js
├── routes/
└── README.md
```

## Conclusion

The GitHub Deploy integration provides a streamlined, cost-effective deployment process for 371 OS components. By leveraging Akash Network's GitHub Deploy feature, we maintain our revolutionary cost optimization while simplifying the deployment workflow.

This integration enables:
- Rapid deployment from code to production
- Automated CI/CD through GitHub Actions
- Significant cost savings (97.6% reduction)
- Simplified management and monitoring
- Enhanced developer productivity

## Next Steps

1. Test deployment with a simple repository
2. Explore advanced configurations for production deployments
3. Join the Akash community to share experiences
4. Contribute to the 371 OS ecosystem