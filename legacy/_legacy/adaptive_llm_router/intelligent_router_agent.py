import asyncio
import json
from typing import Dict, Any
import uuid

from minds371.agents.base_agent.improved_base_agent import ImprovedBaseAgent, Task, AgentType, TaskStatus
from minds371.agents.mindscript_agent import LogicExtractorAgent

class IntelligentRouterAgent(ImprovedBaseAgent):
    """
    An intelligent router that uses MindScript to understand commands
    and routes them to the appropriate C-Suite agent.
    """
    def __init__(self):
        super().__init__(
            agent_id="intelligent_router_agent",
            agent_type=AgentType.INTELLIGENT_ROUTER,
        )
        self.mindscript = LogicExtractorAgent()
        self.logger.info("IntelligentRouterAgent initialized with MindScript.")

    async def process_task(self, task: Task) -> Dict[str, Any]:
        """
        Processes the task by extracting logic and then routing.
        """
        self.logger.info(f"IntelligentRouterAgent received task: {task.id}")

        # 1. Get the user's command from the incoming task payload
        command = task.payload.get('command')
        if not command:
            self.logger.error("No command found in task payload.")
            return {"status": "failed", "error": "No command found in task payload."}

        # 2. Use MindScript to get the structured logic
        # We pass the original task to the mindscript agent
        structured_logic = await self.mindscript.process_task(task)

        # 3. Log the structured output
        self.logger.info(f"MindScript extracted: {json.dumps(structured_logic, indent=2)}")

        # 4. Use the structured category to route the task
        structured_payload = structured_logic.get('structured_payload', {})
        category = structured_payload.get('category')

        routing_decision = {"status": "routing_failed", "details": "No matching route found."}

        target_agent_type = None
        if category == "utility_belt":
            target_agent_type = AgentType.CTO # Example delegation
        elif category == "business":
            target_agent_type = AgentType.CMO # Example delegation

        if target_agent_type:
            # Create a new task for the delegated agent
            new_task_id = str(uuid.uuid4())
            new_task = Task(
                id=new_task_id,
                description=f"Delegated task from {task.id}: {task.description}",
                agent_type=target_agent_type,
                payload=structured_payload,
                status=TaskStatus.QUEUED
            )
            self.logger.info(f"Creating new task {new_task_id} for agent {target_agent_type.value}.")

            # In a real system, this task would be submitted to a central queue.
            # Here, we return the details of the task to be created.
            routing_decision = {
                "status": "routing_complete",
                "delegated_to": target_agent_type.value,
                "new_task_id": new_task.id,
                "new_task_payload": new_task.payload
            }

        return routing_decision

    async def health_check(self) -> bool:
        """
        Health check for the Intelligent Router agent.
        """
        return True

async def main():
    """
    Example usage and test for the IntelligentRouterAgent.
    """
    router_agent = IntelligentRouterAgent()

    test_command = 'Can you please find services in utility belt with tag "beta"?'

    task = Task(
        id="router_test_task_123",
        description="Test intelligent routing",
        agent_type=AgentType.INTELLIGENT_ROUTER,
        payload={'command': test_command},
    )

    print(f"Submitting task to router: '{test_command}'")
    result = await router_agent.process_task(task)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    # This is a simplified setup. In a real scenario, the agent's worker
    # would be started to process tasks from a queue.
    asyncio.run(main())
