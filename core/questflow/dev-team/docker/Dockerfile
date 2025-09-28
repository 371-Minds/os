# Use Node.js LTS
FROM node:20-alpine

# Set work directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Default command
CMD ["npm", "start"]
