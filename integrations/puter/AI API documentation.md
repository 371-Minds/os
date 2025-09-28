# AI

Puter.js provides powerful AI capabilities through various APIs that allow you to integrate artificial intelligence into your applications.

## Available Functions

- **[`puter.ai.chat()`](/AI/chat/)** - Chat with AI models like Claude, GPT, and others
- **[`puter.ai.txt2img()`](/AI/txt2img/)** - Generate images from text descriptions
- **[`puter.ai.img2txt()`](/AI/img2txt/)** - Extract text from images (OCR)
- **[`puter.ai.txt2speech()`](/AI/txt2speech/)** - Convert text to speech

# puter.ai.chat()

Given a prompt returns the completion that best matches the prompt.

## Syntax
```js
puter.ai.chat(prompt)
puter.ai.chat(prompt, options = {})
puter.ai.chat(prompt, testMode = false, options = {})
puter.ai.chat(prompt, imageURL, testMode = false, options = {})
puter.ai.chat(prompt, [imageURLArray], testMode = false, options = {})
puter.ai.chat([messages], testMode = false, options = {})
```

## Parameters
#### `prompt` (String)
A string containing the prompt you want to complete.

#### `options` (Object) (Optional)
An object containing the following properties:
- `model` (String) - The model you want to use for the completion. If not specified, defaults to `gpt-5-nano`. More than 500 models are available, including, but not limited to, OpenAI, Anthropic, Google, xAI, Mistral, OpenRouter, and DeepSeek. For a full list, see the [models list](https://puter.com/puterai/chat/models) page.
- `stream` (Boolean) - A boolean indicating whether you want to stream the completion. Defaults to `false`.
- `max_tokens` (Number) - The maximum number of tokens to generate in the completion. By default, the specific model's maximum is used.
- `temperature` (Number) - A number between 0 and 2 indicating the randomness of the completion. Lower values make the output more focused and deterministic, while higher values make it more random. By default, the specific model's temperature is used.
- `tools` (Array) (Optional) - An array of function definitions that the AI can call. Each function definition should have:
    - `type` (String) - Must be "function"
    - `function` (Object):
        - `name` (String) - The name of the function
        - `description` (String) - A description of what the function does
        - `parameters` (Object) - JSON Schema object describing the parameters
        - `strict` (Boolean) - Whether to enforce strict parameter validation

#### `testMode` (Boolean) (Optional)
A boolean indicating whether you want to use the test API. Defaults to `false`. This is useful for testing your code without using up API credits.

#### `imageURL` (String)
A string containing the URL of an image you want to provide as context for the completion. Also known as "GPT Vision".

#### `imageURLArray` (Array)
An array of strings containing the URLs of images you want to provide as context for the completion. 

#### `messages` (Array)
An array of objects containing the messages you want to complete. Each object must have a `role` and a `content` property. The `role` property must be one of `system`, `assistant`, `user`, or `function`. The `content` property can be:

1. A string containing the message text
2. An array of content objects for multimodal messages

When using an array of content objects, each object can have:
- `type` (String) - The type of content:
  - `"text"` - Text content
  - `"file"` - File content
- `text` (String) - The text content (required when type is "text")
- `puter_path` (String) - The path to the file in Puter's file system (required when type is "file")

An example of a valid `messages` parameter with text only:

```js
[
    {
        role: 'system',
        content: 'Hello, how are you?'
    },
    {
        role: 'user',
        content: 'I am doing well, how are you?'
    },
]
```

An example with mixed content including files:

```js
[
    {
        role: 'user',
        content: [
            {
                type: 'file',
                puter_path: '~/Desktop/document.pdf'
            },
            {
                type: 'text',
                text: 'Please summarize this document'
            }
        ]
    }
]
```

Providing a messages array is especially useful for building chatbots where you want to provide context to the completion.

## Return value

When `stream` is set to `false` (default):
- Will resolve to a response object containing the completion message, with the following format:
  - `message` (Object):
    - `role` (String) - Indicates who is speaking in the conversation
    - `content` (String) - The actual text response from the chat
- If a function call is made, the response will include `tool_calls` array containing:
  - `id` (String) - Unique identifier for the function call
  - `function` (Object):
    - `name` (String) - Name of function to call
    - `arguments` (String) - JSON string of function arguments

When `stream` is set to `true`:
- Returns an async iterable object that you can use with a `for await...of` loop to receive the response in parts as they become available.

In case of an error, the `Promise` will reject with an error message.

## Vendors

We use different vendors for different models and try to use the best vendor available at the time of the request. Vendors include, but are not limited to, OpenAI, Anthropic, Google, xAI, Mistral, OpenRouter, and DeepSeek.


## Examples

<strong class="example-title">Ask GPT-5 nano a question</strong>

```html;ai-chatgpt
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.chat(`What is life?`, { model: "gpt-5-nano" }).then(puter.print);
    </script>
</body>
</html>
```

<strong class="example-title">Image Analysis</strong>

```html;ai-gpt-vision
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <img src="https://assets.puter.site/doge.jpeg" style="display:block;">
    <script>
        puter.ai
            .chat(`What do you see?`, `https://assets.puter.site/doge.jpeg`, {
                model: "gpt-5-nano",
            })
            .then(puter.print);
    </script>
</body>
</html>
```

<strong class="example-title">Stream the response</strong>

```html;ai-chat-stream
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
    (async () => {
        const resp = await puter.ai.chat('Tell me in detail what Rick and Morty is all about.', {model: 'claude', stream: true });
        for await ( const part of resp ) document.write(part?.text.replaceAll('\n', '<br>'));
    })();
    </script>
</body>
</html>
```

<strong class="example-title">Function Calling</strong>

```html;ai-function-calling
<!DOCTYPE html>
<html>
<head>
    <title>Weather Function Calling Demo</title>
    <script src="https://js.puter.com/v2/"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px; }
        .container { border: 1px solid #ccc; padding: 20px; border-radius: 5px; }
        input { width: 100%; padding: 10px; margin: 10px 0; box-sizing: border-box; }
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;}
        button:disabled { background: #ccc; }
        #response { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; display: none;}
    </style>
</head>
<body>
    <div class="container">
        <h1>Weather Function Calling Demo</h1>
        <input type="text" id="userInput" value="What's the weather in Paris?" placeholder="Ask about the weather" />
        <button id="submit">Submit</button>
        <div id="response"></div>
    </div>

    <script>
        // Mock weather function
        function getWeather(location) {
            const mockWeatherData = {
                'Paris': '22Â°C, Partly Cloudy',
                'London': '18Â°C, Rainy',
                'New York': '25Â°C, Sunny',
                'Tokyo': '28Â°C, Clear'
            };
            return mockWeatherData[location] || '20Â°C, Unknown';
        }

        // Define the tools available to the AI
        const tools = [{
            type: "function",
            function: {
                name: "get_weather",
                description: "Get current weather for a given location",
                parameters: {
                    type: "object",
                    properties: {
                        location: {
                            type: "string",
                            description: "City name e.g. Paris, London"
                        }
                    },
                    required: ["location"]
                }
            }
        }];

        async function handleSubmit() {
            const userInput = document.getElementById('userInput').value;
            const submitBtn = document.getElementById('submit');
            const responseDiv = document.getElementById('response');
            
            if (!userInput) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Loading...';
            responseDiv.style.display = 'none';

            try {
                const completion = await puter.ai.chat(userInput, { tools });
                let finalResponse;

                // Check if AI wants to call a function
                if (completion.message.tool_calls?.length > 0) {
                    const toolCall = completion.message.tool_calls[0];
                    if (toolCall.function.name === 'get_weather') {
                        const args = JSON.parse(toolCall.function.arguments);
                        const weatherData = getWeather(args.location);
                        
                        // Send weather data back to AI for final response
                        finalResponse = await puter.ai.chat([
                            { role: "user", content: userInput },
                            completion.message,
                            { 
                                role: "tool",
                                tool_call_id: toolCall.id,
                                content: weatherData
                            }
                        ]);
                    }
                } else {
                    finalResponse = completion;
                }

                responseDiv.innerHTML = `<strong>Response:</strong><br>${finalResponse}`;
                responseDiv.style.display = 'block';
            } catch (error) {
                responseDiv.innerHTML = `<strong>Error:</strong><br>${error.message}`;
                responseDiv.style.display = 'block';
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }

        // Event handlers
        document.getElementById('submit').addEventListener('click', handleSubmit);
        document.getElementById('userInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleSubmit();
        });
    </script>
</body>
</html>
```


<strong class="example-title">Working with Files</strong>

```html;ai-resume-analyzer
<!DOCTYPE html>
<html>
<head>
    <title>Resume Analyzer</title>
    <script src="https://js.puter.com/v2/"></script>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto; padding: 20px;}
        .container { border: 1px solid #ccc; padding: 20px; border-radius: 5px;}
        .upload-area {border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 20px 0; border-radius: 5px; cursor: pointer;  transition: border-color 0.3s;}
        .upload-area:hover {border-color: #007bff;}
        .upload-area.dragover { border-color: #007bff; background-color: #f8f9fa;}
        input[type="file"] { display: none;}
        button { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;}
        button:disabled { background: #ccc; }
        #response { margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px; display: none; }
        .file-name { margin-top: 10px; font-style: italic; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Resume Analyzer</h1>
        <p>Upload your resume (PDF, DOC, or TXT) and get a quick analysis of your key strengths in two sentences.</p>
        
        <div class="upload-area" onclick="document.getElementById('fileInput').click()">
            <p>Click here to upload your resume or drag and drop</p>
            <input type="file" id="fileInput" accept=".pdf,.doc,.docx,.txt" />
        </div>
        
        <div class="file-name" id="fileName" style="display: none;"></div>
        
        <button id="analyzeBtn" disabled>Analyze My Resume</button>
        
        <div id="response"></div>
    </div>

    <script>
        let uploadedFile = null;
        
        // File upload handling
        const fileInput = document.getElementById('fileInput');
        const uploadArea = document.querySelector('.upload-area');
        const fileName = document.getElementById('fileName');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const response = document.getElementById('response');

        fileInput.addEventListener('change', handleFileSelect);
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);

        function handleFileSelect(e) {
            const file = e.target.files[0];
            if (file) {
                uploadedFile = file;
                fileName.textContent = `Selected: ${file.name}`;
                fileName.style.display = 'block';
                analyzeBtn.disabled = false;
            }
        }

        function handleDragOver(e) {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        }

        function handleDrop(e) {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                uploadedFile = file;
                fileName.textContent = `Selected: ${file.name}`;
                fileName.style.display = 'block';
                analyzeBtn.disabled = false;
            }
        }

        // Remove dragover class when drag leaves
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        // Analyze resume
        analyzeBtn.addEventListener('click', async () => {
            if (!uploadedFile) return;

            analyzeBtn.disabled = true;
            analyzeBtn.textContent = 'Analyzing...';
            response.style.display = 'none';

            try {
                // First, upload the file to Puter
                const puterFile = await puter.fs.write(`temp_resume_${Date.now()}.${uploadedFile.name.split('.').pop()}`,
                    uploadedFile
                );

                const uploadedPath = puterFile.path;

                // Analyze the resume with AI
                const completion = await puter.ai.chat([
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'file',
                                puter_path: uploadedPath
                            },
                            {
                                type: 'text',
                                text: 'Please analyze this resume and suggest how to improve it. Only a few sentences are needed.'
                            }
                        ]
                    }
                ], { model: 'claude-sonnet-4', stream: true });

                let text = '';

                // Display the response
                for await ( const part of completion ) {
                    text += part?.text;
                    response.innerHTML = text;
                }

                response.style.display = 'block';

                // Clean up the temporary file
                await puter.fs.delete(uploadedPath);

            } catch (error) {
                response.innerHTML = `<strong>Error:</strong><br>${error.message}`;
                response.style.display = 'block';
            }

            analyzeBtn.disabled = false;
            analyzeBtn.textContent = 'Analyze My Resume';
        });
    </script>
</body>
</html>
```

# puter.ai.txt2img()

Given a prompt, generate an image using AI.

## Syntax

```js
puter.ai.txt2img(prompt, testMode = false)
puter.ai.txt2img(prompt, options = {})
```

## Parameters
#### `prompt` (String) (required)
A string containing the prompt you want to generate an image from.

#### `testMode` (Boolean) (Optional)
A boolean indicating whether you want to use the test API. Defaults to `false`. This is useful for testing your code without using up API credits.

#### `options` (Object) (Optional)
An options object with the following properties:
- `model` (String) (Optional) - The AI model to use for image generation, it can be `gpt-image-1`, `gemini-2.5-flash-image-preview` (also known as Nano Banana), or `dall-e-3`. Defaults to `gpt-image-1`.
- `quality` (String) (Optional) - The quality of the generated image. For `gpt-image-1`, it can be `high`, `medium` or `low`. Defaults to `low`. There is no quality setting for `gemini-2.5-flash-image-preview`. For `dall-e-3`, it can be `hd` or `standard`. Defaults to `standard`.
- `input_image` (String) (Optional) (Only works with `gemini-2.5-flash-image-preview`) - Base64 encoded input image for image-to-image generation.
- `input_image_mime_type` (String) (Optional) (Only if `input_image` is set) - The MIME type of the input image. Could be `image/png`, `image/jpeg`, `image/jpg`, or `image/webp`.

## Return value
A `Promise` that will resolve to an image data URL when the image has been generated.

## Examples

<strong class="example-title">Generate an image of a cat using AI</strong>

```html;ai-txt2img
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Generate an image of a cat using the default model and quality. Please note that testMode is set to true so that you can test this code without using up API credits.
        puter.ai.txt2img('A picture of a cat.', true).then((image)=>{
            document.body.appendChild(image);
        });
    </script>
</body>
</html>
```

<strong class="example-title">Generate an image with specific model and quality</strong>

```html;ai-txt2img-options
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        // Generate am image of a cat playing piano using a specific model and quality set to low
        puter.ai.txt2img("a cat playing piano", { 
            model: "gpt-image-1", 
            quality: "low" 
        }).then((image)=>{
            document.body.appendChild(image);
        });
    </script>
</body>
</html>
```


<strong class="example-title">Generate an image with image-to-image generation</strong>

```html;ai-txt2img-image-to-image
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.txt2img("a cat playing piano", { 
            model: "gemini-2.5-flash-image-preview",
            input_image: "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",
            input_image_mime_type: "image/png"
        }).then((image)=>{
            document.body.appendChild(image);
        });
    </script>
</body>
</html>
```

# puter.ai.img2txt()

Given an image will return the text contained in the image. Also known as OCR (Optical Character Recognition), this API can be used to extract text from images of printed text, handwriting, or any other text-based content.

## Syntax
```js
puter.ai.img2txt(image, testMode = false)
```

## Parameters
#### `image` (String|File|Blob) (required)
A string containing the URL, or path (on Puter) of the image you want to recognize, or a `File` or `Blob` object containing the image. 

#### `testMode` (Boolean) (Optional)
A boolean indicating whether you want to use the test API. Defaults to `false`. This is useful for testing your code without using up API credits.

## Return value
A `Promise` that will resolve to a string containing the text contained in the image.

In case of an error, the `Promise` will reject with an error message.

## Examples

<strong class="example-title">Extract the text contained in an image</strong>

```html;ai-img2txt
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <script>
        puter.ai.img2txt('https://cdn.handwrytten.com/www/2020/02/home-hero-photo2%402x.png').then(puter.print);
    </script>
</body>
</html>
```

# puter.ai.txt2speech()

Converts text into speech using AI. Supports multiple languages and voices.

## Syntax

```js
puter.ai.txt2speech(text)
puter.ai.txt2speech(text, options)
puter.ai.txt2speech(text, language)
puter.ai.txt2speech(text, language, voice)
puter.ai.txt2speech(text, language, voice, engine)
```

## Parameters
#### `text` (String) (required)
A string containing the text you want to convert to speech. The text must be less than 3000 characters long.

#### `options` (Object) (optional)
An object containing the following optional properties:

- `language` (String): The language to use for speech synthesis. Defaults to `en-US`.
- `voice` (String): The voice to use for speech synthesis. Defaults to `Joanna`.
- `engine` (String): The speech synthesis engine to use. Can be `standard`, `neural`, or `generative`. Defaults to `standard`.

#### `language` (String) (optional)
The language to use for speech synthesis. Defaults to `en-US`. The following languages are supported:

- Arabic (`ar-AE`)
- Catalan (`ca-ES`)
- Chinese (Cantonese) (`yue-CN`)
- Chinese (Mandarin) (`cmn-CN`)
- Danish (`da-DK`)
- Dutch (Belgian) (`nl-BE`)
- Dutch (`nl-NL`)
- English (Australian) (`en-AU`)
- English (British) (`en-GB`)
- English (Indian) (`en-IN`)
- English (New Zealand) (`en-NZ`)
- English (South African) (`en-ZA`)
- English (US) (`en-US`)
- English (Welsh) (`en-GB-WLS`)
- Finnish (`fi-FI`)
- French (`fr-FR`)
- French (Belgian) (`fr-BE`)
- French (Canadian) (`fr-CA`)
- German (`de-DE`)
- German (Austrian) (`de-AT`)
- Hindi (`hi-IN`)
- Icelandic (`is-IS`)
- Italian (`it-IT`)
- Japanese (`ja-JP`)
- Korean (`ko-KR`)
- Norwegian (`nb-NO`)
- Polish (`pl-PL`)
- Portuguese (Brazilian) (`pt-BR`)
- Portuguese (European) (`pt-PT`)
- Romanian (`ro-RO`)
- Russian (`ru-RU`)
- Spanish (European) (`es-ES`)
- Spanish (Mexican) (`es-MX`)
- Spanish (US) (`es-US`)
- Swedish (`sv-SE`)
- Turkish (`tr-TR`)
- Welsh (`cy-GB`)

#### `voice` (String) (optional)
The voice to use for speech synthesis. Defaults to `Joanna`. Please refer to the [voices documentation](https://docs.aws.amazon.com/polly/latest/dg/available-voices.html) for a list of available voices and their corresponding language codes.

#### `engine` (String) (optional)
The speech synthesis engine to use. Can be `standard`, `neural`, or `generative`. Defaults to `standard`. Neural voices generally provide higher quality speech synthesis but may have usage limitations.

## Return value
A `Promise` that will resolve to an MP3 stream when the speech has been synthesized.

## Examples

<strong class="example-title">Convert text to speech (Shorthand)</strong>

```html;ai-txt2speech
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="play">Speak!</button>
    <script>
        document.getElementById('play').addEventListener('click', ()=>{
            puter.ai.txt2speech(`Hello world! Puter is pretty amazing, don't you agree?`).then((audio)=>{
                audio.play();
            });
        });
    </script>
</body>
</html>
```

<strong class="example-title">Convert text to speech using options</strong>

```html;ai-txt2speech-options
<html>
<body>
    <script src="https://js.puter.com/v2/"></script>
    <button id="play">Speak with options!</button>
    <script>
        document.getElementById('play').addEventListener('click', ()=>{
            puter.ai.txt2speech(`Hello world! This is using a neural voice.`, {
                voice: "Joanna",
                engine: "neural",
                language: "en-US"
            }).then((audio)=>{
                audio.play();
            });
        });
    </script>
</body>
</html>
```

<strong class="example-title">Compare different engines</strong>

```html;ai-txt2speech-engines
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        textarea { width: 100%; height: 80px; margin: 10px 0; }
        button { margin: 5px; padding: 10px 15px; cursor: pointer; }
        .status { margin: 10px 0; padding: 5px; font-size: 14px; }
    </style>
</head>
<body>
    <script src="https://js.puter.com/v2/"></script>
    
    <h1>Text-to-Speech Engine Comparison</h1>
    
    <textarea id="text-input" placeholder="Enter text to convert to speech...">Hello world! This is a test of the text-to-speech engines.</textarea>
    
    <div>
        <button onclick="playAudio('standard')">Standard Engine</button>
        <button onclick="playAudio('neural')">Neural Engine</button>
        <button onclick="playAudio('generative')">Generative Engine</button>
    </div>
    
    <div id="status" class="status"></div>

    <script>
        const textInput = document.getElementById('text-input');
        const statusDiv = document.getElementById('status');
        
        async function playAudio(engine) {
            const text = textInput.value.trim();
            
            if (!text) {
                statusDiv.textContent = 'Please enter some text first!';
                return;
            }
            
            if (text.length > 3000) {
                statusDiv.textContent = 'Text must be less than 3000 characters!';
                return;
            }
            
            statusDiv.textContent = `Converting with ${engine} engine...`;
            
            try {
                const audio = await puter.ai.txt2speech(text, {
                    voice: "Joanna",
                    engine: engine,
                    language: "en-US"
                });
                
                statusDiv.textContent = `Playing ${engine} audio`;
                audio.play();
            } catch (error) {
                statusDiv.textContent = `Error: ${error.message}`;
            }
        }
    </script>
</body>
</html>
```
