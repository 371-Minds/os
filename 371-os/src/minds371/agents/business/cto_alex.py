import asyncio
from typing import Dict, Any, List
import uuid

# To allow importing from the parent directory
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from base_agent.base_agent import BaseAgent, Task, AgentType, AgentCapability, TaskStatus

class CtoAlexAgent(BaseAgent):
    """
    CTO Alex Agent specializes in technical strategy and oversight.
    """

    def __init__(self):
        agent_id = f"cto-alex-{uuid.uuid4()}"
        capabilities = [
            AgentCapability(name="design_architecture", description="Design technical architecture for new services."),
            AgentCapability(name="evaluate_technology", description="Evaluate and select new technologies."),
            AgentCapability(name="handle_security_response", description="Oversee responses to security vulnerabilities."),
            AgentCapability(name="plan_infrastructure", description="Plan infrastructure scaling and management.")
        ]
        super().__init__(agent_id=agent_id, agent_type=AgentType.CTO, capabilities=capabilities)

    async def process_task(self, task: Task) -> Dict[str, Any]:
        """
        Processes a technical task based on its category.
        """
        self.logger.info(f"CTO Alex processing task: {task.description}")
        description = task.description.lower()

        if "architecture" in description:
            result = self._handle_architecture_design(task)
        elif "evaluate" in description or "select" in description:
            result = self._handle_technology_evaluation(task)
        elif "security" in description or "vulnerability" in description:
            result = self._handle_security_response(task)
        elif "infrastructure" in description or "scaling" in description:
            result = self._handle_infrastructure_planning(task)
        else:
            result = {"status": "delegated", "message": f"Task '{task.description}' not a direct CTO task, delegating."}

        return result

    def _handle_architecture_design(self, task: Task) -> Dict[str, Any]:
        service_name = task.payload.get("service_name", "Unknown Service")
        return {
            "status": "completed",
            "message": f"Architecture design for {service_name} started. Creating technical specifications.",
            "details": {
                "task": "Design Architecture",
                "service": service_name,
                "next_step": "Create Technical Specification"
            }
        }

    def _handle_technology_evaluation(self, task: Task) -> Dict[str, Any]:
        requirements = task.payload.get("requirements", [])
        return {
            "status": "completed",
            "message": f"Technology evaluation started. Planning proof-of-concept.",
            "details": {
                "task": "Evaluate Technology",
                "requirements": requirements,
                "next_step": "Plan Proof-of-Concept"
            }
        }

    def _handle_security_response(self, task: Task) -> Dict[str, Any]:
        vulnerability_id = task.payload.get("vulnerability_id", "Unknown Vulnerability")
        return {
            "status": "completed",
            "message": f"Overseeing mitigation for {vulnerability_id}. Post-mortem analysis will be conducted.",
            "details": {
                "task": "Security Response",
                "vulnerability": vulnerability_id,
                "next_step": "Conduct Post-Mortem Analysis"
            }
        }

    def _handle_infrastructure_planning(self, task: Task) -> Dict[str, Any]:
        event = task.payload.get("event", "General Scaling")
        return {
            "status": "completed",
            "message": f"Infrastructure scaling plan for {event} is being drafted.",
            "details": {
                "task": "Infrastructure Planning",
                "event": event,
                "next_step": "Finalize Scaling Plan"
            }
        }

    async def health_check(self) -> bool:
        """
        Health check for the CTO Alex agent.
        """
        return True
