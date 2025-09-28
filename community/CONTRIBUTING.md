# Contributing to 371 OS

Thank you for your interest in contributing to the 371 OS - Revolutionary Autonomous Agent Operating System! This document provides guidelines for contributing to this groundbreaking project.

## 🌟 Project Overview

371 OS is the world's first cognitive-aware autonomous agent operating system, featuring:
- **Self-aware agents** that understand and modify their own workspace
- **Spatial computing interfaces** with universe-based visualization
- **97.6% cost reduction** through Akash Network deployment
- **Episodic memory management** with EPICACHE integration
- **Blockchain-based agent coordination** beyond MCP limitations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Git with GitHub access
- Basic understanding of TypeScript/JavaScript
- Familiarity with Nx workspaces (helpful)

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/371-Minds/os.git
cd os

# Navigate to main workspace
cd core/os-workspace

# Install dependencies (lightning-fast with Bun)
bun install

# Build all projects
bun nx affected -t build

# Run tests
bun test
```

## 📝 Contribution Types

### 🐛 Bug Reports
- **File location**: GitHub Issues
- **Template**: Use bug report template
- **Include**: Reproduction steps, expected behavior, environment details
- **Reference**: Check [`documentation/troubleshooting/`](../documentation/troubleshooting/) first

### ✨ Feature Requests
- **File location**: GitHub Issues  
- **Template**: Use feature request template
- **Include**: Use case, proposed solution, alternatives considered
- **Alignment**: Must align with 371 OS revolutionary vision

### 🔧 Code Contributions
- **Focus areas**:
  - ElizaOS plugin development
  - Cognitive interface enhancements
  - Agent capability improvements
  - Spatial visualization features
  - EPICACHE memory optimization
  - Akash Network integration

### 📚 Documentation
- **High priority**: 
  - Developer guides and tutorials
  - API documentation
  - Usage examples
  - Troubleshooting guides

## 🏗️ Development Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/***: Individual feature development
- **hotfix/***: Critical bug fixes

### Commit Convention
```bash
# Format: type(scope): description
feat(cognitive-engine): Add spatial universe visualization
fix(agents): Resolve memory leak in episodic storage
docs(api): Update agent coordination endpoints
test(integration): Add cross-agent communication tests
```

### Pull Request Process
1. **Create feature branch** from `develop`
2. **Implement changes** with tests
3. **Update documentation** as needed
4. **Run validation**:
   ```bash
   bun nx affected -t lint    # Code quality
   bun nx affected -t test    # Test execution
   bun nx affected -t build   # Build validation
   ```
5. **Submit PR** with detailed description
6. **Address review feedback**
7. **Squash and merge** after approval

## 🧪 Testing Guidelines

### Test Types
- **Unit tests**: Individual component testing
- **Integration tests**: Cross-component interaction
- **E2E tests**: Full workflow validation
- **Performance tests**: Benchmarking and optimization

### Test Requirements
- **Coverage**: Minimum 80% for new code
- **Performance**: No regression in benchmarks
- **Documentation**: Test scenarios documented
- **CI/CD**: All tests must pass

### Running Tests
```bash
# Run all tests
bun test

# Run specific test files
bun test packages/cognitive-engine/src/**/*.test.ts

# Run tests with coverage
bun test --coverage

# Run performance benchmarks
bun nx run testing:performance
```

## 📋 Code Standards

### TypeScript Guidelines
- **Strict mode**: Always enabled
- **Type safety**: Explicit types preferred
- **Interfaces**: Clear, documented interfaces
- **Error handling**: Comprehensive error management

### Code Quality
- **Linting**: Use Biome (replaces ESLint)
- **Formatting**: Use Biome (replaces Prettier)
- **Documentation**: JSDoc for all public APIs
- **Naming**: Clear, descriptive names

### Architecture Principles
- **Modularity**: Clear separation of concerns
- **Reusability**: DRY principle
- **Scalability**: Support for growth
- **Performance**: Optimization by default

## 🌐 Areas of Contribution

### High Priority Areas

#### 🧠 Cognitive Engine Development
- Cognitive state detection algorithms
- Mode transition optimization
- Spatial interface components
- Universe visualization engines

#### 🤖 Agent System Enhancement
- Self-awareness capabilities
- Cross-agent coordination
- Episodic memory integration
- Blockchain registry improvements

#### 💰 Cost Optimization
- Akash Network integration
- Resource allocation algorithms
- Performance monitoring
- Efficiency improvements

#### 📊 Business Intelligence
- Autonomous analytics
- Real-time dashboards
- Spatial data visualization
- Executive decision support

### Documentation Needs
- **Developer tutorials**: Step-by-step guides
- **API references**: Comprehensive API docs
- **Architecture guides**: System design explanation
- **Usage examples**: Real-world implementations

## 🎯 Contribution Guidelines

### Code Review Criteria
- **Functionality**: Does it work as intended?
- **Architecture**: Does it fit the system design?
- **Performance**: Does it maintain performance standards?
- **Documentation**: Is it properly documented?
- **Tests**: Are there adequate tests?
- **Revolutionary Impact**: Does it advance the cognitive revolution?

### Acceptance Criteria
- ✅ All tests pass
- ✅ Code quality checks pass
- ✅ Documentation updated
- ✅ Performance benchmarks maintained
- ✅ Aligns with project vision
- ✅ Reviewed by maintainers

### Review Process
1. **Automated checks**: CI/CD validation
2. **Peer review**: Code review by team
3. **Architecture review**: System design validation
4. **Final approval**: Maintainer sign-off

## 🏆 Recognition

### Contributor Recognition
- **README acknowledgment**: Major contributors listed
- **Release notes**: Contribution highlights
- **Community spotlight**: Featured contributions
- **Mentorship opportunities**: Guide new contributors

### Maintainer Path
- **Consistent contributions**: Regular, quality submissions
- **Community involvement**: Active in discussions
- **Technical expertise**: Deep understanding of systems
- **Leadership**: Mentoring other contributors

## 📞 Getting Help

### Resources
- **Documentation**: [`documentation/`](../documentation/) directory
- **Troubleshooting**: [`documentation/troubleshooting/`](../documentation/troubleshooting/)
- **Project status**: [`project-management/AB/`](../project-management/AB/)
- **Examples**: [`community/examples/`](examples/) directory

### Communication
- **GitHub Issues**: Technical questions and bugs
- **GitHub Discussions**: General discussion and ideas
- **Code Reviews**: Technical feedback and guidance
- **Documentation**: Comprehensive guides and references

## 🚀 Revolutionary Vision

271 OS is building the future of human-AI collaboration. Every contribution helps advance:

- **Cognitive-aware computing** that understands human mental states
- **Autonomous business operations** with AI C-suite coordination
- **Spatial computing interfaces** that transform how we interact with data
- **Decentralized agent networks** that operate beyond traditional limitations
- **Episodic memory systems** that enable true long-term AI intelligence

Your contributions are helping build the foundation for the next evolution of computing!

---

**Thank you for contributing to the cognitive revolution! 🧠✨**