Feature: Task management

  Scenario: Create a new task
    Given I am an authenticated user
    When I send a POST request to "/tasks" with JSON:
      """
      { "title": "Write spec-driven plan", "dueDate": "2025-09-15" }
      """
    Then the response status should be 201
    And the response JSON should include "id"
    And "completed" should be false

  Scenario: Retrieve all tasks
    Given I have created at least one task
    When I send a GET request to "/tasks"
    Then the response status should be 200
    And the response should be a JSON array
    And the array should include a task with "title" = "Write spec-driven plan"

  Scenario: Retrieve a single task by ID
    Given a task with ID "123" exists
    When I send a GET request to "/tasks/123"
    Then the response status should be 200
    And the response JSON should include "id" = "123"

  Scenario: Retrieve a non-existent task
    When I send a GET request to "/tasks/nonexistent"
    Then the response status should be 404

  Scenario: Mark a task as completed
    Given a task with ID "123" exists
    When I send a PUT request to "/tasks/123" with JSON:
      """
      { "completed": true }
      """
    Then the response status should be 200
    And the response JSON should include "id" = "123"
    And "completed" should be true

  Scenario: Update a task’s title
    Given a task with ID "789" exists
    When I send a PATCH request to "/tasks/789" with JSON:
      """
      { "title": "Updated Task Title" }
      """
    Then the response status should be 200
    And the response JSON should include "title" = "Updated Task Title"

  Scenario: Update a task’s due date
    Given a task with ID "789" exists
    When I send a PATCH request to "/tasks/789" with JSON:
      """
      { "dueDate": "2025-09-30" }
      """
    Then the response status should be 200
    And the response JSON should include "dueDate" = "2025-09-30"

  Scenario: Delete a task by ID
    Given a task with ID "456" exists
    When I send a DELETE request to "/tasks/456"
    Then the response status should be 204

  Scenario: Delete a non-existent task
    When I send a DELETE request to "/tasks/nonexistent"
    Then the response status should be 404

  Scenario: Retrieve only completed tasks
    Given I have created tasks with completed = true and completed = false
    When I send a GET request to "/tasks?completed=true"
    Then the response status should be 200
    And the response should be a JSON array containing only tasks with "completed" = true

  Scenario: Retrieve only incomplete tasks
    Given I have created tasks with completed = true and completed = false
    When I send a GET request to "/tasks?completed=false"
    Then the response status should be 200
    And the response should be a JSON array containing only tasks with "completed" = false


