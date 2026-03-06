import { triggerAI } from './ai.js';
import { ambientLight, interiorLight, directionalLight } from './lighting.js';
import { bgm, sfxAlarm, sfxEngine, sfxExplosion, sfxRingtone, sfxWarp } from './audio.js';
import { starMaterial, garisWarpMaterial } from './environments.js';
import { gamestate } from './state.js';
import { 
    jalankanCeritaAlpha, 
    jalankanCeritaNebula, 
    jalankanCeritaAsteroid, 
    jalankanCeritaQuantum 
} from './story.js';

// Fungsi baru pengganti jalankanVerifikasi
export function mulaiIntro() {
    // 1. Mainkan audio (Ambil dari harta karun kodemu yang lama)
    bgm.play(); 
    sfxEngine.play(); 

    // 2. Ubah teks status menjadi keren
    const statusText = document.getElementById('status-text');
    if (statusText) {
        statusText.innerHTML = '> MENGAKTIFKAN PROTOKOL PENERBANGAN... OK';
        statusText.style.color = '#00ff00';
        statusText.style.textShadow = '0 0 10px #00ff00';
    }

    // 3. Sembunyikan tombol start (tombolnya akan kita buat di langkah HTML nanti)
    const btnStart = document.getElementById('btn-start-mission');
    if (btnStart) btnStart.style.display = 'none';

    // 4. Animasi Memudar & Pindah ke Cerita
    setTimeout(() => {
        const uiLayer = document.getElementById('ui-layer');
        if (uiLayer) {
            uiLayer.style.opacity = '0'; // Buat memudar
            
            setTimeout(() => {
                uiLayer.style.display = 'none'; // Hilangkan sepenuhnya
                
                // Memicu cerita utama (Pastikan nama fungsi ini sesuai dengan di story.js milikmu)
                jalankanCeritaAlpha(); // atau jalankanCerita() tergantung nama fungsi lamamu
            }, 1000);
        }
    }, 1500);
}

// --- LOGIKA UI INTERAKTIF (VERSI DATA PULLING LENGKAP) ---
const statusText = document.getElementById('status-text');
const uiLayer = document.getElementById('ui-layer');

// --- LOGIKA PEMILIHAN 4 RUTE NAVIGASI ---
const navButtons = document.querySelectorAll('.nav-btn');
const navLayer = document.getElementById('nav-layer');

navButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const pilihanRute = event.target.getAttribute('data-path');
        navLayer.style.display = 'none';
        gamestate.isShaking = false; 
        
        // Panggil buku naskah sesuai tombol yang ditekan!
        if(pilihanRute === "Alpha") {
            jalankanCeritaAlpha();
        } 
        else if(pilihanRute === "Nebula") {
            jalankanCeritaNebula();
        }
        else if(pilihanRute === "Asteroid") {
            jalankanCeritaAsteroid();
        }
        else if(pilihanRute === "Quantum") {
            jalankanCeritaQuantum();
        }
    });
});