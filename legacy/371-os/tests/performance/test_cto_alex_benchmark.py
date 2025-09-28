import asyncio
import pytest
import sys
import os

# Add the src directory to the system path to allow imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from minds371.agents.business.cto_alex import CtoAlexAgent
from minds371.agents.base_agent.base_agent import Task, AgentType

@pytest.mark.asyncio
async def test_cto_alex_agent_benchmark():
    """
    Benchmark test for the CtoAlexAgent.
    """
    print("--- Starting CTO Alex Agent Benchmark ---")

    # Instantiate the CTO agent
    cto_agent = CtoAlexAgent()

    benchmark_tasks = [
        Task(id="1", description="Design technical architecture for new microservice", agent_type=AgentType.CTO, payload={"service_name": "AuthService"}),
        Task(id="2", description="Evaluate and select a new database technology", agent_type=AgentType.CTO, payload={"requirements": ["scalability", "low_latency"]}),
        Task(id="3", description="Oversee the response to a critical security vulnerability", agent_type=AgentType.CTO, payload={"vulnerability_id": "CVE-2024-12345"}),
        Task(id="4", description="Plan infrastructure scaling for anticipated holiday traffic", agent_type=AgentType.CTO, payload={"event": "Black Friday"}),
        Task(id="5", description="Review the quarterly budget for the engineering department", agent_type=AgentType.CTO, payload={}),
    ]

    print("\n--- Testing Task Processing ---")
    for task in benchmark_tasks:
        print(f"\nProcessing Task: {task.description}")
        result = await cto_agent.process_task(task)
        print(f"Result: {result}")

        description = task.description.lower()
        if "architecture" in description:
            assert result["status"] == "completed"
            assert "Architecture design" in result["message"]
            assert result["details"]["task"] == "Design Architecture"
        elif "evaluate" in description:
            assert result["status"] == "completed"
            assert "Technology evaluation" in result["message"]
            assert result["details"]["task"] == "Evaluate Technology"
        elif "security" in description:
            assert result["status"] == "completed"
            assert "Overseeing mitigation" in result["message"]
            assert result["details"]["task"] == "Security Response"
        elif "infrastructure" in description:
            assert result["status"] == "completed"
            assert "Infrastructure scaling plan" in result["message"]
            assert result["details"]["task"] == "Infrastructure Planning"
        else:
            assert result["status"] == "delegated"
            assert "not a direct CTO task" in result["message"]

        print("Assertion passed: Agent returned the expected response.")


    print("\n--- Testing Health Check ---")
    is_healthy = await cto_agent.health_check()
    print(f"Health Check Passed: {is_healthy}")
    assert is_healthy is True

    print("\n--- CTO Alex Agent Benchmark Complete ---")

if __name__ == "__main__":
    pytest.main([__file__])
