# src/minds371/agents/marketing/content_generation_agent.py

import asyncio
from typing import Dict, Any

from minds371.agents.base_agent.improved_base_agent import ImprovedBaseAgent, Task, AgentType, TaskStatus

# Mock service for content creation
class ContentCreationService:
    async def generate_creative_content(self, topic: str, content_type: str, length: int) -> Dict[str, Any]:
        """Generates creative content based on a topic and type."""
        await asyncio.sleep(0.02)  # Simulate async work
        return {
            "title": f"Generated Title for {topic}",
            "body": f"This is a generated {content_type} of about {length} words on the topic of {topic}.",
            "status": "success"
        }

class ContentGenerationAgent(ImprovedBaseAgent):
    """
    An agent that generates various types of marketing content.
    """

    def __init__(self, agent_id: str, enable_caching: bool = True):
        super().__init__(
            agent_id=agent_id,
            agent_type=AgentType.CONTENT_GENERATION,
            max_concurrent_tasks=10,
            enable_caching=enable_caching
        )
        self.content_creation_service = ContentCreationService()

    async def process_task(self, task: Task) -> Dict[str, Any]:
        """
        Processes a content generation task.
        """
        payload = task.payload
        action = payload.get("action")

        if action == "generate_content":
            topic = payload.get("topic", "a default topic")
            content_type = payload.get("content_type", "article")
            length = payload.get("length", 200)

            try:
                content = await self.content_creation_service.generate_creative_content(topic, content_type, length)
                task.status = TaskStatus.COMPLETED
                return content
            except Exception as e:
                self.logger.error(f"Error generating content for task {task.id}: {e}")
                task.status = TaskStatus.FAILED
                return {"error": str(e)}
        else:
            self.logger.warning(f"Unknown action '{action}' for task {task.id}")
            task.status = TaskStatus.FAILED
            return {"error": f"Unknown action: {action}"}

    async def health_check(self) -> bool:
        """
        Checks if the agent is healthy and ready to process tasks.
        For now, this is a simple check.
        """
        return True
