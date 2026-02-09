// --- LEETCODE PANDA PRODUCTIVITY AGENT ---

const currentUrl = window.location.href;
const isLeetCode = currentUrl.includes("leetcode.com");

if (!isLeetCode) {
    // 1. Create the Container
    const container = document.createElement('div');
    container.id = 'panda-container';
    
    // 2. Create the Progress Bar (Visual warning of procrastination)
    const progressBar = document.createElement('div');
    progressBar.id = 'panda-progress';
    const progressFill = document.createElement('div');
    progressFill.id = 'panda-fill';
    progressBar.appendChild(progressFill);
    container.appendChild(progressBar);

    // 3. Initialize the Panda Image
    const panda = document.createElement('img');
    panda.id = 'leetcode-panda';
    panda.src = chrome.runtime.getURL('Panda.gif'); 
    container.appendChild(panda);

    // 4. Create the Speech Bubble
    const bubble = document.createElement('div');
    bubble.id = 'panda-bubble';
    container.appendChild(bubble);

    document.body.appendChild(container);

    // 5. Procrastination Logic: Progress bar fills every 2 minutes
    let warningLevel = 0;
    const progressInterval = setInterval(() => {
        if (!window.location.href.includes("leetcode.com")) {
            warningLevel += 10;
            progressFill.style.width = Math.min(warningLevel, 100) + '%';
            if (warningLevel >= 100) {
                panda.style.filter = 'drop-shadow(0px 0px 10px #ff4757)'; // Glow red
            }
        }
    }, 120000); 

    // 6. Randomized Personality Messages
    const messages = [
        "ISI Kolkata interns don't scroll LinkedIn! 🧠",
        "850 solved is amazing. 1000 is the goal! 🚀",
        "A 2028 grad needs to keep their skills sharp! 🎓",
        "Is this tab really more important than a Medium problem? 🧐",
        "Double click me to warp to your next challenge! 🐾"
    ];

    const showMessage = () => {
        bubble.innerText = messages[Math.floor(Math.random() * messages.length)];
        bubble.style.opacity = '1';
        setTimeout(() => { bubble.style.opacity = '0'; }, 4000);
    };

    // Show message on hover
    panda.addEventListener('mouseenter', showMessage);

    // 7. Interaction: Double Click to Warp to Random Medium
    panda.addEventListener('dblclick', () => {
        window.location.href = "https://leetcode.com/problems/random-one-question/?difficulty=MEDIUM";
    });

} else {
    console.log("Panda is happy! Good luck with your solve.");
}