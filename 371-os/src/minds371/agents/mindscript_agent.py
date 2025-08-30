import asyncio
import json
from typing import Dict, Any

from minds371.agents.base_agent.improved_base_agent import ImprovedBaseAgent, Task, AgentType, TaskStatus

class LogicExtractorAgent(ImprovedBaseAgent):
    """
    MindScript Agent for extracting structured logic from natural language commands.
    """
    def __init__(self):
        super().__init__(
            agent_id="mindscript_logic_extractor",
            agent_type=AgentType.BUSINESS_LOGIC,
            enable_caching=True,
            enable_circuit_breaker=False  # This agent is local, no need for a circuit breaker
        )

    async def process_task(self, task: Task) -> Dict[str, Any]:
        """
        Processes a natural language command and extracts structured logic.
        This is a mock implementation.
        """
        command = task.payload.get('command', '').lower()

        # Mock logic extraction
        structured_payload = self._extract_logic(command)

        # Mock analysis and token counts
        original_tokens = len(command.split())
        structured_tokens = len(json.dumps(structured_payload).split())

        result = {
            "structured_payload": structured_payload,
            "brokkai_analysis": {
                "confidence": 0.95,
                "engine": "mock_v1",
                "explanation": "Logic extracted using mock rules."
            },
            "original_tokens": original_tokens,
            "structured_tokens": structured_tokens,
            "tokens_saved": original_tokens - structured_tokens
        }

        return result

    def _extract_logic(self, command: str) -> Dict[str, Any]:
        """
        A simplified, rule-based logic extractor.
        """
        if "catalog_services" in command:
            return {"category": "utility_belt", "resource": "catalog_services", "action": "find"}
        elif "marketing_campaigns" in command:
            return {"category": "business", "resource": "marketing_campaigns", "action": "sync"}
        elif "user feedback" in command:
            return {"category": "utility_belt", "resource": "documents", "action": "store"}
        elif "financial report" in command:
            return {"category": "business", "resource": "knowledge_base", "action": "search"}
        else:
            return {"category": "unknown", "resource": "unknown", "action": "unknown"}

    async def health_check(self) -> bool:
        """
        Health check for the MindScript agent.
        """
        return True

async def main():
    """
    Example usage and test for the LogicExtractorAgent.
    """
    agent = LogicExtractorAgent()

    test_command = 'Can you please store the latest "customer feedback" document?'

    task = Task(
        id="test_task_123",
        description="Test logic extraction",
        agent_type=AgentType.BUSINESS_LOGIC,
        payload={'command': test_command},
    )

    print(f"Processing command: '{test_command}'")
    result = await agent.process_task(task)
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
