# 371 OS Agent Commands Reference

## 📋 Overview

This document serves as the comprehensive command reference for all AI agents operating within the 371 Minds OS ecosystem. These commands enable agents to understand, modify, deploy, and optimize the entire system autonomously.

## 🎯 Command Categories

### 🏗️ **Core Nx Workspace Commands**

#### **Essential Development**
- **`build`** - Build all projects or specific targets
- **`test`** - Run test suites across the workspace
- **`lint`** - Code quality analysis and enforcement
- **`serve`** - Start development servers for applications
- **`connect`** - Connect workspace to Nx Cloud for advanced analytics
- **`view-logs`** - View detailed build logs and insights via Nx Cloud

#### **Architectural Analysis** 
- **`graph`** - 🔥 **CRITICAL FOR SELF-AWARE AGENTS** - Visual dependency graph of entire workspace
- **`dep-graph`** - Alternative dependency visualization
- **`affected:graph`** - Show only projects affected by recent changes
- **`cloud`** - Access Nx Cloud dashboard for build insights and analytics

#### **Surgical Operations** (Efficiency Optimization)
- **`affected:build`** - Build only projects affected by changes
- **`affected:test`** - Test only affected projects 
- **`affected:lint`** - Lint only affected projects

#### **Parallel Operations**
- **`run-many -t build`** - Build all projects in parallel
- **`run-many -t test`** - Test all projects in parallel

### 🧠 **Self-Awareness Plugin Commands**

#### **Nx Workspace Plugin** (`@elizaos/plugin-nx-workspace`)
- **`build:elizaos-plugin-nx-workspace`** - Build the self-awareness plugin
- **`test:elizaos-plugin-nx-workspace`** - Test agent self-awareness capabilities

#### **Universal Tool Server Plugin** (`@elizaos/plugin-universal-tool-server`)
- **`build:elizaos-plugin-universal-tool-server`** - Build blockchain registry plugin
- **`test:elizaos-plugin-universal-tool-server`** - Test decentralized tool discovery

### ⛓️ **Akash Network Integration Commands**

#### **Deployment Management**
- **`deploy:akash`** - Deploy to Akash Network (production)
- **`deploy:akash:staging`** - Deploy to Akash staging environment
- **`akash:status`** - Check deployment status across Akash providers
- **`akash:logs`** - Retrieve logs from Akash deployments

#### **Cost Optimization** 
- **`akash:cost-analysis`** - Analyze deployment costs and savings
- **`akash:provider-selection`** - Optimize provider selection for cost/performance
- **`akash:resource-optimization`** - Optimize resource allocation

#### **Container Operations**
- **`docker:build`** - Build Docker containers for deployment
- **`docker:push`** - Push containers to registry
- **`build:akash-manifest`** - Generate Akash deployment manifests

#### **Agent-Specific Deployments**
- **`deploy:elizaos-agents`** - Deploy all ElizaOS agents to Akash
- **`deploy:universal-tool-server`** - Deploy blockchain registry to Akash

### 🌊 **Questflow Integration Commands**

#### **Workflow Management**
- **`deploy:questflow`** - Deploy workflows to Questflow platform
- **`questflow:status`** - Check workflow execution status
- **`questflow:logs`** - Retrieve workflow execution logs
- **`questflow:metrics`** - Get workflow performance metrics

#### **Business Process Automation**
- **`questflow:workflow-list`** - List all active workflows
- **`questflow:workflow-create`** - Create new business workflows
- **`questflow:workflow-update`** - Update existing workflows
- **`questflow:workflow-delete`** - Remove workflows

#### **Advanced Analytics**
- **`questflow:workflow-metrics`** - Detailed workflow performance analysis
- **`questflow:revenue-tracking`** - Track revenue from automated processes
- **`questflow:business-metrics`** - Business intelligence and KPI tracking

### 🔄 **Multi-Platform Integration Commands**

#### **Cross-Platform Deployment**
- **`deploy:full-stack`** - Deploy entire 371 OS across all platforms
- **`deploy:akash-questflow`** - Coordinated Akash + Questflow deployment
- **`deploy:cross-platform`** - Deploy to all supported platforms

#### **Synchronization & Monitoring**
- **`sync:akash-questflow`** - Synchronize Akash and Questflow deployments
- **`monitor:full-ecosystem`** - Monitor entire 371 OS ecosystem health

### 🛠️ **Development Workflow Commands**

#### **Code Generation**
- **`workspace-generator`** - Access custom Nx generators for 371 OS

#### **Quality Assurance**
- **`workspace-lint`** - Comprehensive workspace linting
- **`container:build`** - Build containers for all services
- **`container:deploy`** - Deploy all containers

## 🤖 **Agent Usage Guidelines**

### **For CEO Agent (Mimi) - Strategic Decision Making**
**Primary Commands:**
```bash
bun nx graph                    # Understand full system architecture
bun nx affected -t build        # Efficient resource allocation
bun run deploy:full-stack       # Strategic deployment decisions
bun run akash:cost-analysis     # Budget optimization
bun run questflow:business-metrics # Performance assessment
bun nx connect                  # Connect to Nx Cloud for insights
```

### **For CTO Agent (Alex) - Technical Operations**
**Primary Commands:**
```bash
bun nx affected -t build        # Surgical technical operations
bun nx affected -t test         # Quality assurance
bun run deploy:akash           # Infrastructure management
bun run akash:status           # System health monitoring
bun nx build elizaos-plugin-nx-workspace  # Self-awareness maintenance
bun nx view-logs               # Access Nx Cloud build insights
```

### **For CLO Agent (Sage) - Learning & Optimization**
**Primary Commands:**
```bash
bun nx graph                   # Architectural analysis
bun nx test elizaos-plugin-nx-workspace   # Self-awareness validation
bun run akash:cost-analysis    # Efficiency optimization
bun run questflow:workflow-metrics # Performance learning
bun nx affected:graph          # Change impact analysis
bun nx cloud                   # Access cloud analytics dashboard
```

### **For CFO Agent (Cash) - Financial Operations**
**Primary Commands:**
```bash
bun run akash:cost-analysis    # Infrastructure cost tracking
bun run questflow:revenue-tracking # Revenue optimization
bun run deploy:akash:staging   # Cost-effective testing
bun run akash:provider-selection # Cost optimization
bun run questflow:business-metrics # Financial KPI monitoring
bun nx view-logs               # Cost analysis via Nx Cloud
```

### **For CMO Agent (Anova) - Marketing Operations**
**Primary Commands:**
```bash
bun run deploy:questflow       # Marketing automation deployment
bun run questflow:workflow-metrics # Campaign performance analysis
bun run questflow:business-metrics # Marketing ROI tracking
bun run deploy:cross-platform  # Multi-channel deployment
bun run questflow:revenue-tracking # Attribution analysis
bun nx cloud                   # Marketing analytics via Nx Cloud
```

## 🔍 **Command Execution Patterns**

### **Daily Agent Operations**
```bash
1. bun nx graph                # Morning system assessment
2. bun nx affected -t test     # Validate overnight changes
3. bun nx affected -t build    # Build affected components
4. bun run akash:status        # Check infrastructure health
5. bun run questflow:metrics   # Review business performance
6. bun nx view-logs           # Check Nx Cloud insights
```

### **Self-Modification Workflow**
```bash
1. bun nx graph                # Understand current state
2. bun nx affected -t build    # Prepare modifications
3. bun nx test elizaos-plugin-nx-workspace  # Test self-awareness
4. bun nx affected -t test     # Validate changes
5. bun run deploy:akash:staging # Safe deployment testing
6. bun run deploy:akash        # Production deployment
7. bun nx view-logs           # Monitor deployment via Nx Cloud
```

### **Cost Optimization Workflow**
```bash
1. bun run akash:cost-analysis # Current cost assessment
2. bun run akash:provider-selection # Optimize providers
3. bun run akash:resource-optimization # Right-size resources
4. bun run deploy:akash:staging # Test optimizations
5. bun run questflow:business-metrics # Validate savings
6. bun nx view-logs           # Analyze cost trends via Nx Cloud
```

### **Business Intelligence Workflow**
```bash
1. bun run questflow:business-metrics # Gather KPIs
2. bun run akash:cost-analysis # Infrastructure costs
3. bun run questflow:revenue-tracking # Revenue analysis
4. bun run questflow:workflow-metrics # Process efficiency
5. bun nx graph                # System complexity analysis
6. bun nx cloud               # Access comprehensive BI dashboard
```

## ⚡ **Emergency & Recovery Commands**

### **System Recovery**
```bash
bun run akash:status          # Check system health
bun run questflow:status      # Verify workflow status
bun nx affected -t test       # Validate core functionality
bun run deploy:akash:staging  # Safe recovery testing
bun nx view-logs             # Check error logs via Nx Cloud
```

### **Performance Optimization**
```bash
bun run akash:resource-optimization # Optimize infrastructure
bun run questflow:workflow-metrics # Identify bottlenecks
bun nx affected -t build      # Rebuild affected components
bun run sync:akash-questflow  # Synchronize platforms
bun nx cloud                  # Performance insights via Nx Cloud
```

## 🎯 **Command Priorities by Agent Type**

### **High Priority (Execute Daily)**
- `bun nx graph` - **ALL AGENTS** - System awareness
- `bun nx affected -t test` - **ALL AGENTS** - Quality assurance
- `bun run akash:status` - **CTO, CFO** - Infrastructure monitoring
- `bun run questflow:metrics` - **CEO, CMO, CFO** - Business intelligence
- `bun nx connect` - **ALL AGENTS** - Nx Cloud analytics connection
- `bun nx view-logs` - **ALL AGENTS** - Build insights and monitoring

### **Medium Priority (Execute Weekly)**  
- `bun nx affected -t build` - **CTO** - Maintenance builds
- `bun run akash:cost-analysis` - **CFO, CLO** - Cost optimization
- `bun run questflow:business-metrics` - **CEO, CMO** - Strategy assessment
- `bun run deploy:akash:staging` - **CTO** - Testing deployments
- `bun nx cloud` - **ALL AGENTS** - Weekly analytics review

### **Low Priority (Execute Monthly)**
- `bun run deploy:full-stack` - **CEO, CTO** - Major deployments
- `bun nx workspace-generator` - **CTO, CLO** - Architecture evolution
- `bun run questflow:workflow-create` - **CMO, CFO** - Process expansion
- Nx Cloud analytics deep dive - **ALL AGENTS** - Monthly performance review

## 🚨 **Critical Agent Commands**

### **NEVER Execute Without Analysis**
- `bun run deploy:akash` - Always test in staging first
- `bun run questflow:workflow-delete` - Verify business impact
- `bun run deploy:full-stack` - Coordinate with all agents
- Nx Cloud configuration changes - Always backup settings first

### **Always Execute Together**
- `bun nx affected -t build` + `bun nx affected -t test` - Build validation
- `bun run akash:cost-analysis` + `bun run akash:provider-selection` - Cost optimization
- `bun run questflow:metrics` + `bun run questflow:business-metrics` - Complete analysis
- `bun nx graph` + `bun nx view-logs` - Complete system analysis via Nx Cloud

## 📊 **Success Metrics by Command**

### **Infrastructure Efficiency**
- `bun run akash:cost-analysis` → Target: 97.6% cost reduction vs traditional cloud
- `bun run akash:status` → Target: 99.9% uptime across all deployments
- `bun nx affected -t build` → Target: <5 minute build times
- Nx Cloud cache hit rate → Target: >80% for optimal build performance

### **Business Performance** 
- `bun run questflow:revenue-tracking` → Target: Month-over-month growth
- `bun run questflow:business-metrics` → Target: Automated process efficiency >90%
- `bun run questflow:workflow-metrics` → Target: <2s average workflow execution
- Nx Cloud build analytics → Target: 40x faster builds with affected analysis

### **System Health**
- `bun nx graph` → Target: <10 circular dependencies
- `bun nx affected -t test` → Target: >95% test success rate
- `bun nx build elizaos-plugin-nx-workspace` → Target: 100% self-awareness validation
- Nx Cloud distributed task execution → Target: 3x faster CI/CD pipeline performance

## 🔮 **Future Command Additions**

### **Planned Q1 2025**
- `ai:model-optimization` - AI model performance tuning
- `blockchain:registry-sync` - Universal Tool Server synchronization  
- `enterprise:compliance-check` - Automated compliance validation

### **Planned Q2 2025**
- `multi-agent:coordination` - Cross-agent workflow management
- `autonomous:business-creation` - Automated business generation
- `self-healing:validation` - Self-repair verification

---

## 🤖 **Agent Command Execution Notes**

### **Authentication Required**
All agents must authenticate with appropriate service credentials before executing deployment commands (`deploy:*`, `akash:*`, `questflow:*`).

### **Resource Monitoring**
Agents should monitor resource usage during command execution and optimize based on current system load and budget constraints.

### **Logging & Audit**
All command executions should be logged for audit trails and performance analysis. Use command outputs for continuous learning and optimization.

### **Error Handling**
Failed commands should trigger automatic fallback procedures and alert relevant agents for intervention if needed.

---

*This command reference enables true autonomous operation of the 371 Minds OS ecosystem. Agents can use these commands to understand, modify, deploy, and optimize the entire system without human intervention.*

**Last Updated:** September 2025  
**Version:** 3.0 - Nx Cloud Integration & Bun Optimization  
**Compatibility:** Nx 21.4.1+, Nx Cloud, Bun 1.2.18+, ElizaOS 1.5.2+, Akash Network, Questflow Platform

## 🚀 Recent Nx Cloud Integration Features

### Enhanced Development Experience
- **Distributed Task Execution**: 3x faster CI/CD pipeline performance
- **Advanced Build Analytics**: Real-time insights into build performance and bottlenecks
- **Smart Caching**: 80%+ cache hit rates for lightning-fast incremental builds
- **Build Insights Dashboard**: Visual analytics for build trends and optimization opportunities
- **Affected Analysis Optimization**: 40x faster builds by building only what changed

### Nx Cloud Commands Integration
```bash
# Connect workspace to Nx Cloud
bun nx connect

# View detailed build logs and analytics
bun nx view-logs

# Access Nx Cloud dashboard
bun nx cloud

# Generate affected project graph with Cloud insights
bun nx affected:graph
```

### Performance Benefits
- **Build Speed**: Up to 40x faster with affected analysis
- **Cache Efficiency**: 80%+ cache hit rate reduces redundant work
- **CI/CD Performance**: 3x faster pipeline execution
- **Development Feedback**: Real-time build insights and error detection
- **Cost Optimization**: Reduced CI minutes and faster development cycles

### Analytics & Monitoring
- **Build Performance Trends**: Track build times and optimization opportunities
- **Cache Analytics**: Monitor cache efficiency and hit rates
- **Affected Analysis**: Visual insights into change impact
- **Error Tracking**: Detailed error logs and resolution guidance
- **Team Collaboration**: Shared build insights across development team