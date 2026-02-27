// --- MESIN MINIGAME ARRAY INDEXING ---
let arrayTimeout;

export function mulaiArrayMinigame(onSuccess, onFail) {
    const arrayLayer = document.getElementById('array-layer');
    const arrayDisplay = document.getElementById('array-data');
    const timerBar = document.getElementById('array-timer');

    let currentRound = 0;
    const totalRounds = 3; // Harus menghindar 3 lapis asteroid beruntun!
    let safeIndex = 0;

    const nextRound = () => {
        if (currentRound >= totalRounds) {
            endGame(true); 
            return;
        }

        // 1. Buat array asteroid yang semuanya batu
        let sabuk = ['"🪨"', '"🪨"', '"🪨"', '"🪨"'];
        
        // 2. Pilih satu indeks acak untuk dikosongkan (Ini jawaban benarnya)
        safeIndex = Math.floor(Math.random() * 4);
        sabuk[safeIndex] = '<span style="color: #00ff00;">"NULL"</span>'; // Celah aman

        // 3. Tampilkan ke layar
        arrayDisplay.innerHTML = `[ ${sabuk.join(", ")} ]`;
        
        // 4. Reset Timer (Pemain punya 3 detik untuk mikir)
        timerBar.style.transition = 'none';
        timerBar.style.width = '100%';
        setTimeout(() => {
            timerBar.style.transition = 'width 3s linear';
            timerBar.style.width = '0%';
        }, 50);

        // 5. Bom Waktu
        clearTimeout(arrayTimeout);
        arrayTimeout = setTimeout(() => {
            endGame(false); // Telat ketik = Nabrak!
        }, 3000);
    };

    const endGame = (isWin) => {
        document.removeEventListener('keydown', handleArrayInput);
        arrayLayer.style.display = 'none';
        clearTimeout(arrayTimeout);
        if(isWin) onSuccess(); else onFail();
    };

    const handleArrayInput = (e) => {
        // Cek apakah pemain mengetik angka 0, 1, 2, atau 3
        const allowedKeys = ['0', '1', '2', '3'];
        if (allowedKeys.includes(e.key)) {
            const tebakan = parseInt(e.key);
            
            if (tebakan === safeIndex) {
                // Jawaban Benar! Indeks cocok.
                currentRound++;
                nextRound(); 
            } else {
                // Salah ketik indeks! Kapal menabrak batu.
                endGame(false); 
            }
        }
    };

    document.addEventListener('keydown', handleArrayInput);
    arrayLayer.style.display = 'block';
    nextRound();
}