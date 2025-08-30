# tests/performance/test_content_generation_agent_benchmark.py

import asyncio
import pytest
import uuid

from minds371.agents.base_agent.improved_base_agent import Task, AgentType, TaskStatus
from minds371.agents.marketing.content_generation_agent import ContentGenerationAgent


@pytest.fixture
def event_loop():
    """Create an instance of the default event loop for each test case."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def agent():
    """Fixture to create a ContentGenerationAgent."""
    return ContentGenerationAgent(agent_id="test_agent")


@pytest.mark.performance
def test_content_generation_performance(benchmark, agent, event_loop):
    """
    Tests the performance of the ContentGenerationAgent's process_task method.
    """
    task = Task(
        id=str(uuid.uuid4()),
        agent_type=AgentType.CONTENT_GENERATION,
        description="Generate a blog post",
        payload={
            "action": "generate_content",
            "topic": "The benefits of AI",
            "content_type": "blog post",
            "length": 500,
        },
        status=TaskStatus.PENDING,
    )

    async def run_task():
        await agent.process_task(task)

    def f():
        event_loop.run_until_complete(run_task())

    benchmark(f)
