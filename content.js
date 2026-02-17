// --- LEETCODE PANDA PRODUCTIVITY AGENT ---

const currentUrl = window.location.href;
const isLeetCode = currentUrl.includes("leetcode.com");

// 1. Define distracting sites
const isDistractingSite = (host) => {
    const blacklist = ["reddit.com", "linkedin.com", "youtube.com", "instagram.com", "twitter.com", "x.com"];
    return blacklist.some(site => host.includes(site));
};

// 2. Mood-based sentences tailored to your journey
const moodMessages = {
    happy: [
        "850 solved is amazing. 1000 is the goal! 🚀",
        "ISI Kolkata interns don't scroll LinkedIn! 🧠",
        "A 2028 grad needs to keep their skills sharp! 🎓"
    ],
    annoyed: [
        "I see you opening that tab... I'm watching. 😑",
        "Is this meme really more important than a Medium problem? 🧐",
        "Your streak is waiting for you on LeetCode. Don't let it die! 🔥"
    ],
    sad: [
        "I'm not mad, I'm just disappointed. 😢",
        "We could have solved a Dynamic Programming problem by now. 💔",
        "Is this what it takes to get to 1000 solves? 📉"
    ],
    angry: [
        "GO BACK TO WORK Swastika! 💢",
        "NO MORE SCROLLING. ONLY CODING. 😡",
        "I will keep teleporting until you solve a Medium Array problem! 🐾"
    ]
};

if (!isLeetCode) {
    // 3. Create the UI Elements
    const container = document.createElement('div');
    container.id = 'panda-container';
    document.body.appendChild(container);

    const progressBar = document.createElement('div');
    progressBar.id = 'panda-progress';
    const progressFill = document.createElement('div');
    progressFill.id = 'panda-fill';
    progressBar.appendChild(progressFill);
    container.appendChild(progressBar);

    const panda = document.createElement('img');
    panda.id = 'leetcode-panda';
    panda.src = chrome.runtime.getURL('Panda.gif'); 
    container.appendChild(panda);

    const bubble = document.createElement('div');
    bubble.id = 'panda-bubble';
    container.appendChild(bubble);

    // 4. State Management
    // --- UPDATED PROKRASTINATION LOGIC (FAST MODE) ---
    let warningLevel = 0;

    const progressInterval = setInterval(() => {
        if (isDistractingSite(window.location.hostname)) {
            // Increase by 20 to hit max warning in 5 intervals
            warningLevel += 20; 
            
            const fill = document.getElementById('panda-fill');
            if (fill) fill.style.width = Math.min(warningLevel, 100) + '%';

            // --- RAPID AVATAR & MESSAGE SWAPPING ---
            if (warningLevel >= 20 && warningLevel < 40) {
                panda.src = chrome.runtime.getURL('Panda_Annoyed.gif');
            } else if (warningLevel >= 40 && warningLevel < 80) {
                panda.src = chrome.runtime.getURL('Panda_Sad.gif');
            } else if (warningLevel >= 100) {
                panda.src = chrome.runtime.getURL('Panda_angry.gif');
                panda.classList.add('glow-red'); 
                teleportPanda(container); // Start nagging immediately
            }
        }
    }, 3000); // CHANGED: Checks every 3 seconds instead of minutes
    // 5. Logic to show the correct word sentences for each mood
    const showMessage = () => {
        let currentMood = 'happy';
        if (warningLevel >= 100) currentMood = 'angry';
        else if (warningLevel >= 60) currentMood = 'sad';
        else if (warningLevel >= 30) currentMood = 'annoyed';

        const options = moodMessages[currentMood];
        bubble.innerText = options[Math.floor(Math.random() * options.length)];
        
        bubble.style.opacity = '1';
        setTimeout(() => { bubble.style.opacity = '0'; }, 4000);
    };

    panda.addEventListener('mouseenter', showMessage);

    // 6. Interaction: Double Click to Warp
    panda.addEventListener('dblclick', () => {
        window.location.href = "https://leetcode.com/problems/random-one-question/?difficulty=MEDIUM";
    });
}

function teleportPanda(el) {
    const maxX = window.innerWidth - el.offsetWidth;
    const maxY = window.innerHeight - el.offsetHeight;
    el.style.left = `${Math.floor(Math.random() * maxX)}px`;
    el.style.top = `${Math.floor(Math.random() * maxY)}px`;
}
