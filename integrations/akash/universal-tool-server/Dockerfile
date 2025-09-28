FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application
COPY dist/ dist/

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/health', (res) => { if (res.statusCode !== 200) process.exit(1); }) || process.exit(1)"

# Start application
CMD ["node", "dist/packages/elizaos-plugins/universal-tool-server/src/index.js"]