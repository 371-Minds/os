<think>
**Planning new features**

I’m considering implementing new features like a Theme Switcher that changes colors based on time, a Reading Rhythm Tracker to suggest breaks visually, and Ambient Soundscapes for matching soundtracks. The user has a combined immersive reading project and is looking for prompts related to "Adaptive Reading Environment" with potentially code snippets to integrate these features into their existing reading page. I’ll ensure to provide modular code, along with necessary details while being cautious about copyright with sound materials.**Designing generative audio features**

I’m working on creating generative audio through procedural oscillators and filtered noise. I’ll develop a soundscape generator for different environments, like birds chirping in a forest or waves at the ocean. For Text-to-Speech, I'll utilize the Web Speech API to assign voices to characters based on dialogue detection. I need to include a UI for voice selection and features to play, pause, or switch voices. Lastly, I’m planning a Theme Switcher to change color schemes based on the time of day.**Developing Reading Rhythm Tracker**

For the Reading Rhythm Tracker, I'll utilize the reading speed data from the ImmersiveReader to suggest breaks with visual cues, like a breathing circle. After a certain time or speed threshold, I can prompt break suggestions. I’ll track session time and adjust the frequency of breaks, possibly using a Pomodoro-like approach. I’ll provide code snippets for integrating CSS variables, a ThemeManager class, and components for the RhythmTracker, SoundscapeEngine, and TTSController while keeping it concise and useful. Bullet lists and minimal formatting will help maintain clarity.**Creating audio and theme features**

I’m working on features that avoid heavy formatting, although earlier code included some. It’s important to keep minimal headings and include concise code blocks since this is a code-focused task. Also, audio context unlocking should occur with user interaction instead of on load. I'll integrate this with the existing audioContext in ImmersiveReader and require a user click to start sounds. For the ThemeSwitcher, I’ll provide CSS for theme variables and transitions, and it will check the time of day to update theme classes regularly.**Implementing adaptive features**

I’m creating modular add-ons for four adaptive features to enhance the reading experience. This includes TTS controls with buttons for play, pause, and stop, and a theme button that cycles through themes. To avoid complexity with highlighting the current sentence spoken, I'll opt for a text-shadow effect and subtle scrolling instead. The Soundscape toggle repurposes existing controls. I’ll also provide JavaScript classes for managing themes, rhythm tracking, soundscapes, and TTS functionality, alongside event dispatching for environmental changes. Let’s keep the code concise and readable!
</think>Awesome set of upgrades. Below are compact, drop‑in modules to add all four adaptive features to the immersive reader you already have. They’re vanilla JS/CSS, designed to wire into your existing ImmersiveReader, environment buttons, and audio controls.

Add these small HTML bits first (new buttons)
- In your Controls block, add:
<button class="control-btn" id="themeBtn">🎨 Theme: Auto</button>
<button class="control-btn" id="ttsToggle">🔊 Read Aloud</button>
<button class="control-btn" id="ttsStop">⏹ Stop</button>

- A subtle break orb (near end of body is fine):
<div id="breakOrb" class="break-orb" title="Time for a quick break?"></div>

CSS (themes + break orb)
Add to your <style>:

:root{
  --bg:#0a0a0f;--fg:#e0e0e0;--panel:rgba(0,0,0,0.7);--accent:#00ffff
}
body{background:var(--bg);color:var(--fg)}
.reading-container{background:var(--panel)}
/* Themes */
.theme-dawn{--bg:#0b0e12;--fg:#e9f1ff;--panel:rgba(8,12,18,.7);--accent:#ffb84d}
.theme-day{--bg:#10141b;--fg:#f2f7ff;--panel:rgba(16,20,27,.7);--accent:#4ecdc4}
.theme-dusk{--bg:#0e0b14;--fg:#eae6ff;--panel:rgba(10,8,18,.72);--accent:#ff6b6b}
.theme-night{--bg:#06070b;--fg:#d3eaff;--panel:rgba(2,4,8,.78);--accent:#00ffff}
/* Smooth transitions */
body,.reading-container{transition:background .6s,color .6s}

/* Break orb */
.break-orb{
  position:fixed;right:20px;bottom:90px;width:48px;height:48px;border-radius:50%;
  background:radial-gradient(circle at 30% 30%, var(--accent), rgba(255,255,255,.05));
  box-shadow:0 0 18px var(--accent);cursor:pointer;display:none;z-index:2500;
  animation:breathe 4s ease-in-out infinite
}
@keyframes breathe{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.08);opacity:1}}

JavaScript (paste after your existing script)
1) Theme Switcher (auto by local time, with manual override)
class ThemeSwitcher{
  constructor(btn){
    this.btn=btn; this.mode=localStorage.getItem('themeMode')||'auto';
    this.apply(); this.bind(); this.scheduleAutoUpdate();
  }
  getTimeSlot(){
    const h=new Date().getHours();
    if(h>=5&&h<8) return 'dawn';
    if(h>=8&&h<18) return 'day';
    if(h>=18&&h<21) return 'dusk';
    return 'night';
  }
  apply(){
    const body=document.body;
    body.classList.remove('theme-dawn','theme-day','theme-dusk','theme-night');
    const slot=this.mode==='auto'?this.getTimeSlot():this.mode;
    body.classList.add(`theme-${slot}`);
    this.btn.textContent=`🎨 Theme: ${this.mode[0].toUpperCase()+this.mode.slice(1)}`;
  }
  bind(){
    this.btn.addEventListener('click',()=>{
      const order=['auto','day','night','dawn','dusk'];
      this.mode=order[(order.indexOf(this.mode)+1)%order.length];
      localStorage.setItem('themeMode',this.mode); this.apply();
    });
  }
  scheduleAutoUpdate(){
    if(this.mode!=='auto') return;
    setInterval(()=>{ if(this.mode==='auto') this.apply() }, 15*60*1000);
  }
}

2) Reading Rhythm Tracker (observes WPM and session time, suggests breaks with a visual orb)
class ReadingRhythm{
  constructor(reader, orbEl){
    this.r=reader; this.orb=orbEl; this.sessionStart=Date.now();
    this.window=[]; this.lastIdx=0; this.bind();
    this.timer=setInterval(()=>this.tick(), 15000);
  }
  bind(){
    this.orb.addEventListener('click',()=>{
      this.hideOrb();
      const go=confirm('Time for a 2–3 minute break? Start a quick star mini‑game?');
      if(go && window.starGame) window.starGame.start();
      this.sessionStart=Date.now(); this.window=[];
    });
  }
  movingAvgWPM(){
    if(this.window.length===0) return this.r.readingSpeed||0;
    return Math.round(this.window.reduce((a,b)=>a+b,0)/this.window.length);
  }
  tick(){
    const wpm=this.r.readingSpeed||0;
    if(wpm>0) this.window.push(wpm);
    if(this.window.length>12) this.window.shift(); // ~3 min window at 15s
    const avg=this.movingAvgWPM();
    const minutes=(Date.now()-this.sessionStart)/60000;

    const slump = this.window.length>=6 && wpm>0 && wpm < avg*0.75;
    const longSession = minutes>=20;
    if((slump||longSession) && this.r.currentIndex>this.lastIdx+200){
      this.showOrb();
    }
    this.lastIdx=this.r.currentIndex;
  }
  showOrb(){ this.orb.style.display='block' }
  hideOrb(){ this.orb.style.display='none' }
}

3) Ambient Soundscapes (procedural, linked to environment; replaces the simple oscillator music)
class Soundscapes{
  constructor(reader, volumeSlider, toggleBtn){
    this.r=reader; this.ctx=null; this.master=null; this.env=null;
    this.enabled=true; this.volSlider=volumeSlider; this.toggleBtn=toggleBtn;
    this.nodes={}; this.bind();
  }
  bind(){
    this.toggleBtn.textContent='🎵 Soundscape: ON';
    this.toggleBtn.addEventListener('click',()=>{ this.enabled=!this.enabled; this.updateEnable() });
    this.volSlider.addEventListener('input',()=>this.setVolume(this.volSlider.value/100));
    // Listen for environment changes (add dispatch in your changeEnvironment
