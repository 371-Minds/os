# Sample AI-Ready Specification

## Overview

This document provides a sample specification formatted for optimal consumption by AI coding assistants. It includes both OpenAPI and Gherkin formats to demonstrate how to structure specifications for AI implementation.

## API Specification (OpenAPI 3.0)

```yaml
openapi: 3.0.0
info:
  title: User Management API
  description: API for managing user accounts and profiles
  version: 1.0.0
  
servers:
  - url: https://api.example.com/v1
    description: Production server
    
paths:
  /users:
    post:
      summary: Create a new user
      description: Creates a new user account with the provided details
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserCreateRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          description: Invalid request data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '409':
          description: User already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
                
  /users/{userId}:
    get:
      summary: Get user by ID
      description: Retrieves user information by user ID
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: User data retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
                
    put:
      summary: Update user
      description: Updates user information
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserUpdateRequest'
      responses:
        '200':
          description: User updated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'
        '400':
          description: Invalid request data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '404':
          description: User not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
                
components:
  schemas:
    UserCreateRequest:
      type: object
      required:
        - email
        - firstName
        - lastName
      properties:
        email:
          type: string
          format: email
          example: "user@example.com"
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        password:
          type: string
          format: password
          minLength: 8
          example: "SecurePass123!"
          
    UserUpdateRequest:
      type: object
      properties:
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        phoneNumber:
          type: string
          example: "+1234567890"
          
    UserResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
          example: "550e8400-e29b-41d4-a716-446655440000"
        email:
          type: string
          format: email
          example: "user@example.com"
        firstName:
          type: string
          example: "John"
        lastName:
          type: string
          example: "Doe"
        createdAt:
          type: string
          format: date-time
          example: "2023-01-01T00:00:00Z"
        updatedAt:
          type: string
          format: date-time
          example: "2023-01-01T00:00:00Z"
          
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
          example: "Error message"
        code:
          type: string
          example: "ERROR_CODE"
```

## Behavioral Specifications (Gherkin)

```gherkin
Feature: User Management
  As a system administrator
  I want to manage user accounts
  So that I can control access to the system

  Background:
    Given the user management API is running
    And the database is connected

  Scenario: Create a new user with valid data
    Given I have valid user data:
      | email           | firstName | lastName |
      | john@example.com| John      | Doe      |
    When I send a POST request to "/users" with the user data
    Then I receive a 201 status code
    And the response contains the user ID
    And the user is stored in the database

  Scenario: Create a user with invalid email
    Given I have user data with invalid email:
      | email    | firstName | lastName |
      | invalid  | John      | Doe      |
    When I send a POST request to "/users" with the user data
    Then I receive a 400 status code
    And the response contains an error message "Invalid email format"
    And no user is created in the database

  Scenario: Get user by valid ID
    Given a user exists with ID "550e8400-e29b-41d4-a716-446655440000"
    When I send a GET request to "/users/550e8400-e29b-41d4-a716-446655440000"
    Then I receive a 200 status code
    And the response contains the user data
    And the user data matches the stored user

  Scenario: Get user by non-existent ID
    Given no user exists with ID "00000000-0000-0000-0000-000000000000"
    When I send a GET request to "/users/00000000-0000-0000-0000-000000000000"
    Then I receive a 404 status code
    And the response contains an error message "User not found"

  Scenario: Update user with valid data
    Given a user exists with ID "550e8400-e29b-41d4-a716-446655440000"
    And I have updated user data:
      | firstName | lastName |
      | Jane      | Smith    |
    When I send a PUT request to "/users/550e8400-e29b-41d4-a716-446655440000" with the updated data
    Then I receive a 200 status code
    And the response contains the updated user data
    And the user in the database is updated

  Scenario Outline: Validate required fields
    Given I have user data missing <field>
    When I send a POST request to "/users" with the user data
    Then I receive a 400 status code
    And the response contains an error message "Missing required field: <field>"
    
    Examples:
      | field     |
      | email     |
      | firstName |
      | lastName  |
```

## Implementation Instructions for AI Coders

### Task: Implement User Management API
```
Context: 
- Implement a REST API for user management based on the provided OpenAPI specification
- Use Node.js with Express framework
- Use MongoDB for data storage
- Implement proper error handling and validation
- Follow security best practices

Requirements:
1. Implement all endpoints defined in the OpenAPI spec
2. Use Mongoose for MongoDB object modeling
3. Implement input validation using Joi or similar library
4. Add proper error handling and HTTP status codes
5. Include comprehensive unit tests
6. Add logging for debugging and monitoring
7. Implement proper security measures (rate limiting, etc.)

Constraints:
- Use ES6+ JavaScript syntax
- Follow REST API best practices
- Use async/await for asynchronous operations
- Implement proper data validation
- Include comprehensive error handling

Acceptance Criteria:
- All API endpoints return correct responses
- Proper HTTP status codes are used
- Data is correctly stored and retrieved from MongoDB
- Input validation works as expected
- Error cases are handled properly
- Unit tests cover all functionality
```

## Database Schema

```javascript
// Mongoose schema for User
const userSchema = {
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  phoneNumber: {
    type: String,
    trim: true
  }
};
```

## Environment Variables

```
# Database configuration
MONGODB_URI=mongodb://localhost:27017/usermanagement

# API configuration
PORT=3000
API_VERSION=v1

# Security
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_SALT_ROUNDS=12

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX=100 # limit each IP to 100 requests per windowMs
```

This specification provides all necessary information for an AI coder to implement a complete user management system with proper validation, error handling, and testing.

🤖 Spec-Driven Project Plan with AI Coders (Warp, Qoder, etc.)
1. Project Overview

Project Name: [Your Idea’s Title]

Objective: Solve [problem] with accelerated AI-assisted development.

Vision/Goal: Deliver features faster and more reliably by using AI to translate specs → code.

Scope: Specs will serve as the single source of truth for AI coders.

2. Specification Foundation (AI-First)

Structured Specs: Write machine-readable specifications (OpenAPI, AsyncAPI, GraphQL schemas, or JSON/YAML) so AI coders can parse directly.

Behavioral Specs: Use Gherkin/BDD scenarios (Given/When/Then) for business rules.

Spec Repository: Store all specs in GitHub/GitLab so both humans and AI can access.

AI Prompt Templates: Prepare structured prompts (e.g., “Generate implementation for OpenAPI endpoint X with validation rules Y”) to ensure reproducibility.

3. Project Phases & Timeline (AI-Supported)
Phase	Key Activities	Deliverables	AI Role	Timeline
Phase 1: Spec Authoring	Define API contracts, data schemas, workflows	Spec docs	N/A	Week 1–2
Phase 2: Spec Review	Validate specs with stakeholders and AI	Approved specs	AI assists in review & gap detection	Week 3
Phase 3: AI Code Generation	Feed specs into Warp/Qoder to scaffold code	MVP codebase	AI generates stubs, boilerplate, tests	Month 2
Phase 4: Spec-to-Test Automation	AI generates test suites from specs	Automated tests	AI suggests/refactors tests	Month 2–3
Phase 5: Human + AI Refinement	Devs and AI coders refine edge cases, optimize	Stable MVP	AI proposes fixes & optimizations	Month 3–4
Phase 6: Pilot & Launch	Deploy pilot, monitor compliance to specs	Deployed app	AI monitors logs, suggests fixes	Month 4–5
Phase 7: Scaling & Continuous Spec Alignment	Iteratively refine specs → new features	Growth roadmap	AI keeps code aligned with evolving specs	Ongoing
4. Resources Needed

AI Coders: Warp, Qoder, GitHub Copilot, Tabnine (choose stack).

Spec Tools: Swagger/OpenAPI, GraphQL, JSON Schema, AsyncAPI.

Testing/CI/CD: AI-assisted test generation + pipeline validation (GitHub Actions, GitLab CI, Jenkins).

Human Roles:

Spec Author (writes precise, machine-readable specs).

AI Orchestrator (engineer who crafts prompts, integrates AI output).

QA (reviews AI-generated tests & edge cases).

5. Risk Management

Risk: AI generates incorrect or insecure code → Mitigation: human-in-the-loop review, automated security scanners.

Risk: Specs too vague for AI → Mitigation: enforce strict spec-writing standards.

Risk: Dependency on AI platform updates → Mitigation: build fallback dev workflows.

6. Success Metrics

Spec-to-Code Efficiency: % of features implemented directly from specs by AI.

Review Overhead: Average time human devs spend correcting AI output.

Coverage: % of features with AI-generated test suites.

Cycle Time: Time from spec approval → working feature.

7. Communication & Workflow

AI-augmented PRs: AI coders generate PRs with linked specs.

Daily Review Loops: Humans review AI-generated code, leave spec feedback.

Continuous Alignment: Specs are always the baseline for regenerating or refactoring code.

⚡ The key shift here:
Instead of devs coding directly, AI coders continuously generate, regenerate, and test implementations from specs, while humans curate, review, and refine.

Behavioral Spec (Gherkin/BDD format)

This is human-readable and great for business logic + acceptance testing.

Feature: Task management

  Scenario: Create a new task
    Given I am an authenticated user
    When I send a POST request to "/tasks" with JSON:
      """
      {
        "title": "Write spec-driven plan",
        "dueDate": "2025-09-15"
      }
      """
    Then the response status should be 201
    And the response JSON should include "id"
    And the response JSON should include "title" with value "Write spec-driven plan"
    And the response JSON should include "completed" set to false

  Scenario: Retrieve an existing task
    Given a task with ID "123" exists
    When I send a GET request to "/tasks/123"
    Then the response status should be 200
    And the response JSON should include "id" with value "123"

Copy And Save
Share
Ask Copilot

👉 AI coders can generate test suites, step definitions, and implementation code from these scenarios.

⚡ Together, these two specs form a spec-driven backbone:

OpenAPI = contracts + data schemas

Gherkin = user behavior + acceptance tests