"""
371 Minds Operating System - CCO (Chief Community Officer) Agent
"""

import asyncio
import logging
import random
import uuid
from datetime import datetime
from enum import Enum

from minds371.agents.base_agent.improved_base_agent import (
    ImprovedBaseAgent,
    Task,
    TaskStatus,
    AgentType,
)


class CCOAgent(ImprovedBaseAgent):
    """
    CCO Agent for monitoring community health.
    """

    def __init__(self, agent_id: str, **kwargs):
        super().__init__(agent_id, AgentType.CCO, **kwargs)

    async def get_community_health_score(self) -> float:
        """
        Mock function to get the community health score.
        In a real implementation, this would query a database or API.
        """
        # Simulate a score that sometimes drops below the threshold
        score = random.uniform(0.7, 1.0)
        self.logger.info(f"Current community health score: {score:.2f}")
        return score

    async def analyze_sentiment(self):
        """
        Mock function to analyze sentiment of recent posts.
        """
        self.logger.info("Analyzing recent posts for negative sentiment...")
        await asyncio.sleep(2)  # Simulate analysis time
        return {"negative_posts": random.randint(5, 20)}

    async def create_youtrack_issue(self):
        """
        Mock function to create a YouTrack issue.
        """
        self.logger.info("Creating 'Review Community Health' issue in YouTrack...")
        await asyncio.sleep(1)  # Simulate API call
        return f"YOUTRACK-ISSUE-{random.randint(1000, 9999)}"

    async def notify_ceo_agent(self):
        """
        Mock function to notify the CEO agent.
        """
        self.logger.info("Notifying CEO agent of warning status...")
        await asyncio.sleep(1)

    async def process_task(self, task: Task) -> dict:
        """
        Processes a task to monitor community health.
        """
        if task.description == "monitor_community_health":
            while not self.shutdown_event.is_set():
                health_score = await self.get_community_health_score()

                if health_score <= 0.8:
                    self.logger.warning("Community health score is below threshold!")
                    sentiment_analysis = await self.analyze_sentiment()
                    youtrack_issue = await self.create_youtrack_issue()
                    await self.notify_ceo_agent()

                    result = {
                        "status": "Warning",
                        "health_score": health_score,
                        "sentiment_analysis": sentiment_analysis,
                        "youtrack_issue": youtrack_issue,
                    }
                    # After handling a warning, we break the loop
                    # as the monitoring cycle is complete as per the diagram.
                    return result
                else:
                    self.logger.info("Community health is stable.")

                self.logger.info("Waiting for 1 hour before next check...")
                try:
                    # Wait for 1 hour or until shutdown is requested
                    await asyncio.wait_for(self.shutdown_event.wait(), timeout=3600)
                except asyncio.TimeoutError:
                    continue  # Timeout means we continue the loop

            return {"status": "Shutdown"}
        else:
            self.logger.warning(f"Unknown task description: {task.description}")
            return {"error": "Unknown task"}

    async def health_check(self) -> bool:
        """
        Health check for the CCO agent.
        """
        return True


async def main():
    """
    Main function to run the CCO agent.
    """
    logging.basicConfig(level=logging.INFO)
    agent_id = f"cco_agent_{uuid.uuid4()}"
    cco_agent = CCOAgent(agent_id=agent_id)

    # Create a task to start monitoring
    monitoring_task = Task(
        id=str(uuid.uuid4()),
        description="monitor_community_health",
        agent_type=AgentType.CCO,
        payload={},
    )

    # Submit the task and start the agent's workers
    await cco_agent.submit_task(monitoring_task)

    try:
        # Keep the agent running for a while (e.g., a few hours)
        # In a real scenario, this would be managed by a larger system.
        await asyncio.sleep(3600 * 2)
    except asyncio.CancelledError:
        pass
    finally:
        # Gracefully shut down the agent
        await cco_agent.shutdown()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("CCO Agent stopped by user.")
