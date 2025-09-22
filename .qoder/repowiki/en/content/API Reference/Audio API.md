# Audio API

<cite>
**Referenced Files in This Document**   
- [Transcribe audio.md](file://elizaos/API Reference/Audio/Transcribe audio.md)
- [Process audio message.md](file://elizaos/API Reference/Audio/Process audio message.md)
- [Synthesize speech from text.md](file://elizaos/API Reference/Audio/Synthesize speech from text.md)
- [Generate speech from text.md](file://elizaos/API Reference/Audio/Generate speech from text.md)
- [Convert conversation to speech.md](file://elizaos/API Reference/Audio/Convert conversation to speech.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Audio Processing Endpoints](#audio-processing-endpoints)
3. [Authentication and Headers](#authentication-and-headers)
4. [Request and Response Formats](#request-and-response-formats)
5. [Supported Audio Formats and Limits](#supported-audio-formats-and-limits)
6. [Error Handling](#error-handling)
7. [Speech Synthesis Parameters](#speech-synthesis-parameters)
8. [Example Requests](#example-requests)
9. [Processing Latency and Asynchronous Behavior](#processing-latency-and-asynchronous-behavior)

## Introduction
The Audio API in the 371OS platform provides a comprehensive suite of endpoints for audio processing, including transcription, speech generation, and conversation-to-speech conversion. These endpoints enable agents to interact with audio data, transcribe spoken content, generate natural-sounding speech, and process audio messages within conversational contexts. This documentation details all available operations, their parameters, expected formats, and usage patterns.

## Audio Processing Endpoints

### Transcribe Audio
Converts an uploaded audio file into transcribed text.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/audio/{agentId}/transcriptions`

**Request Parameters**:
- `agentId` (path): Unique identifier of the agent (UUID format)
- `file` (multipart/form-data): Audio file to transcribe
- `userId` (multipart/form-data): Identifier of the user initiating the request (UUID format)

**Response Schema (200 OK)**:
```json
{
  "success": true,
  "data": {
    "text": "Transcribed text from the audio"
  }
}
```

**Section sources**
- [Transcribe audio.md](file://elizaos/API Reference/Audio/Transcribe audio.md)

### Process Audio Message
Processes an audio message by transcribing it and generating an agent response, optionally including an audio response.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/audio/{agentId}/process-audio`

**Request Parameters**:
- `agentId` (path): Agent identifier (UUID)
- `file` (multipart/form-data): Audio file to process
- `userId` (multipart/form-data): User identifier (UUID)
- `roomId` (multipart/form-data): Room identifier for context (UUID, optional)

**Response Schema (200 OK)**:
```json
{
  "success": true,
  "data": {
    "text": "Transcribed input text",
    "response": "Agent's textual response",
    "audioResponse": "Binary audio data (if speech enabled)"
  }
}
```

**Section sources**
- [Process audio message.md](file://elizaos/API Reference/Audio/Process audio message.md)

### Synthesize Speech from Text
Generates speech audio from input text using agent-specific voice settings.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/audio/{agentId}/audio-messages/synthesize`

**Request Parameters**:
- `agentId` (path): Agent identifier (UUID)
- `text` (JSON body): Text to convert to speech
- `options.voice` (JSON body): Voice ID or name
- `options.language` (JSON body): Language code (e.g., "en-US")

**Response**: Binary audio/mpeg file on success (200 OK)

**Section sources**
- [Synthesize speech from text.md](file://elizaos/API Reference/Audio/Synthesize speech from text.md)

### Generate Speech from Text
Generates speech from plain text input using default agent voice settings.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/audio/{agentId}/speech/generate`

**Request Parameters**:
- `agentId` (path): Agent identifier (UUID)
- `text` (JSON body): Text to convert to speech

**Response**: Binary audio/mpeg file on success (200 OK)

**Section sources**
- [Generate speech from text.md](file://elizaos/API Reference/Audio/Generate speech from text.md)

### Convert Conversation to Speech
Converts a sequence of messages into a continuous audio narration with speaker differentiation.

**HTTP Method**: `POST`  
**URL Pattern**: `/api/audio/{agentId}/speech/conversation`

**Request Parameters**:
- `agentId` (path): Agent identifier (UUID)
- `messages` (JSON body): Array of message objects containing:
  - `text`: Message content
  - `speaker`: Speaker identifier
  - `timestamp`: Unix timestamp

**Response**: Binary audio/mpeg file on success (200 OK)

**Section sources**
- [Convert conversation to speech.md](file://elizaos/API Reference/Audio/Convert conversation to speech.md)

## Authentication and Headers
The audio endpoints do not require authentication tokens in the current implementation, as indicated by the empty `security: []` field in the OpenAPI specifications. However, valid `agentId` and `userId` parameters are required for authorization and context tracking. No additional headers beyond standard HTTP headers are required.

## Request and Response Formats

### Audio File Handling
Audio files must be sent using `multipart/form-data` encoding for transcription and message processing endpoints. The file should be included as a binary field named `file`.

### Text-to-Speech Input
Speech synthesis endpoints accept JSON payloads with `application/json` content type. The primary input is the `text` field, with optional `options` for voice and language customization.

### Response Structure
All successful operations return a JSON object with a `success` boolean and `data` object (for transcription and processing). Speech generation endpoints return raw binary audio data (audio/mpeg) directly.

## Supported Audio Formats and Limits
The API supports standard audio formats including MP3, WAV, and M4A. Specific format support is inferred from the `415 Unsupported Media Type` error response. While exact file size limits are not specified in the available documentation, best practices suggest keeping files under 10MB for optimal performance. Sampling rates should be between 16kHz and 48kHz for reliable transcription quality.

## Error Handling
The API returns standardized error responses for various failure conditions:

| Status Code | Error Type | Description |
|-----------|------------|-------------|
| 400 | Invalid Request | Missing required parameters or malformed input |
| 404 | Agent Not Found | Specified agentId does not exist |
| 415 | Unsupported Media Type | Audio format not supported |
| 500 | Processing Error | Internal error during transcription or speech generation |

Error responses follow the format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional diagnostic information"
  }
}
```

Common audio quality issues that may trigger errors include excessive background noise, low volume, or poor microphone quality.

**Section sources**
- [Transcribe audio.md](file://elizaos/API Reference/Audio/Transcribe audio.md)
- [Process audio message.md](file://elizaos/API Reference/Audio/Process audio message.md)

## Speech Synthesis Parameters
The speech synthesis endpoints support voice and language customization through the `options` parameter:

- **Voice**: Specifies the voice model to use (e.g., "female-calm", "male-narrator")
- **Language**: ISO language code (e.g., "en-US", "es-ES") for language-specific pronunciation

These parameters allow tuning of speech quality and character. The system uses agent-configured default voices when options are not specified. For optimal results, use clear, grammatically correct text input.

**Section sources**
- [Synthesize speech from text.md](file://elizaos/API Reference/Audio/Synthesize speech from text.md)

## Example Requests

### Transcribe Audio (curl)
```bash
curl -X POST "http://localhost:3000/api/audio/3c90c3cc-0d44-4b50-8888-8dd25736052a/transcriptions" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@recording.mp3" \
  -F "userId=3c90c3cc-0d44-4b50-8888-8dd25736052a"
```

### Synthesize Speech (curl)
```bash
curl -X POST "http://localhost:3000/api/audio/3c90c3cc-0d44-4b50-8888-8dd25736052a/audio-messages/synthesize" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, how can I help you today?",
    "options": {
      "voice": "female-calm",
      "language": "en-US"
    }
  }' --output speech.mp3
```

### Process Audio Message (curl)
```bash
curl -X POST "http://localhost:3000/api/audio/3c90c3cc-0d44-4b50-8888-8dd25736052a/process-audio" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@message.wav" \
  -F "userId=3c90c3cc-0d44-4b50-8888-8dd25736052a" \
  -F "roomId=3c90c3cc-0d44-4b50-8888-8dd25736052a"
```

## Processing Latency and Asynchronous Behavior
The audio processing endpoints operate synchronously and return responses within typical API latency ranges (1-5 seconds for short audio clips). Longer audio files may experience proportionally longer processing times. The API does not currently expose asynchronous operation patterns or webhook callbacks for completion notification. Clients should implement appropriate timeout handling (recommended: 30 seconds) for speech generation and transcription requests.