import asyncio
import uuid
import pytest
from src.minds371.agents.business.cgo_agent import CGOAgent
from src.minds371.agents.base_agent.improved_base_agent import Task, AgentType


def test_cgo_agent_analyze_community_growth_performance(benchmark):
    """
    Tests the performance of the CGO agent's analyze_community_growth tool.
    """
    agent_id = f"cgo_agent_{uuid.uuid4()}"
    cgo_agent = CGOAgent(agent_id=agent_id)

    task = Task(
        id=str(uuid.uuid4()),
        description="analyze_community_growth",
        agent_type=AgentType.CGO,
        payload={"community_id": "test_community"},
    )

    async def run_task():
        await cgo_agent.process_task(task)

    def f():
        asyncio.run(run_task())

    benchmark(f)


def test_cgo_agent_trigger_community_scaling_performance(benchmark):
    """
    Tests the performance of the CGO agent's trigger_community_scaling tool.
    """
    agent_id = f"cgo_agent_{uuid.uuid4()}"
    cgo_agent = CGOAgent(agent_id=agent_id)

    task = Task(
        id=str(uuid.uuid4()),
        description="trigger_community_scaling",
        agent_type=AgentType.CGO,
        payload={"community_id": "test_community", "action": "spawn_subcommunity"},
    )

    async def run_task():
        await cgo_agent.process_task(task)

    def f():
        asyncio.run(run_task())

    benchmark(f)
