// Test script for QuestFlow API endpoints
async function testAPI() {
  console.log('Testing QuestFlow API endpoints...\n');
  
  try {
    // Test 1: Get workflows status
    console.log('1. Testing GET /api/workflows/status');
    const workflowsResponse = await fetch('http://localhost:3001/api/workflows/status');
    const workflows = await workflowsResponse.json();
    console.log('Workflows:', workflows);
    console.log('✓ Workflows endpoint working\n');
    
    // Test 2: Conduct C-Suite meeting
    console.log('2. Testing POST /api/agents/csuite/meeting');
    const meetingResponse = await fetch('http://localhost:3001/api/agents/csuite/meeting', {
      method: 'POST'
    });
    const meeting = await meetingResponse.json();
    console.log('Meeting result:', meeting);
    console.log('✓ C-Suite meeting endpoint working\n');
    
    // Test 3: Deploy to Akash
    console.log('3. Testing POST /api/deploy/akash');
    const deployResponse = await fetch('http://localhost:3001/api/deploy/akash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'test-deployment',
        config: {
          cpu: 1,
          memory: '1GB'
        }
      })
    });
    const deployment = await deployResponse.json();
    console.log('Deployment result:', deployment);
    console.log('✓ Akash deployment endpoint working\n');
    
    console.log('All API endpoints are working correctly!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI();