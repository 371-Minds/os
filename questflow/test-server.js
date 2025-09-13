import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/deploy/akash', async (req, res) => {
  console.log('Deploying to Akash with config:', req.body);
  const deployment = {
    success: true,
    deploymentId: 'akash-deployment-' + Date.now(),
    status: 'initiated',
    message: 'Deployment to Akash initiated successfully',
    config: req.body
  };
  res.json(deployment);
});

app.listen(3002, () => {
  console.log('Test server ready on port 3002');
});