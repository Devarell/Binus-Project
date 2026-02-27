import{ sfxMissionSuccess } from './audio.js';

export function tampilkanMissionSuccess(pesanKemenangan) {
    const successLayer = document.getElementById('mission-success-layer');
    const successMessageDisplay = document.getElementById('success-message');

    // 1. Masukkan pesan kemenangan spesifik
    if (pesanKemenangan) {
        successMessageDisplay.innerText = pesanKemenangan;
    }

    // 2. Munculkan layarnya
    successLayer.style.display = 'flex';

    // 3. Matikan UI lain agar rapi
    const uiLayer = document.getElementById('ui-layer'); // Form registrasi awal
    if (uiLayer) uiLayer.style.display = 'none';
    
    const radar = document.getElementById('radar-container');
    if (radar) radar.style.display = 'none';

    sfxMissionSuccess.play(); // Mainkan suara kemenangan
}