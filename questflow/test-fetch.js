async function test() {
  try {
    const response = await fetch('http://localhost:3002/api/deploy/akash', {
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
    
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();