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

Scenario: Mark a task as completed
  Given a task with ID "123" exists
  When I send a PUT request to "/tasks/123" with JSON:
    """
    { "completed": true }
    """
  Then the response status should be 200
  And the response JSON should include "id" = "123"
  And "completed" should be true

