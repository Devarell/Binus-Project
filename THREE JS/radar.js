// File: radar.js
const radarContainer = document.getElementById('radar-container');
const enemyBlip = document.getElementById('enemy-blip');

// Fungsi untuk menyalakan Radar (dipanggil saat masuk kokpit/game dimulai)
export function aktifkanRadar() {
    radarContainer.style.display = 'block';
}

// Fungsi untuk mematikan Radar
export function matikanRadar() {
    radarContainer.style.display = 'none';
    hilangkanMusuh(); // Pastikan musuh hilang juga
}

// Fungsi memunculkan titik merah (Saat serangan dimulai)
export function munculkanMusuh() {
    enemyBlip.style.display = 'block';
}

// Fungsi menghilangkan titik merah (Saat berhasil menghindar)
export function hilangkanMusuh() {
    enemyBlip.style.display = 'none';
}