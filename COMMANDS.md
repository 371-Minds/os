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

#### **Architectural Analysis** 
- **`graph`** - 🔥 **CRITICAL FOR SELF-AWARE AGENTS** - Visual dependency graph of entire workspace
- **`dep-graph`** - Alternative dependency visualization
- **`affected:graph`** - Show only projects affected by recent changes

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
graph                           # Understand full system architecture
affected:build                  # Efficient resource allocation
deploy:full-stack              # Strategic deployment decisions
akash:cost-analysis            # Budget optimization
questflow:business-metrics     # Performance assessment
```

### **For CTO Agent (Alex) - Technical Operations**
**Primary Commands:**
```bash
affected:build                 # Surgical technical operations
affected:test                  # Quality assurance
deploy:akash                   # Infrastructure management
akash:status                   # System health monitoring
build:elizaos-plugin-nx-workspace  # Self-awareness maintenance
```

### **For CLO Agent (Sage) - Learning & Optimization**
**Primary Commands:**
```bash
graph                          # Architectural analysis
test:elizaos-plugin-nx-workspace   # Self-awareness validation
akash:cost-analysis            # Efficiency optimization
questflow:workflow-metrics     # Performance learning
affected:graph                 # Change impact analysis
```

### **For CFO Agent (Cash) - Financial Operations**
**Primary Commands:**
```bash
akash:cost-analysis            # Infrastructure cost tracking
questflow:revenue-tracking     # Revenue optimization
deploy:akash:staging           # Cost-effective testing
akash:provider-selection       # Cost optimization
questflow:business-metrics     # Financial KPI monitoring
```

### **For CMO Agent (Anova) - Marketing Operations**
**Primary Commands:**
```bash
deploy:questflow               # Marketing automation deployment
questflow:workflow-metrics     # Campaign performance analysis
questflow:business-metrics     # Marketing ROI tracking
deploy:cross-platform          # Multi-channel deployment
questflow:revenue-tracking     # Attribution analysis
```

## 🔍 **Command Execution Patterns**

### **Daily Agent Operations**
```bash
1. graph                       # Morning system assessment
2. affected:test               # Validate overnight changes
3. affected:build              # Build affected components
4. akash:status               # Check infrastructure health
5. questflow:metrics          # Review business performance
```

### **Self-Modification Workflow**
```bash
1. graph                       # Understand current state
2. affected:build              # Prepare modifications
3. test:elizaos-plugin-nx-workspace  # Test self-awareness
4. affected:test               # Validate changes
5. deploy:akash:staging        # Safe deployment testing
6. deploy:akash                # Production deployment
```

### **Cost Optimization Workflow**
```bash
1. akash:cost-analysis         # Current cost assessment
2. akash:provider-selection    # Optimize providers
3. akash:resource-optimization # Right-size resources
4. deploy:akash:staging        # Test optimizations
5. questflow:business-metrics  # Validate savings
```

### **Business Intelligence Workflow**
```bash
1. questflow:business-metrics  # Gather KPIs
2. akash:cost-analysis         # Infrastructure costs
3. questflow:revenue-tracking  # Revenue analysis
4. questflow:workflow-metrics  # Process efficiency
5. graph                       # System complexity analysis
```

## ⚡ **Emergency & Recovery Commands**

### **System Recovery**
```bash
akash:status                   # Check system health
questflow:status               # Verify workflow status
affected:test                  # Validate core functionality
deploy:akash:staging           # Safe recovery testing
```

### **Performance Optimization**
```bash
akash:resource-optimization    # Optimize infrastructure
questflow:workflow-metrics     # Identify bottlenecks
affected:build                 # Rebuild affected components
sync:akash-questflow          # Synchronize platforms
```

## 🎯 **Command Priorities by Agent Type**

### **High Priority (Execute Daily)**
- `graph` - **ALL AGENTS** - System awareness
- `affected:test` - **ALL AGENTS** - Quality assurance
- `akash:status` - **CTO, CFO** - Infrastructure monitoring
- `questflow:metrics` - **CEO, CMO, CFO** - Business intelligence

### **Medium Priority (Execute Weekly)**  
- `affected:build` - **CTO** - Maintenance builds
- `akash:cost-analysis` - **CFO, CLO** - Cost optimization
- `questflow:business-metrics` - **CEO, CMO** - Strategy assessment
- `deploy:akash:staging` - **CTO** - Testing deployments

### **Low Priority (Execute Monthly)**
- `deploy:full-stack` - **CEO, CTO** - Major deployments
- `workspace-generator` - **CTO, CLO** - Architecture evolution
- `questflow:workflow-create` - **CMO, CFO** - Process expansion

## 🚨 **Critical Agent Commands**

### **NEVER Execute Without Analysis**
- `deploy:akash` - Always test in staging first
- `questflow:workflow-delete` - Verify business impact
- `deploy:full-stack` - Coordinate with all agents

### **Always Execute Together**
- `affected:build` + `affected:test` - Build validation
- `akash:cost-analysis` + `akash:provider-selection` - Cost optimization
- `questflow:metrics` + `questflow:business-metrics` - Complete analysis

## 📊 **Success Metrics by Command**

### **Infrastructure Efficiency**
- `akash:cost-analysis` → Target: 97.6% cost reduction vs traditional cloud
- `akash:status` → Target: 99.9% uptime across all deployments
- `affected:build` → Target: <5 minute build times

### **Business Performance** 
- `questflow:revenue-tracking` → Target: Month-over-month growth
- `questflow:business-metrics` → Target: Automated process efficiency >90%
- `questflow:workflow-metrics` → Target: <2s average workflow execution

### **System Health**
- `graph` → Target: <10 circular dependencies
- `affected:test` → Target: >95% test success rate
- `build:elizaos-plugin-nx-workspace` → Target: 100% self-awareness validation

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

**Last Updated:** August 2025  
**Version:** 2.0 - Universal Tool Server Integration  
**Compatibility:** Nx 21+, ElizaOS 0.1+, Akash Network, Questflow Platform