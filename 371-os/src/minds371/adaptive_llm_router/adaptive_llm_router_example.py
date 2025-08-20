import asyncio
import json
import os
import sys
from uuid import uuid4

# Adjust path to import from agent modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from minds371.adaptive_llm_router.intelligent_router_agent import IntelligentRouterAgent
from minds371.agents.base_agent.improved_base_agent import Task, AgentType, TaskStatus

async def main():
    """
    An example script to demonstrate the functionality of the new IntelligentRouterAgent.
    """
    print("--- Running Intelligent Router Agent Example ---")

    # The IntelligentRouterAgent is self-contained and doesn't need external LLM calls for this demo
    agent = IntelligentRouterAgent()

    # Test cases
    test_tasks = [
        {
            "command": "Can you please find the catalog_services?",
            "description": "A request for the CTO."
        },
        {
            "command": "I need to sync our marketing_campaigns.",
            "description": "A request for the CMO."
        },
        {
            "command": "store the new user feedback document.",
            "description": "A request for the utility belt (mocked)."
        },
        {
            "command": "This is an unknown command.",
            "description": "A request that should fail routing."
        }
    ]

    for i, task_info in enumerate(test_tasks):
        task = Task(
            id=str(uuid4()),
            description=task_info["description"],
            agent_type=AgentType.INTELLIGENT_ROUTER,
            payload={'command': task_info['command']},
            status=TaskStatus.PENDING
        )

        print(f"\n--- Test Case {i+1}: {task.description} ---")
        print(f"Command: {task_info['command']}")

        result = await agent.process_task(task)

        print("Router Output:")
        print(json.dumps(result, indent=2))

    print("\n--- Intelligent Router Agent Example Complete ---")

if __name__ == "__main__":
    # Dummy key to satisfy any underlying checks, though our mock doesn't need it.
    os.environ["OPENAI_API_KEY"] = "dummy_key"
    asyncio.run(main())
