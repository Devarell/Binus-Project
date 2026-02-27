import { sfxMissionFailure } from './audio.js';

export function tampilkanGameOver(pesanKematian) {
    const gameOverLayer = document.getElementById('game-over-layer');
    const deathMessageDisplay = document.getElementById('death-message');

    // 1. Masukkan pesan kematian spesifik dari rute yang gagal
    if (pesanKematian) {
        deathMessageDisplay.innerText = pesanKematian;
    }

    // 2. Munculkan layarnya (ubah display dari 'none' menjadi 'flex')
    gameOverLayer.style.display = 'flex';

    // 3. (Opsional) Hentikan semua elemen game lainnya agar pemain tidak bisa mengklik apa pun
    document.getElementById('ui-layer').style.display = 'none';
    const radar = document.getElementById('radar-container');
    if (radar) radar.style.display = 'none';

    sfxMissionFailure.play(); // Mainkan suara kegagalan
}