import asyncio
import uuid
import pytest
from unittest.mock import patch

from minds371.agents.cco_agent.cco_agent import CCOAgent
from minds371.agents.base_agent.improved_base_agent import Task, AgentType


@pytest.mark.asyncio
async def test_cco_agent_community_health_warning():
    """
    Tests the CCO agent's response to a community health warning.
    """
    agent_id = f"cco_agent_{uuid.uuid4()}"
    cco_agent = CCOAgent(agent_id=agent_id)

    # Create a task for the agent
    task = Task(
        id=str(uuid.uuid4()),
        description="monitor_community_health",
        agent_type=AgentType.CCO,
        payload={},
    )

    # The new process_task method does not depend on the health score,
    # so we can call it directly.
    # The task description needs to contain "community health"
    task.description = "This is a community health check task"
    result = await cco_agent.process_task(task)

    # Assert the new expected output
    assert result["status"] == "action_plan_generated"
    assert result["message"] == "Community health score is below threshold. Executing response plan."
    assert isinstance(result["plan"], list)
    assert len(result["plan"]) == 3
