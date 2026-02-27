// --- MESIN MINIGAME QTE ---
let qteTimeout;
let currentQteKey = "";

export function mulaiQTE(onSuccess, onFail) {
    const qteLayer = document.getElementById('qte-layer');
    const qteKeyDisplay = document.getElementById('qte-key');
    const qteTimerBar = document.getElementById('qte-timer');
    
    // 1. Pilih parameter acak bergaya CLI (E=Execute, F=Force, X=eXtract, Y=Yes, A=Abort)
    const keys = ['E', 'F', 'X', 'Y', 'A', 'Q'];
    currentQteKey = keys[Math.floor(Math.random() * keys.length)];
    
    // 2. Tampilkan di layar
    qteKeyDisplay.innerText = currentQteKey;
    qteLayer.style.display = 'block';
    
    // 3. Animasi Bar Waktu (Berjalan mundur 2 detik)
    qteTimerBar.style.transition = 'none';
    qteTimerBar.style.width = '100%';
    setTimeout(() => {
        qteTimerBar.style.transition = 'width 2s linear';
        qteTimerBar.style.width = '0%';
    }, 50);

    // 4. Pendeteksi Ketikan Keyboard
    const handleKeyDown = (e) => {
        const ditekan = e.key.toUpperCase();
        
        // Cek apakah yang ditekan itu W/A/S/D
        if (keys.includes(ditekan)) {
            clearTimeout(qteTimeout); // Hentikan timer ledakan!
            document.removeEventListener('keydown', handleKeyDown); // Matikan pendeteksi
            qteLayer.style.display = 'none';
            
            if (ditekan === currentQteKey) {
                onSuccess(); // Tombol Benar!
            } else {
                onFail(); // Salah Pencet Tombol!
            }
        }
    };

    document.addEventListener('keydown', handleKeyDown);

    // 5. Bom Waktu Ledakan (Jika pemain diam saja selama 2 detik)
    qteTimeout = setTimeout(() => {
        document.removeEventListener('keydown', handleKeyDown);
        qteLayer.style.display = 'none';
        onFail(); // Waktu Habis!
    }, 2000); 
}