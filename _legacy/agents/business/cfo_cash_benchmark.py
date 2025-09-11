import asyncio
from unittest.mock import patch, AsyncMock, MagicMock
import unittest

from minds371.agents.business.cfo_cash import CfoCashAgent
from minds371.agents.base_agent.improved_base_agent import Task, AgentType

class TestCfoCashAgent(unittest.TestCase):
    def test_process_task(self):
        async def run_test():
            # Create a mock FinancialAgent
            mock_financial_agent = AsyncMock()

            # Instantiate the CFO agent with the mock agent
            cfo_agent = CfoCashAgent(financial_agent=mock_financial_agent)

            # A list of benchmark tasks to simulate various financial scenarios
            benchmark_tasks = [
                Task(id="1", description="Analyze quarterly P&L", agent_type=AgentType.CFO, payload={"period": "Q3 2024"}),
                Task(id="2", description="Optimize R&D tax credits for new project", agent_type=AgentType.CFO, payload={"project_id": "proj_123"}),
                Task(id="3", description="Process new Stripe subscription event", agent_type=AgentType.CFO, payload={"platform": "stripe", "type": "subscription_created", "amount": 5000}),
                Task(id="4", description="Sync all banking transactions", agent_type=AgentType.CFO, payload={"sync_type": "full"}),
                Task(id="5", description="Generate revenue forecast for 2025", agent_type=AgentType.CFO, payload={"year": 2025}),
            ]

            expected_results = [
                {'status': 'success', 'message': 'P&L analysis complete.', 'payload': {'period': 'Q3 2024'}},
                {'status': 'success', 'message': 'R&D tax optimization complete.', 'payload': {'project_id': 'proj_123'}},
                {'status': 'success', 'message': 'Transaction processed.', 'payload': {'platform': 'stripe', 'type': 'subscription_created', 'amount': 5000}},
                {'status': 'success', 'message': 'Transaction processed.', 'payload': {'sync_type': 'full'}},
                {'status': 'success', 'message': 'Revenue forecast generated.', 'payload': {'year': 2025}},
            ]

            for i, task in enumerate(benchmark_tasks):
                mock_financial_agent.process_task.return_value = {"payload": task.payload}
                result = await cfo_agent.process_task(task)
                self.assertEqual(result, expected_results[i])

        asyncio.run(run_test())

if __name__ == "__main__":
    unittest.main()
