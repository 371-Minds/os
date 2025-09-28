import express from 'express';
import { QuestFlowOrchestrator } from './orchestrator.js';
import { CSuiteCoordinator } from './agents/csuite.js';
import fs from 'fs';
import path from 'path';

// Load configuration
const configPath = path.resolve('./config/default.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = express();
const orchestrator = new QuestFlowOrchestrator(config);
const csuite = new CSuiteCoordinator(config);

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

// Postiz integration endpoints
app.post('/api/social/posts', async (req, res) => {
  const { content, platforms } = req.body;
  console.log('Creating social media post:', { content, platforms });
  const result = await orchestrator.createSocialMediaPost(content, platforms);
  res.json(result);
});

app.post('/api/social/posts/schedule', async (req, res) => {
  const { content, platforms, scheduleTime } = req.body;
  console.log('Scheduling social media post:', { content, platforms, scheduleTime });
  const result = await orchestrator.scheduleSocialMediaPost(content, platforms, scheduleTime);
  res.json(result);
});

app.get('/api/social/accounts', async (req, res) => {
  console.log('Getting social media accounts');
  const result = await orchestrator.getSocialMediaAccounts();
  res.json(result);
});

app.get('/api/social/posts', async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;
  console.log('Listing social media posts:', { limit, offset });
  const result = await orchestrator.listSocialMediaPosts(parseInt(limit), parseInt(offset));
  res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`QuestFlow API ready on port ${PORT}`);
});