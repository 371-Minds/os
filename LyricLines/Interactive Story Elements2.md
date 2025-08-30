Perfect! I'll integrate the **Clickable Hotspots** and **Branching Reading Paths** directly into your existing immersive reading experience. Here's the complete integrated version:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Immersive Reading Experience - Interactive Edition</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            /* Day Theme (default) */
            --bg-color: #0a0a0f;
            --text-color: #e0e0e0;
            --accent-color: #00ffff;
            --container-bg: rgba(0, 0, 0, 0.7);
            --container-border: rgba(255, 255, 255, 0.1);
        }

        body.theme-day {
            /* Day Theme */
            --bg-color: #f4f1ea;
            --text-color: #3a3a3a;
            --accent-color: #d9534f;
            --container-bg: rgba(255, 255, 255, 0.8);
            --container-border: rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-color);
            color: var(--text-color);
            overflow-x: hidden;
            transition: all 0.8s ease;
        }

        /* Background Environments */
        .environment-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            transition: opacity 1s ease;
        }

        .env-forest {
            background: radial-gradient(ellipse at center, rgba(34, 139, 34, 0.3) 0%, rgba(0, 50, 0, 0.8) 100%),
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="30" r="2" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="60" r="1" fill="%23ffffff" opacity="0.2"/><circle cx="40" cy="80" r="1.5" fill="%23ffffff" opacity="0.1"/></svg>');
        }

        .env-ocean {
            background: radial-gradient(ellipse at center, rgba(0, 119, 190, 0.4) 0%, rgba(0, 33, 64, 0.9) 100%),
                        linear-gradient(45deg, rgba(0, 150, 255, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 150, 255, 0.1) 75%);
            background-size: 40px 40px;
            animation: wave 20s ease-in-out infinite;
        }

        .env-space {
            background: radial-gradient(ellipse at center, rgba(75, 0, 130, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%),
                        url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="20" r="0.5" fill="%23ffffff"/><circle cx="30" cy="40" r="0.3" fill="%23ffffff"/><circle cx="70" cy="10" r="0.4" fill="%23ffffff"/><circle cx="90" cy="70" r="0.3" fill="%23ffffff"/><circle cx="50" cy="90" r="0.5" fill="%23ffffff"/></svg>');
        }

        .env-desert {
            background: radial-gradient(ellipse at center, rgba(255, 140, 0, 0.3) 0%, rgba(139, 69, 19, 0.8) 100%);
        }

        @keyframes wave {
            0%, 100% { background-position: 0 0; }
            50% { background-position: 40px 40px; }
        }

        /* Neon Jellyfish Animation */
        .jellyfish {
            position: fixed;
            top: 20%;
            left: -200px;
            width: 150px;
            height: 200px;
            z-index: 1;
            animation: float 15s ease-in-out infinite;
        }

        .jellyfish-bell {
            width: 100px;
            height: 80px;
            background: radial-gradient(ellipse at center, 
                rgba(0, 255, 255, 0.8) 0%, 
                rgba(0, 200, 255, 0.6) 40%, 
                rgba(0, 150, 255, 0.3) 80%, 
                transparent 100%);
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            margin: 0 auto;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.6),
                        inset 0 0 20px rgba(0, 255, 255, 0.3);
            animation: pulse 2s ease-in-out infinite;
        }

        .tentacles {
            display: flex;
            justify-content: space-around;
            margin-top: -10px;
        }

        .tentacle {
            width: 3px;
            height: 120px;
            background: linear-gradient(to bottom, 
                rgba(0, 255, 255, 0.8) 0%, 
                rgba(0, 200, 255, 0.4) 50%, 
                transparent 100%);
            border-radius: 2px;
            animation: sway 3s ease-in-out infinite;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
        }

        .tentacle:nth-child(1) { animation-delay: 0s; }
        .tentacle:nth-child(2) { animation-delay: 0.5s; }
        .tentacle:nth-child(3) { animation-delay: 1s; }
        .tentacle:nth-child(4) { animation-delay: 1.5s; }

        @keyframes float {
            0% { 
                left: -200px; 
                top: 20%; 
                transform: rotate(-5deg);
            }
            25% { 
                left: 25%; 
                top: 15%; 
                transform: rotate(2deg);
            }
            50% { 
                left: 50%; 
                top: 25%; 
                transform: rotate(-3deg);
            }
            75% { 
                left: 75%; 
                top: 18%; 
                transform: rotate(1deg);
            }
            100% { 
                left: 110%; 
                top: 22%; 
                transform: rotate(-2deg);
            }
        }

        @keyframes pulse {
            0%, 100% { 
                box-shadow: 0 0 30px rgba(0, 255, 255, 0.6),
                           inset 0 0 20px rgba(0, 255, 255, 0.3);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 50px rgba(0, 255, 255, 0.9),
                           inset 0 0 30px rgba(0, 255, 255, 0.5);
                transform: scale(1.05);
            }
        }

        @keyframes sway {
            0%, 100% { transform: translateX(-2px) rotate(-2deg); }
            50% { transform: translateX(2px) rotate(2deg); }
        }

        /* Floating Balls */
        .floating-ball {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent);
            box-shadow: 0 0 20px;
            z-index: 1;
            transition: all 0.3s ease;
        }

        /* Reading Container */
        .reading-container {
            position: relative;
            z-index: 10;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: var(--container-bg);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            margin-top: 100px;
            border: 1px solid var(--container-border);
        }

        .story-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 30px;
            background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: colorShift 5s ease-in-out infinite;
        }

        @keyframes colorShift {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
        }

        .typewriter-text {
            font-family: 'Inter', monospace;
            font-size: 1.2rem;
            line-height: 1.8;
            color: var(--text-color);
            margin-bottom: 20px;
            min-height: 100px;
        }

        .cursor {
            display: inline-block;
            width: 2px;
            height: 1.2em;
            background: var(--accent-color);
            animation: blink 1s infinite;
            vertical-align: baseline;
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }

        /* Clickable Hotspots */
        .hotspot {
            color: var(--accent-color);
            cursor: pointer;
            text-decoration: underline dotted;
            position: relative;
            transition: all 0.3s ease;
        }

        .hotspot:hover {
            color: #ff6b6b;
            text-shadow: 0 0 8px currentColor;
        }

        .hotspot-popup-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 4000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
        }

        .hotspot-popup-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }

        .hotspot-popup {
            background: var(--container-bg);
            color: var(--text-color);
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 40px var(--accent-color);
            position: relative;
            border: 1px solid var(--container-border);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }

        .hotspot-popup-overlay.active .hotspot-popup {
            transform: scale(1);
        }

        .hotspot-popup h2 {
            margin-top: 0;
            color: var(--accent-color);
            font-family: 'Playfair Display', serif;
        }

        .hotspot-popup-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--accent-color);
            background: none;
            border: none;
            transition: transform 0.2s ease;
        }

        .hotspot-popup-close:hover {
            transform: scale(1.2);
        }

        /* Branching Paths */
        .branching-path {
            margin: 30px 0;
            padding: 20px;
            background: rgba(0, 255, 255, 0.1);
            border-radius: 15px;
            text-align: center;
            border: 1px solid rgba(0, 255, 255, 0.3);
        }

        .branch-choice {
            margin: 10px;
            padding: 12px 20px;
            background: var(--accent-color);
            border: none;
            border-radius: 10px;
            color: var(--bg-color);
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
        }

        .branch-choice:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
        }

        .branch-content.hidden {
            display: none;
        }

        .branch-content {
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Controls */
        .controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 100;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .control-btn {
            padding: 10px 15px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 8px;
            color: var(--accent-color);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
        }

        .control-btn:hover {
            background: rgba(0, 255, 255, 0.2);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .environment-selector {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            display: flex;
            gap: 10px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
