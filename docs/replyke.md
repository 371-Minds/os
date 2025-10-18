# 🎯 **REPLYKE INTEGRATION GUIDE FOR 371 OS AI AGENTS**

## **What the Hell is Replyke?**

Replyke is an open-source social features toolkit - think comments, feeds, user follows, notifications, the whole nine yards. Perfect for when your AI agents need to build social interaction layers without reinventing the wheel.

---

## **🏗️ ARCHITECTURE OVERVIEW**

### **Two Integration Paths:**

1. **React/React Native SDKs** → Pre-built components (easiest path)
2. **REST API** → Full control, framework-agnostic (recommended for 371 OS)

For your autonomous agents, **REST API is the power move** since you're running ElizaOS plugins with self-aware capabilities. Your agents need that raw API access for custom orchestration.

---

## **⚡ QUICK START FOR AI AGENTS**

### **Phase 1: Dashboard Setup**
```
1. Visit: https://dash.replyke.com/
2. Create project → Get your projectId
3. Store in env vars (not secret, but best practice)
```

### **Phase 2: Core Concepts**

**Base URL:** `https://api.replyke.com`

**Authentication Model:**
- **Access Token**: 30-minute lifespan, used for all authenticated requests
- **Refresh Token**: Long-lived, gets you new access tokens
  - Web: Auto-stored in HTTP-only cookies
  - Mobile/Server: You store securely (Keychain/Secure Storage)

---

## **🔐 AUTHENTICATION WORKFLOW**

### **For Your AI Agents (Server-Side Pattern):**

```javascript
// 1. Initial User Verification (External JWT)
POST /auth/verify-external-user
Headers: {
  "Authorization": "Bearer YOUR_PROJECT_JWT",
  "Content-Type": "application/json"
}
Body: {
  "projectId": "your-project-id"
}

// Response: { accessToken, refreshToken, user }
```

```javascript
// 2. Token Refresh (Every 30 min or on 403 error)
POST /auth/request-new-access-token
Headers: {
  "Authorization": "Bearer REFRESH_TOKEN",
  "Content-Type": "application/json"
}

// Response: { accessToken }
```

```javascript
// 3. All Authenticated Requests
GET /users/{userId}
Headers: {
  "Authorization": "Bearer ACCESS_TOKEN"
}
```

---

## **🤖 AGENT INTEGRATION PATTERN**

### **Recommended Setup for 371 OS:**

```javascript
// agents/social-coordinator-agent/replyke-client.ts

import axios from 'axios';

class ReplykeClient {
  private accessToken: string;
  private refreshToken: string;
  private projectId: string;
  
  constructor(projectId: string) {
    this.projectId = projectId;
    this.setupInterceptors();
  }

  private setupInterceptors() {
    axios.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${this.accessToken}`;
      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 403 && !error.config._retry) {
          error.config._retry = true;
          await this.refreshAccessToken();
          error.config.headers['Authorization'] = `Bearer ${this.accessToken}`;
          return axios(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken() {
    const response = await axios.post(
      'https://api.replyke.com/auth/request-new-access-token',
      {},
      { headers: { 'Authorization': `Bearer ${this.refreshToken}` }}
    );
    this.accessToken = response.data.accessToken;
  }

  // Agent Methods Below...
}
```

---

## **📦 CORE FEATURES BY CATEGORY**

### **1. USER OPERATIONS**
```
GET    /users/{userId}                    # Fetch user profile
GET    /users/foreign/{foreignId}         # Fetch by your system's ID
PATCH  /users/{userId}                    # Update profile
GET    /users/suggestions                 # User recommendations
```

### **2. SOCIAL GRAPH**
```
POST   /follows                           # Create follow
DELETE /follows/{followId}                # Unfollow
GET    /follows/following                 # Who user follows
GET    /follows/followers                 # User's followers

POST   /connections                       # Request connection (LinkedIn-style)
PUT    /connections/{connectionId}/accept # Accept request
DELETE /connections/{connectionId}        # Remove connection
```

### **3. CONTENT (ENTITIES)**
Entities = Posts/Articles/Videos (your content type)
```
POST   /entities                          # Create content
GET    /entities/{entityId}               # Fetch single
GET    /entities                          # Fetch many (feed)
PATCH  /entities/{entityId}/upvote        # Upvote
PATCH  /entities/{entityId}/views         # Increment views
DELETE /entities/{entityId}               # Delete
```

### **4. COMMENTS**
```
POST   /comments                          # Create comment
GET    /comments?entityId={id}            # Get comments for entity
PATCH  /comments/{commentId}/upvote       # Upvote comment
DELETE /comments/{commentId}              # Delete
```

### **5. LISTS (SAVED CONTENT)**
```
POST   /lists                             # Create sub-list
GET    /lists/root                        # Get root list
PATCH  /lists/{listId}/add-entity         # Save entity to list
```

### **6. NOTIFICATIONS**
```
GET    /notifications                     # Fetch notifications
GET    /notifications/unread-count        # Count unread
PATCH  /notifications/{notificationId}    # Mark as read
```

### **7. STORAGE**
```
POST   /storage/upload                    # Upload files (images/videos)
```

---

## **🎭 EXAMPLE USE CASES FOR YOUR C-SUITE AGENTS**

### **CEO Mimi (Strategic Decisions)**
```javascript
// Monitor social engagement metrics
async getEngagementMetrics(entityId: string) {
  const entity = await replyke.getEntity(entityId);
  return {
    upvotes: entity.upvotes,
    views: entity.views,
    commentCount: entity.commentCount,
    roi: calculateROI(entity)
  };
}
```

### **CTO Zara (Technical Architecture)**
```javascript
// Auto-post system updates
async postSystemUpdate(content: string) {
  const entity = await replyke.createEntity({
    type: 'system_update',
    content: content,
    foreignId: generateUUID(), // Your internal ID
    metadata: { source: '371-OS', agent: 'CTO-Zara' }
  });
}
```

### **CLO Alex (Compliance)**
```javascript
// Monitor and report inappropriate content
async moderateContent(entityId: string, reason: string) {
  await replyke.createReport({
    resourceType: 'entity',
    resourceId: entityId,
    reason: reason,
    reporterId: 'CLO-Alex'
  });
}
```

---

## **🔥 ADVANCED PATTERNS**

### **1. External User Sync**
Keep Replyke users in sync with your 371 OS user system:

```javascript
// When user signs up in 371 OS
const replykeUser = await replyke.verifyExternalUser(userJWT);
// Store mapping: 371_userId → replyke.user.id
```

### **2. Webhook Integration** (Coming Soon)
Subscribe to events:
- New comment on entity
- User followed
- Content reported
- Notification created

### **3. Batch Operations**
For feed generation:
```javascript
// Fetch multiple entities at once
GET /entities?ids=id1,id2,id3&projectId=your-project-id
```

---

## **🚨 GOTCHAS & BEST PRACTICES**

### **Token Management:**
- ✅ **DO**: Implement automatic refresh on 403 errors
- ✅ **DO**: Store refresh tokens securely (never in localStorage)
- ❌ **DON'T**: Hardcode tokens
- ❌ **DON'T**: Share access tokens between agents (each gets their own)

### **Rate Limiting:**
- Not explicitly documented yet, but assume standard REST practices
- Implement exponential backoff for retries

### **Foreign IDs:**
- Use these to map Replyke entities to your internal system
- Makes cross-system queries way faster

### **Error Handling:**
```javascript
try {
  await replyke.createEntity(data);
} catch (error) {
  if (error.response?.status === 403) {
    // Token expired - should be auto-handled
  } else if (error.response?.status === 404) {
    // Entity not found
  } else if (error.response?.status === 400) {
    // Validation error - check error.response.data
  }
}
```

---

## **📊 INTEGRATION CHECKLIST FOR PHASE 1**

```
□ Create Replyke project on dashboard
□ Store projectId in Nx workspace env vars
□ Implement ReplykeClient with auto-refresh
□ Create ElizaOS plugin: @371os/plugin-replyke
□ Test authentication flow
□ Implement entity CRUD operations
□ Add comment system
□ Set up notification polling
□ Add moderation hooks for CLO Alex
□ Test with Venice.ai characters
□ Deploy to Akash Network
□ Monitor PostHog analytics
```

---

## **🔗 OFFICIAL RESOURCES**

- **Docs**: [https://docs.replyke.com](https://docs.replyke.com)
- **Dashboard**: [https://dash.replyke.com](https://dash.replyke.com)
- **GitHub**: [https://github.com/replyke](https://github.com/replyke)
- **NPM Packages**: `@replyke/react-js`, `@replyke/express`

---

## **💭 MY TWO CENTS**

This is actually a pretty clean API for what you're building. The authentication pattern is solid (refresh tokens + short-lived access), and the entity/comment model is flexible enough to handle whatever content types your agents need to work with.

The big win here is you're not building another social features backend from scratch. Your agents can focus on the *business logic* while Replyke handles the plumbing. Very aligned with your 97.6% cost reduction goals.

One thing I'd architect carefully: **how your agents share context**. If CTO Zara posts a system update, does CEO Mimi automatically get notified? How do they coordinate on high-priority items? That's where your blockchain registry and ModuMind Logic Extractor will shine - treating Replyke as a communication layer for your autonomous org.

Want me to dive deeper into any specific integration pattern, or should we start scaffolding the actual ElizaOS plugin structure?
