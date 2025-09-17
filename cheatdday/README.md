Based on the codebase context, you're asking about modifying the LLM (Large Language Model) provider in the Cheating Daddy application, which currently uses Google's Gemini API as its AI provider. <cite/>

## Current LLM Provider Implementation

The application currently uses Google's Gemini API as its LLM provider, implemented through the `@google/genai` package. [1](#0-0)  The core initialization happens in the `initializeGeminiSession` function, which sets up the Gemini client and configures the realtime session. [2](#0-1) 

## How to Modify the LLM Provider

To change the LLM provider, you would need to:

### 1. Replace the Gemini Client Integration
The main integration point is in `src/utils/gemini.js` where the `GoogleGenAI` client is imported and used. [1](#0-0)  You would replace this with your preferred LLM provider's SDK.

### 2. Update the Session Management
The current implementation uses Gemini's realtime session API for sending audio, images, and text. [3](#0-2)  You would need to adapt these functions (`sendAudioToGemini`, etc.) to work with your new provider's API format.

### 3. Modify the Renderer Communication
The renderer process sends data to the main process via IPC calls like `send-audio-content`, `send-image-content`, and `send-text-message`. [4](#0-3)  These would need to be updated to match your new provider's expected data formats.

### 4. Future LLM Plans
According to the development documentation, there are already placeholder plans for integrating local LLM models via `llama.cpp` with Qwen models. [5](#0-4)  This suggests the codebase is designed to eventually support multiple LLM providers.

## Notes

The current Gemini integration is tightly coupled throughout the codebase, so switching providers would require significant refactoring. The application handles real-time audio streaming, image processing, and text communication, so any replacement provider would need to support similar capabilities or you'd need to implement buffering/batching mechanisms for providers that don't support real-time streaming.

Wiki pages you might want to explore:
- [Audio and Screen Capture (sohzm/cheating-daddy)](/wiki/sohzm/cheating-daddy#3.3)
- [Development (sohzm/cheating-daddy)](/wiki/sohzm/cheating-daddy#6)

### Citations

**File:** src/utils/gemini.js (L1-1)
```javascript
const { GoogleGenAI } = require('@google/genai');
```

**File:** src/utils/gemini.js (L175-181)
```javascript
        const session = await initializeGeminiSession(
            lastSessionParams.apiKey,
            lastSessionParams.customPrompt,
            lastSessionParams.profile,
            lastSessionParams.language,
            true // isReconnection flag
        );
```

**File:** src/utils/gemini.js (L506-520)
```javascript
async function sendAudioToGemini(base64Data, geminiSessionRef) {
    if (!geminiSessionRef.current) return;

    try {
        process.stdout.write('.');
        await geminiSessionRef.current.sendRealtimeInput({
            audio: {
                data: base64Data,
                mimeType: 'audio/pcm;rate=24000',
            },
        });
    } catch (error) {
        console.error('Error sending audio to Gemini:', error);
    }
}
```

**File:** src/utils/renderer.js (L377-381)
```javascript
            await ipcRenderer.invoke('send-mic-audio-content', {
                data: base64Data,
                mimeType: 'audio/pcm;rate=24000',
            });
        }
```

**File:** AGENTS.md (L126-130)
```markdown
## LLM plans

There are placeholder files for future LLM integration (e.g. Qwen models via
`llama.cpp`). Continue development after the core transcription pipeline is
```
