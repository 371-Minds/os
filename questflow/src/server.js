import express from 'express';
import { QuestFlowOrchestrator } from './orchestrator.js';
import { CSuiteCoordinator } from './agents/csuite.js';

const app = express();
const orchestrator = new QuestFlowOrchestrator();
const csuite = new CSuiteCoordinator();

app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Workflow endpoints for osfinal integration
app.get('/api/workflows/status', async (req, res) => {
  console.log('Getting active workflows');
  const workflows = await orchestrator.getActiveWorkflows();
  res.json(workflows);
});

app.post('/api/agents/csuite/meeting', async (req, res) => {
  console.log('Conducting C-Suite meeting');
  const result = await csuite.conductDailyMeeting();
  res.json(result);
});

app.post('/api/deploy/akash', async (req, res) => {
  console.log('Deploying to Akash with config:', req.body);
  const deployment = await orchestrator.deployToAkash(req.body);
  res.json(deployment);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`QuestFlow API ready on port ${PORT}`);
});