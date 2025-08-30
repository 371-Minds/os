import asyncio
from typing import Dict, Any

from minds371.agents.base_agent.base_agent import BaseAgent, Task, AgentType, AgentCapability


class CeoMimiAgent(BaseAgent):
    """
    CEO Mimi Agent - The strategic decision-maker of the 371 Minds OS.
    """

    def __init__(self):
        agent_id = "ceo_mimi_001"
        agent_type = AgentType.CEO
        capabilities = [
            AgentCapability(
                name="strategic_delegation",
                description="Delegates tasks to the appropriate C-suite agent.",
            )
        ]
        super().__init__(agent_id, agent_type, capabilities)

    async def process_task(self, task: Task) -> Dict[str, Any]:
        """
        Processes a task by delegating it to the appropriate agent.
        """
        description = task.description.lower()

        if any(keyword in description for keyword in ["financial", "budget", "quarterly"]):
            return {"status": "success", "message": "Delegating to CFO Cash"}
        elif any(keyword in description for keyword in ["feature", "application", "security", "infrastructure"]):
            return {"status": "success", "message": "Delegating to CTO Alex"}
        elif any(keyword in description for keyword in ["marketing", "campaign"]):
            return {"status": "success", "message": "Delegating to CMO Anova"}
        elif any(keyword in description for keyword in ["community", "outreach"]):
            return {"status": "success", "message": "Delegating to CCO Sage"}
        else:
            return {"status": "success", "message": "Task noted. No specific C-suite agent identified for delegation."}

    async def health_check(self) -> bool:
        """
        Checks if the agent is healthy.
        """
        return True

if __name__ == "__main__":
    import sys
    import os
    import asyncio

    # This allows the script to be run from the root of the repository
    sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

    from minds371.agents.base_agent.base_agent import Task, AgentType

    async def main():
        """
        Main function to run the benchmark test for CeoMimiAgent.
        """
        print("--- Starting CEO Mimi Agent Benchmark ---")

        # Instantiate the CEO agent
        ceo_agent = CeoMimiAgent()

        benchmark_tasks = [
            Task(id="1", description="Develop a new feature for the main application.", agent_type=AgentType.CEO, payload={"priority": 1}),
            Task(id="2", description="Analyze the quarterly financial results.", agent_type=AgentType.CEO, payload={"priority": 1}),
            Task(id="3", description="Launch a new marketing campaign.", agent_type=AgentType.CEO, payload={"priority": 2}),
            Task(id="4", description="Review and approve the new infrastructure budget.", agent_type=AgentType.CEO, payload={"priority": 1}),
            Task(id="5", description="Coordinate a response to a major security vulnerability.", agent_type=AgentType.CEO, payload={"priority": 0}),
        ]

        print("\n--- Testing Task Processing ---")
        for task in benchmark_tasks:
            print(f"\nProcessing Task: {task.description}")
            result = await ceo_agent.process_task(task)
            print(f"Result: {result}")

            expected_messages = {
                "1": "Delegating to CTO Alex",
                "2": "Delegating to CFO Cash",
                "3": "Delegating to CMO Anova",
                "4": "Delegating to CFO Cash",
                "5": "Delegating to CTO Alex",
            }
            expected_message = expected_messages[task.id]
            assert result["status"] == "success"
            assert result["message"] == expected_message
            print(f"Assertion passed: Agent returned the expected message: '{expected_message}'")


        print("\n--- Testing Health Check ---")
        is_healthy = await ceo_agent.health_check()
        print(f"Health Check Passed: {is_healthy}")
        assert is_healthy is True

        print("\n--- CEO Mimi Agent Benchmark Complete ---")

    asyncio.run(main())
