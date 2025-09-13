import express from 'express';
import { QuestFlowOrchestrator } from './orchestrator';
import { CSuiteCoordinator } from './agents/csuite';

const app = express();
const orchestrator = new QuestFlowOrchestrator();
const csuite = new CSuiteCoordinator();

// Workflow endpoints for osfinal integration
app.get('/api/workflows/status', async (req, res) => {
  const workflows = await orchestrator.getActiveWorkflows();
  res.json(workflows);
});

app.post('/api/agents/csuite/meeting', async (req, res) => {
  const result = await csuite.conductDailyMeeting();
  res.json(result);
});

app.post('/api/deploy/akash', async (req, res) => {
  const deployment = await orchestrator.deployToAkash(req.body);
  res.json(deployment);
});

app.listen(3001, () => console.log('QuestFlow API ready on :3001'));