#!/bin/bash

# 371 OS - Benchmarking Environment Startup Script
# This script launches the core services required for performance benchmarking

set -e

echo "🚀 Starting 371 OS Benchmarking Environment..."
echo "=============================================="

# Function to handle script termination
cleanup() {
    echo ""
    echo "🛑 Shutting down benchmarking environment..."
    kill 0
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Change to the os-workspace directory
cd core/os-workspace

# Check if services are available and start them
echo "📋 Checking and starting core services..."

# Start C-Suite Agent Runner (port 3001 by default)
echo "🏢 Starting C-Suite Agent Runner..."
bun nx serve c-suite-agent-runner &
CSUITE_PID=$!

# Start Enhanced Mail Conduit (port 3002 by default)
echo "📧 Starting Enhanced Mail Conduit..."
bun nx serve enhanced-mail-conduit &
MAIL_PID=$!

# Start Cognitive Interface (port 3003 by default)
echo "🧠 Starting Cognitive Interface..."
bun nx serve cognitive-interface &
INTERFACE_PID=$!

echo ""
echo "✅ Benchmarking environment started successfully!"
echo "=============================================="
echo "Services running:"
echo "  • C-Suite Agent Runner (PID: $CSUITE_PID)"
echo "  • Enhanced Mail Conduit (PID: $MAIL_PID)"
echo "  • Cognitive Interface (PID: $INTERFACE_PID)"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for all background processes
wait