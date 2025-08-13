# 371-os

Welcome to the 371-os project! This project is a comprehensive OS for running a network of AI agents.

## Codebase Structure

The project is organized into the following directories:

- **`.github/`**: Contains GitHub-specific files, including issue templates, pull request templates, and workflow configurations for CI/CD, security scans, and performance tests.
- **`configs/`**: Holds all configuration files for the system. This includes agent configurations, platform settings, and environment-specific parameters (development, staging, production).
- **`deployment/`**: Includes all necessary files for deploying the 371-os. It has subdirectories for Docker, Kubernetes, and various cloud providers (AWS, DigitalOcean), as well as deployment scripts.
- **`docs/`**: Contains all project documentation. You'll find API documentation, architectural overviews, setup guides, and examples here.
- **`examples/`**: Provides practical examples of how to use the 371-os, including basic usage and custom agent implementations.
- **`scripts/`**: A collection of utility scripts for development tasks such as code formatting, linting, running tests, generating documentation, and data migration.
- **`src/minds371/`**: The core source code of the project, organized into several subdirectories:
    - **`adaptive_llm_router/`**: Manages routing of tasks to different Large Language Models (LLMs).
    - **`agents/`**: Contains the implementations of various AI agents.
    - **`core/`**: Core components and functionalities of the 371-os.
    - **`infrastructure/`**: Code related to the project's infrastructure.
    - **`platforms/`**: Integrations with external platforms like Slack, VSCode, and web browsers.
    - **`services/`**: Various services that support the main application.
    - **`utils/`**: Utility functions and helper classes.
- **`tests/`**: Includes all tests for the project, categorized into unit, integration, and performance tests.

## JetBrains Ecosystem Integration

The 371-os project is designed to be developer-friendly and integrates seamlessly with the JetBrains ecosystem.

- **PyCharm Professional**: Ideal for backend development. The `src/minds371/` directory is the main source root. PyCharm's testing framework can be used to run the tests in the `tests/` directory.
- **WebStorm**: Can be used for any frontend development, for example, if you are working on the browser extension in `src/minds371/platforms/browser_extension/`.
- **DataGrip**: Useful for managing and inspecting the project's databases.
- **IntelliJ IDEA Ultimate**: Provides a unified development experience if you are working with multiple languages.

By setting up the project in the respective JetBrains IDEs, you can benefit from features like intelligent code completion, automated refactoring, and integrated debugging and testing tools.
