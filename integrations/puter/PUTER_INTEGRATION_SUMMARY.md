# Puter.js Integration Summary

This document provides a comprehensive overview of Puter.js capabilities integrated into the 371 OS project.

## Overview

Puter.js is a JavaScript SDK that brings free, serverless Cloud and AI directly to your frontend JavaScript with no backend code or API keys required. With Puter.js, developers pay nothing since each user of your app covers their own Cloud and AI usage through the User Pays Model.

## Key Features

### 1. Cloud Storage (File System)
- **Write files**: `puter.fs.write()`
- **Read files**: `puter.fs.read()`
- **Create directories**: `puter.fs.mkdir()`
- **List directory contents**: `puter.fs.readdir()`
- **Rename files/directories**: `puter.fs.rename()`
- **Copy files/directories**: `puter.fs.copy()`
- **Move files/directories**: `puter.fs.move()`
- **Get file info**: `puter.fs.stat()`
- **Delete files/directories**: `puter.fs.delete()`
- **Upload files**: `puter.fs.upload()`

### 2. AI Capabilities
- **Chat with AI models**: `puter.ai.chat()`
- **Generate images from text**: `puter.ai.txt2img()`
- **Extract text from images (OCR)**: `puter.ai.img2txt()`
- **Convert text to speech**: `puter.ai.txt2speech()`

### 3. Key-Value Store
- **Set key-value pairs**: `puter.kv.set()`
- **Get values by key**: `puter.kv.get()`
- **Increment numeric values**: `puter.kv.incr()`
- **Decrement numeric values**: `puter.kv.decr()`
- **Delete key-value pairs**: `puter.kv.del()`
- **List all keys**: `puter.kv.list()`
- **Clear all data**: `puter.kv.flush()`

### 4. Hosting
- **Create hosting deployments**: `puter.hosting.create()`
- **List deployments**: `puter.hosting.list()`
- **Delete deployments**: `puter.hosting.delete()`
- **Update deployments**: `puter.hosting.update()`
- **Get deployment info**: `puter.hosting.get()`

### 5. Authentication
- **Sign in users**: `puter.auth.signIn()`
- **Sign out users**: `puter.auth.signOut()`
- **Check sign-in status**: `puter.auth.isSignedIn()`
- **Get user information**: `puter.auth.getUser()`

### 6. Apps Management
- **Create applications**: `puter.apps.create()`
- **List applications**: `puter.apps.list()`
- **Delete applications**: `puter.apps.delete()`
- **Update applications**: `puter.apps.update()`
- **Get application info**: `puter.apps.get()`

### 7. Serverless Workers
- **Create workers**: `puter.workers.create()`
- **Delete workers**: `puter.workers.delete()`
- **List workers**: `puter.workers.list()`
- **Get worker info**: `puter.workers.get()`
- **Execute workers**: `puter.workers.exec()`

### 8. UI Components
- **Authenticate with Puter**: `puter.ui.authenticateWithPuter()`
- **Show alerts**: `puter.ui.alert()`
- **Show prompts**: `puter.ui.prompt()`
- **Create windows**: `puter.ui.createWindow()`
- **Manage window properties**: `puter.ui.setWindowTitle()`, `puter.ui.setWindowSize()`, etc.
- **File pickers**: `puter.ui.showOpenFilePicker()`, `puter.ui.showSaveFilePicker()`, `puter.ui.showDirectoryPicker()`
- **Launch applications**: `puter.ui.launchApp()`
- **Exit applications**: `puter.ui.exit()`

## User Pays Model

The User Pays Model means your users cover their own cloud and AI usage. Instead of you, as a developer, paying for servers and APIs, users bring and pay for their own AI, storage and other features you've built into your application, making your app practically free to run!

### Advantages:
1. **Zero Server, AI, and APIs Costs** - No infrastructure costs regardless of user count
2. **No API Keys Needed** - True serverless architecture
3. **Built-in Security** - Authentication and authorization handled by Puter
4. **No Anti-Abuse Implementation Required** - Bad actors pay for their own usage
5. **Simpler Codebase** - Focus on application functionality
6. **Simplified User Experience** - Single sign-on through Puter

## Security and Permissions

### Authentication
- Automatic authentication handling
- User sign-in prompts when needed
- No hardcoded credentials required

### Default Permissions
- **App directory**: Sandboxed storage space in `~/AppData/<your-app-id>/`
- **Key-value store**: Private storage accessible only by your app
- **AI services**: Access to chat, txt2img, img2txt, and more
- **Hosting**: Ability to create and publish websites

## Integration Examples

### Basic AI Chat
```javascript
puter.ai.chat(`What is life?`, { model: "gpt-5-nano" }).then(puter.print);
```

### File Operations
```javascript
// Write a file
puter.fs.write('hello.txt', 'Hello, world!').then((file) => {
    puter.print(`File written successfully at: ${file.path}`);
});

// Read a file
puter.fs.read('hello.txt').then(async (blob) => {
    const content = await blob.text();
    puter.print(`File content: ${content}`);
});
```

### Key-Value Storage
```javascript
// Save user preference
puter.kv.set('theme', 'dark').then(() => {
    puter.print('Theme preference saved');
});

// Retrieve user preference
puter.kv.get('theme').then((value) => {
    puter.print(`Current theme: ${value}`);
});
```

### Website Hosting
```javascript
(async () => {
    // Create a directory
    let dir = await puter.fs.mkdir('my-website');
    
    // Create index.html
    await puter.fs.write(`${dir.name}/index.html`, '<h1>Hello, Puter!</h1>');
    
    // Deploy the website
    let subdomain = puter.randName();
    const site = await puter.hosting.create(subdomain, dir.name);
    
    puter.print(`Website deployed at: https://${site.subdomain}.puter.site`);
})();
```

## Best Practices for 371 OS Integration

1. **Leverage the User Pays Model** - Design applications where users benefit from covering their own costs
2. **Use Cloud Storage** - Replace local storage with Puter's reliable cloud storage
3. **Integrate AI Capabilities** - Enhance agent functionality with advanced AI models
4. **Implement Authentication** - Use Puter's secure authentication system
5. **Deploy with Hosting** - Use Puter's hosting capabilities for application deployment
6. **Utilize Key-Value Store** - Store simple data without external databases
7. **Create Serverless Workers** - Build backend functionality without managing servers

## Supported AI Models

Puter.js provides access to more than 500 AI models, including:
- OpenAI models (GPT series)
- Anthropic models (Claude series)
- Google models (Gemini series)
- xAI models
- Mistral models
- OpenRouter models
- DeepSeek models
- And many more

## Performance Benefits

1. **No Infrastructure Management** - Focus on application logic
2. **Automatic Scaling** - Puter handles scaling automatically
3. **Global Distribution** - Edge computing for low latency
4. **Cost Efficiency** - Pay-per-use pricing model
5. **High Availability** - Built-in redundancy and failover

## Conclusion

Puter.js integration in 371 OS provides a powerful, cost-effective way to build and deploy AI-powered applications with minimal infrastructure overhead. The User Pays Model enables developers to create sophisticated applications without worrying about server costs, while the comprehensive API provides access to essential cloud services and advanced AI capabilities.