// File: bitwiseGame.js

let bitwiseTimeout;

export function mulaiBitwiseMinigame(onSuccess, onFail) {
    const layer = document.getElementById('bitwise-layer');
    const opDisplay = document.getElementById('bitwise-op');
    const timerBar = document.getElementById('bitwise-timer');

    // Bank Soal Gerbang Logika Biner
    const challenges = [
        { op: "1 AND 1", ans: "1" },
        { op: "1 AND 0", ans: "0" },
        { op: "0 AND 0", ans: "0" },
        { op: "1 OR 0",  ans: "1" },
        { op: "0 OR 0",  ans: "0" },
        { op: "1 XOR 1", ans: "0" }, // Sama = 0
        { op: "1 XOR 0", ans: "1" }  // Beda = 1
    ];

    let currentRound = 0;
    const totalRounds = 5; // Harus benar 5 kali berturut-turut!
    let currentAns = "";

    const nextRound = () => {
        if (currentRound >= totalRounds) {
            endGame(true); // Lolos kecepatan cahaya!
            return;
        }

        // Ambil soal acak
        const c = challenges[Math.floor(Math.random() * challenges.length)];
        opDisplay.innerText = c.op;
        currentAns = c.ans;

        // Timer Super Cepat: 1.5 Detik per Ronde!
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        setTimeout(() => {
            timerBar.style.transition = 'width 1.5s linear';
            timerBar.style.width = '0%';
        }, 50);

        clearTimeout(bitwiseTimeout);
        bitwiseTimeout = setTimeout(() => {
            endGame(false); // Telat mikir!
        }, 1500);
    };

    const endGame = (isWin) => {
        document.removeEventListener('keydown', handleInput);
        layer.style.display = 'none';
        clearTimeout(bitwiseTimeout);
        if(isWin) onSuccess(); else onFail();
    };

    const handleInput = (e) => {
        if (e.key === '0' || e.key === '1') {
            if (e.key === currentAns) {
                currentRound++; // Benar, lanjut soal berikutnya tanpa henti!
                nextRound();
            } else {
                endGame(false); // Salah logika!
            }
        }
    };

    document.addEventListener('keydown', handleInput);
    layer.style.display = 'block';
    nextRound();
}