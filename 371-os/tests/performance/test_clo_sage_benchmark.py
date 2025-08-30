import sys
import os
import asyncio

# Add the 'src' directory to the system path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from minds371.agents.business.clo_sage import CloSageAgent
from minds371.agents.base_agent.base_agent import Task, AgentType

async def main():
    """
    Main function to run the benchmark test for CloSageAgent.
    """
    print("--- Starting CLO Sage Agent Benchmark ---")

    # Instantiate the CLO agent
    clo_agent = CloSageAgent()

    benchmark_tasks = [
        Task(id="1", description="Assess performance of CTO agent for Q3", agent_type=AgentType.CLO, payload={"agent_id": "cto_alex_001", "period": "Q3 2024"}),
        Task(id="2", description="Identify successful patterns in CFO agent's financial analysis", agent_type=AgentType.CLO, payload={"agent_id": "cfo_cash_001", "analysis_type": "pattern_recognition"}),
        Task(id="3", description="Propose optimization for CMO agent's campaign workflow", agent_type=AgentType.CLO, payload={"agent_id": "cmo_anova_001", "process": "campaign_workflow"}),
        Task(id="4", description="Analyze collaboration protocols between CEO and other agents", agent_type=AgentType.CLO, payload={"protocol_type": "communication"}),
        Task(id="5", description="Design a new knowledge transfer loop for the engineering team", agent_type=AgentType.CLO, payload={"team": "engineering"}),
    ]

    expected_responses = {
        "1": "Analyzing agent performance metrics to identify key performance indicators.",
        "2": "Identifying successful patterns in agent behavior to replicate across the system.",
        "3": "Proposing workflow optimizations based on identified patterns and performance data.",
        "4": "Monitoring and analyzing inter-agent communication protocols for bottlenecks.",
        "5": "Designing a new knowledge transfer loop to improve system-wide learning."
    }

    print("\n--- Testing Task Processing ---")
    for task in benchmark_tasks:
        print(f"\nProcessing Task: {task.description}")
        result = await clo_agent.process_task(task)
        print(f"Result: {result}")

        expected_message = expected_responses[task.id]
        assert result["status"] == "success"
        assert result["message"] == expected_message
        print("Assertion passed: Agent returned the expected message.")

    print("\n--- Testing Health Check ---")
    is_healthy = await clo_agent.health_check()
    print(f"Health Check Passed: {is_healthy}")
    assert is_healthy is True

    print("\n--- CLO Sage Agent Benchmark Complete ---")

if __name__ == "__main__":
    asyncio.run(main())
