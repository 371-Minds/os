import asyncio
import uuid
import pytest
from minds371.agents.business.cpo_agent import CPOAgent
from minds371.agents.base_agent.improved_base_agent import Task, AgentType


@pytest.fixture
def mock_connectors(mocker):
    mocker.patch('minds371.agents.business.cpo_agent.JetBrainsAIConnector', autospec=True)
    mocker.patch('minds371.agents.business.cpo_agent.MedusaConnector', autospec=True)

def test_cpo_agent_analyze_feature_requests_performance(benchmark, mock_connectors):
    """
    Tests the performance of the CPO agent's analyze_feature_requests tool.
    """
    agent_id = f"cpo_agent_{uuid.uuid4()}"
    cpo_agent = CPOAgent(agent_id=agent_id)

    task = Task(
        id=str(uuid.uuid4()),
        description="analyze_feature_requests",
        agent_type=AgentType.CPO,
        payload={"feature_requests": ["new feature 1", "new feature 2"]},
    )

    async def run_task():
        # Mocking external calls to focus on the agent's logic performance
        async def mock_analyze_requirements(*args, **kwargs):
            return {"prioritized_features": ["feature 1"], "timeline": "next quarter"}

        async def mock_generate_specifications(*args, **kwargs):
            return {"specs": "detailed specs"}

        cpo_agent.jetbrains_ai.analyze_requirements = mock_analyze_requirements
        cpo_agent.jetbrains_ai.generate_specifications = mock_generate_specifications

        await cpo_agent.process_task(task)

    def f():
        asyncio.run(run_task())

    benchmark(f)


def test_cpo_agent_manage_mini_app_lifecycle_performance(benchmark, mock_connectors):
    """
    Tests the performance of the CPO agent's manage_mini_app_lifecycle tool.
    """
    agent_id = f"cpo_agent_{uuid.uuid4()}"
    cpo_agent = CPOAgent(agent_id=agent_id)

    task = Task(
        id=str(uuid.uuid4()),
        description="manage_mini_app_lifecycle",
        agent_type=AgentType.CPO,
        payload={"app_id": "test_app"},
    )

    async def run_task():
        # Mocking external calls
        async def mock_get_app_analytics(*args, **kwargs):
            return {"adoption_rate": 0.7, "usage_trend": 0.5}

        async def mock_suggest_optimizations(*args, **kwargs):
            return {"suggestions": "some suggestions"}

        cpo_agent.medusa.get_app_analytics = mock_get_app_analytics
        cpo_agent.jetbrains_ai.suggest_optimizations = mock_suggest_optimizations

        await cpo_agent.process_task(task)

    def f():
        asyncio.run(run_task())

    benchmark(f)
