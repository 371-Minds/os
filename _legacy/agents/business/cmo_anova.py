import sys
import os
import asyncio

# Add the project's src directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..')))

from minds371.agents.base_agent.base_agent import Task, AgentType, BaseAgent, AgentCapability

class CmoAnovaAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="cmo_anova_agent_1",
            agent_type=AgentType.CMO,
            capabilities=[
                AgentCapability(name="Strategy & Planning", description="Develop market strategy and plan social media campaigns."),
                AgentCapability(name="Performance Analysis", description="Analyze customer acquisition cost and optimize retention programs."),
                AgentCapability(name="Competitive Analysis", description="Review competitor marketing and suggest counter-strategies.")
            ]
        )

    async def process_task(self, task: Task) -> dict:
        """
        Processes a marketing task based on its category.
        """
        description = task.description.lower()
        response_message = ""

        if "strategy" in description or "social media" in description:
            response_message = f"Strategy & Planning for '{task.description}' is underway."
        elif "customer acquisition" in description or "retention" in description:
            response_message = f"Performance Analysis for '{task.description}' is underway."
        elif "competitor" in description:
            response_message = f"Competitive Analysis for '{task.description}' is underway."
        else:
            response_message = f"Task '{task.description}' is being processed through a generic workflow."

        return {
            "status": "in_progress",
            "message": response_message
        }

    async def health_check(self) -> bool:
        """
        Performs a health check of the agent.
        """
        return True

async def main():
    """
    Main function to run the benchmark test for CmoAnovaAgent.
    """
    print("--- Starting CMO Anova Agent Benchmark ---")

    # Instantiate the CMO agent
    cmo_agent = CmoAnovaAgent()

    # The current CmoAnovaAgent is a placeholder.
    # This test suite verifies its current behavior and can be expanded
    # when the agent's delegation logic to MarketingAutomationAgent is implemented.

    benchmark_tasks = [
        Task(id="1", description="Develop market strategy for new product launch", agent_type=AgentType.CMO, payload={"product": "ProductX"}),
        Task(id="2", description="Analyze customer acquisition cost for Q3", agent_type=AgentType.CMO, payload={"quarter": "Q3 2024"}),
        Task(id="3", description="Plan a new social media campaign for brand awareness", agent_type=AgentType.CMO, payload={"goal": "brand_awareness"}),
        Task(id="4", description="Review competitor marketing and suggest counter-strategies", agent_type=AgentType.CMO, payload={"competitors": ["CompA", "CompB"]}),
        Task(id="5", description="Optimize customer retention programs", agent_type=AgentType.CMO, payload={"focus_area": "retention"}),
    ]

    print("\n--- Testing Task Processing ---")
    for task in benchmark_tasks:
        print(f"\nProcessing Task: {task.description}")
        result = await cmo_agent.process_task(task)
        print(f"Result: {result}")

        description = task.description.lower()
        expected_message = ""
        if "strategy" in description or "social media" in description:
            expected_message = f"Strategy & Planning for '{task.description}' is underway."
        elif "customer acquisition" in description or "retention" in description:
            expected_message = f"Performance Analysis for '{task.description}' is underway."
        elif "competitor" in description:
            expected_message = f"Competitive Analysis for '{task.description}' is underway."
        else:
            expected_message = f"Task '{task.description}' is being processed through a generic workflow."

        assert result["status"] == "in_progress"
        assert result["message"] == expected_message
        print("Assertion passed: Agent returned the correct message.")


    print("\n--- Testing Health Check ---")
    is_healthy = await cmo_agent.health_check()
    print(f"Health Check Passed: {is_healthy}")
    assert is_healthy is True

    print("\n--- CMO Anova Agent Benchmark Complete ---")

if __name__ == "__main__":
    asyncio.run(main())
