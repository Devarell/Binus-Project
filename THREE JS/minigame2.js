// --- MESIN MINIGAME LOGIC GATEWAY (IF-ELSE) ---
let logicTimeout;

export function mulaiLogicMinigame(onSuccess, onFail) {
    const logicLayer = document.getElementById('logic-layer');
    const ruleDisplay = document.getElementById('logic-rule');
    const dataDisplay = document.getElementById('logic-data');
    const timerBar = document.getElementById('logic-timer');

    // Bank Soal: Mengajarkan logika == (sama dengan) dan > (lebih besar)
    const challenges = [
        { 
            rule: "( file_type == 'MALWARE' )", 
            data: "file_type = 'DOCUMENT'", 
            isMalicious: false // Karena DOCUMENT bukan MALWARE, maka AMAN (Kiri)
        },
        { 
            rule: "( power_level > 90 )", 
            data: "power_level = 120", 
            isMalicious: true // 120 lebih besar dari 90, maka BAHAYA (Kanan)
        },
        { 
            rule: "( origin == 'UNKNOWN_SIGNAL' )", 
            data: "origin = 'UNKNOWN_SIGNAL'", 
            isMalicious: true // Cocok dengan virus, maka BAHAYA (Kanan)
        },
        { 
            rule: "( security_clearance == 'ADMIN' )", 
            data: "security_clearance = 'ADMIN'", 
            isMalicious: false // Ini Admin sungguhan, maka AMAN (Kiri)
        },
        { 
            rule: "( virus_signature == TRUE )", 
            data: "virus_signature = FALSE", 
            isMalicious: false // Tidak ada virus, maka AMAN (Kiri)
        }
    ];

    let currentRound = 0;
    const totalRounds = 3; 
    let currentChallenge;

    const nextRound = () => {
        if (currentRound >= totalRounds) {
            endGame(true); 
            return;
        }

        currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        ruleDisplay.innerText = currentChallenge.rule + " { BLOCK }";
        dataDisplay.innerText = currentChallenge.data;
        
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        setTimeout(() => {
            timerBar.style.transition = 'width 4s linear';
            timerBar.style.width = '0%';
        }, 50);

        clearTimeout(logicTimeout);
        logicTimeout = setTimeout(() => {
            endGame(false); // Telat mikir = Gagal
        }, 4000);
    };

    const endGame = (isWin) => {
        document.removeEventListener('keydown', handleLogicInput);
        logicLayer.style.display = 'none';
        clearTimeout(logicTimeout);
        if(isWin) onSuccess(); else onFail();
    };

    const handleLogicInput = (e) => {
        if (e.key === 'ArrowLeft') { // ALLOW
            if (currentChallenge.isMalicious) endGame(false);
            else { currentRound++; nextRound(); }
        } else if (e.key === 'ArrowRight') { // BLOCK
            if (!currentChallenge.isMalicious) endGame(false);
            else { currentRound++; nextRound(); }
        }
    };

    document.addEventListener('keydown', handleLogicInput);
    logicLayer.style.display = 'block';
    nextRound();
}