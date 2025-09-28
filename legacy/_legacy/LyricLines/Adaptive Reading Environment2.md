<think>
**Implementing User Preferences**

I'm focusing on incorporating adaptive features into the reading experience. Specifically, I'm working on an automatic theme switcher. The goal is for the reading interface to dynamically adjust its color scheme based on the user's local time. This will enhance readability and comfort during different times of the day.


**Designing New Features**

I'm now diving deeper into the specifics of the new features. The initial plan involves a time-based theme switcher using CSS classes, and a reading rhythm tracker that analyzes reading speed and suggests breaks. Next, I'm working on ambient soundscapes synchronized with the story content. The biggest challenge will be implementing a text-to-speech system with character-specific voices. I will create the basic framework for each feature, focusing on how they interact with existing components.


**Defining Module Dependencies**

I'm outlining the feature dependencies. The theme switcher is relatively straightforward, mainly CSS and JavaScript. The reading rhythm tracker leans on the existing WPM calculation, needing historical data and a trigger mechanism for break suggestions. The ambient soundscapes will build on the environment feature. For text-to-speech, I will explore available TTS APIs. I need to ensure these integrate into the core ImmersiveReader class seamlessly.


**Mapping out the implementation**

I'm now building the framework for all the features, breaking down the logic into manageable steps. The theme switcher needs a function that checks the hour and adds or removes CSS classes. The reading rhythm tracker needs to analyze the WPM and display a break suggestion with a visual cue. Ambient soundscapes will build upon existing audio features. Finally, the TTS implementation uses built-in browser APIs and includes assigning character voices. I am prioritizing a clear architectural design for modularity and easy maintenance.


**Refining Feature Implementations**

I'm currently concentrating on fleshing out the functions for the text-to-speech module. I am constructing the `TextToSpeechManager` class. I'm making sure the text parsing handles different dialogue structures. I'm considering different voice assignment methodologies for character voices and constructing the queueing and control mechanics. Next, I'll implement the integration for ambient soundscapes, including dynamic audio switching.


**Orchestrating the Design**

I'm finalizing the feature specifications. I will provide modular components that integrate into the `ImmersiveReader` class. This includes UI elements, CSS for styling, and code samples for easy incorporation. I am particularly focused on the `TextToSpeechManager`'s internal design, parsing dialogue structures and managing voice assignments, as well as the overall user experience and clear documentation.



</think>Of course! Let's enhance the immersive reading experience with adaptive features that respond to the reader and the story's context.

Here are the implementations for your requested features, designed to be modular and easy to integrate into the existing project.

---

### 1. Automated Day/Night Theme Switcher

This feature automatically adjusts the color theme based on the user's local time to enhance comfort and reduce eye strain.

#### How it Works
A script checks the current hour. During the day (e.g., 7 AM to 7 PM), it applies a `theme-day` class for a lighter, paper-like background. At night, it switches to `theme-night` for a dark, low-contrast theme.

#### CSS (Add to your `<style>` block)
This defines the color variables for both themes. The `theme-night` class overrides the defaults.

```css
/* -------------------------------------------------
   ADAPTIVE THEME SYSTEM
   ------------------------------------------------- */
:root {
    /* Day Theme (default) */
    --bg-color: #f4f1ea;
    --text-color: #3a3a3a;
    --accent-color: #d9534f;
    --container-bg: rgba(255, 255, 255, 0.7);
    --container-border: rgba(0, 0, 0, 0.1);
}

body.theme-night {
    /* Night Theme */
    --bg-color: #0a0a0f;
    --text-color: #e0e0e0;
    --accent-color: #00ffff;
    --container-bg: rgba(0, 0, 0, 0.7);
    --container-border: rgba(255, 255, 255, 0.1);
}

/* Apply the variables */
body {
    background: var(--bg-color);
    color: var(--text-color);
    transition: background 0.8s ease, color 0.8s ease;
}

.reading-container {
    background: var(--container-bg);
    border-color: var(--container-border);
}

.typewriter-text {
    color: var(--text-color);
}

.cursor {
    background: var(--accent-color);
}
```

#### JavaScript (Add this standalone script)

```javascript
/* -------------------------------------------------
   THEME SWITCHER LOGIC
   ------------------------------------------------- */
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.updateTheme();
        // Check the theme every 30 minutes
        setInterval(() => this.updateTheme(), 1800000);
    }

    updateTheme() {
        const currentHour = new Date().getHours();
        // Day theme between 7 AM and 7 PM (19:00)
        if (currentHour >= 7 && currentHour < 19) {
            this.body.classList.remove('theme-night');
            this.body.classList.add('theme-day');
            console.log("Switched to Day Theme");
        } else {
            this.body.classList.remove('theme-day');
            this.body.classList.add('theme-night');
            console.log("Switched to Night Theme");
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => new ThemeManager());
```

#### How to Integrate
1.  **Add the CSS** to your main `<style>` block.
2.  **Add the JavaScript** snippet anywhere inside your `<script>` tag.
3.  **Important:** You may need to adjust your existing styles (like the neon jellyfish and floating balls) to look good on a light background or disable them during the day theme.

---

### 2. Reading Rhythm Tracker & Break Suggester

This feature monitors the reader's speed and suggests a break when it detects a significant drop, which often indicates fatigue.

#### How it Works
The system maintains a rolling average of the user's Words Per Minute (WPM). If the current WPM drops more than a certain percentage below this average, a gentle visual cue appears.

#### HTML (Add this inside your `<body>`)

```html
<!-- Break Suggestion Cue -->
<div id="breakCue" class="break-cue hidden">
    <div class="break-cue__icon">☕</div>
    <div class="break-cue__text">Feeling tired? Time for a short break!</div>
</div>
```

#### CSS (Add to your `<style>` block)

```css
/* -------------------------------------------------
   BREAK SUGGESTER CUE
   ------------------------------------------------- */
.break-cue {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1500;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    background: rgba(255, 223, 186, 0.9);
    color: #3a2e2e;
    border-radius: 50px;
    font-size: 0.9rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(200%);
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.break-cue:not(.hidden) {
    transform: translateY(0);
}

.break-cue__icon {
    font-size: 1.5rem;
    animation: gentle-bob 2s ease-in-out infinite;
}

@keyframes gentle-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
}
```

#### JavaScript (Integrate into your `ImmersiveReader` class)

```javascript
// Add these properties to the ImmersiveReader constructor
this.wpmHistory = [];
this.wpmAverage = 0;
this.breakCueShown = false;

// Replace the existing calculateReadingSpeed() method with this one
calculateReadingSpeed() {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - this.startTime) / 1000 / 60; // in minutes
    if (timeElapsed > 0.1) { // Start calculating after a short period
        this.readingSpeed = Math.round(this.wordCount / timeElapsed);
        document.getElementById('wpmDisplay').textContent = this.readingSpeed;

        // Update WPM history and average
        this.wpmHistory.push(this.readingSpeed);
        if (this.wpmHistory.length > 10) {
            this.wpmHistory.shift(); // Keep last 10 readings
        }
        const sum = this.wpmHistory.reduce((a, b) => a + b, 0);
        this.wpmAverage = sum / this.wpmHistory.length;

        this.checkRhythm();
    }
}

// Add this new method to the ImmersiveReader class
checkRhythm() {
    const dropThreshold = 0.75; // Suggest break if speed drops to 75% of average
    if (this.wpmHistory.length > 5 && this.readingSpeed < (this.wpmAverage * dropThreshold) && !this.breakCueShown) {
        this.suggestBreak();
    }
}

suggestBreak() {
    const breakCue = document.getElementById('breakCue');
    breakCue.classList.remove('hidden');
    this.breakCueShown = true;

    // Hide the cue after 10 seconds
    setTimeout(() => {
        breakCue.classList.add('hidden');
        // Allow the cue to be shown again after a while
        setTimeout(() => { this.breakCueShown = false; }, 60000); // 1 minute cooldown
    }, 10000);
}
```

---

### 3. Dynamic Ambient Soundscapes

This system generates procedural audio that matches the story's setting, creating a deeply immersive atmosphere.

#### How it Works
Using the Web Audio API, we create a `SoundscapeManager` that generates different audio textures (wind, waves, drones) based on the selected environment.

#### JavaScript (Replace `createBackgroundMusic` and related audio code)

```javascript
/* -------------------------------------------------
   AMBIENT SOUNDSCAPE MANAGER
   ------------------------------------------------- */
class SoundscapeManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.1; // Start with low volume
        this.masterGain.connect(this.audioContext.destination);
        this.currentSoundscape = null;
    }

    setVolume(value) { // value from 0 to 1
        this.masterGain.gain.setValueAtTime(value * 0.3, this.audioContext.currentTime);
    }

    stopAll() {
        if (this.currentSoundscape) {
            this.currentSoundscape.forEach(node => node.stop ? node.stop() : node.disconnect());
        }
        this.currentSoundscape = null;
    }

    play(environment) {
        this.stopAll();
        let nodes = [];
        switch (environment) {
            case 'forest':
                // Wind sound (filtered brown noise)
                const wind = this.createNoise('brown', 0.5, 400);
                // Occasional bird chirps
                const birds = this.createPeriodicSound(3000, 5000, 800, 1200, 0.1, 'sine');
                nodes = [wind.source, wind.filter, birds.interval];
                break;
            case 'ocean':
                // Wave sound (filtered pink noise)
                const waves = this.createNoise('pink', 0.8, 250);
                // Water drips
                const drips = this.createPeriodicSound(4000, 6000, 600, 800, 0.05, 'triangle');
                nodes = [waves.source, waves.filter, drips.interval];
                break;
            case 'space':
                // Deep drone
                const drone = this.createDrone(55, 'sawtooth', 0.3);
                // Sparse pings
                const pings = this.createPeriodicSound(5000, 8000, 1000, 1500, 0.1, 'sine');
                nodes = [drone, pings.interval];
                break;
            default:
                return;
        }
        this.currentSoundscape = nodes;
    }

    createNoise(type, gainValue, filterFreq) {
        const bufferSize = this.audioContext.sampleRate * 2; // 2 seconds
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            let noise;
            if (type === 'pink') {
                const b0 = 0.99886 * lastOut + (Math.random() * 2 - 1) * 0.0555179;
                lastOut = b0;
                noise = b0;
            } else { // brown
                const white = Math.random() * 2 - 1;
                noise = (lastOut + (0.02 * white)) / 1.02;
                lastOut = noise;
                noise *= 3.5;
            }
            output[i] = noise;
        }
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const gain = this.audioContext.createGain();
        gain.gain.value = gainValue;
        const filter = this.audioContext.createBiquadFilter();
