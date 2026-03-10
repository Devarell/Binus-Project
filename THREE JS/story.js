// File: story.js
import { triggerAI } from './ai.js';
import { gamestate } from './state.js';
import { ambientLight, directionalLight, interiorLight } from './lighting.js';
import { starMaterial, garisWarpMaterial, planetGroup, kabutNebula, sabukAsteroid, gridGroup, bintangRaksasa, asteroidRaksasa} from './environments.js';
import { bgm, sfxAlarm, sfxQTEcorrect, sfxQTEwrong, sfxLaser, sfxWarp, sfxVehicleDestroyed, sfxGlitch, suspenseBgm } from './audio.js';
//import { aktifkanRadar, matikanRadar, munculkanMusuh, hilangkanMusuh } from './radar.js';

// --- NASKAH PROLOG (INTRO AWAL) ---
export function jalankanIntroSinematik() {
    // 1. Set kondisi penerbangan awal yang santai
    gamestate.kecepatanWarp = 0.5;
    gamestate.isShaking = false;
    ambientLight.color.setHex(0xffffff);
    directionalLight.color.setHex(0xffffff);
    interiorLight.color.setHex(0x00ffff);
    ambientLight.intensity = 1.5;
    directionalLight.intensity = 3;
    interiorLight.intensity = 3;

    starMaterial.opacity = 0.8; 

    
    // 2. Dialog A.I. SYS (Bagian 1)
    triggerAI("Selamat datang kembali, Komandan. Sistem navigasi utama mengalami anomali. Kita tidak bisa menggunakan rute otomatis menuju Hub World.", 8000);
    
    // 3. Dialog A.I. SYS (Bagian 2 - Muncul setelah dialog 1 selesai)
    setTimeout(() => {
        triggerAI("Memindai rute manual... Ditemukan 4 jalur potensial. Silakan pilih rute pendekatan Anda melalui panel sistem di layar.", 8000);
        
        // 4. Munculkan UI Pilihan Rute (Setelah dialog 2 selesai)
        setTimeout(() => {
            const navLayer = document.getElementById('nav-layer');
            if (navLayer) {
                // Tampilkan kembali layar pilihan 4 rute (Alpha, Nebula, Asteroid, Quantum)
                navLayer.style.display = 'flex'; 
            }
        }, 8000);
        
    }, 8000); // Jeda antar dialog
}

// --- FUNGSI PAMUNGKAS: TABRAKAN ASTEROID (ENDING) ---
function adeganTabrakanAsteroid() {
    // Apapun rutenya, akhirnya akan memanggil fungsi ini
    setTimeout(() => {
        sfxAlarm.play();
        gamestate.isAlarmActive = true;
        interiorLight.color.setHex(0xff0000); // Lampu merah bahaya
        interiorLight.intensity = 4;
        gamestate.isShaking = true; // Kokpit bergetar hebat
        setTimeout(() => {
            asteroidRaksasa.visible = true;
            asteroidRaksasa.position.set(150, 120, 800); 
        }, 6000);

        triggerAI("PERINGATAN KRITIS! Objek masif terdeteksi mendekat dengan kecepatan tinggi! Benturan tak terhindarkan dalam 3... 2... 1...", 6000);

        setTimeout(() => {
            // Layar berubah menjadi putih terang karena tabrakan
            const flashOverlay = document.getElementById('flash-overlay');
            if(flashOverlay) {
                flashOverlay.style.background = 'ff0000';
                flashOverlay.style.transition = 'opacity 1s ease-in';
                flashOverlay.style.opacity = 1;
            }
            
            gamestate.kecepatanWarp = 0; // Roket hancur/berhenti
            
            // --- TRANSISI KE GAME TEMANMU (AMNESIA) ---
            setTimeout(() => {
                console.log("BOOM! Pindah ke Hub World Teman...");
                // window.location.href = 'link_game_hub_world_temanmu.html';
            }, 3000); // Jeda layar putih sebelum pindah

        }, 6000); // Menunggu AI selesai menghitung mundur
    }, 4000); // Jeda sebelum alarm asteroid berbunyi
}


// --- 1. NASKAH MESIN BERMASALAH (Bintang Merah Raksasa / Red Giant) ---
export function jalankanCeritaMesin() {
    gamestate.kecepatanWarp = 0.5; 
    interiorLight.color.setHex(0xffaa00); 
    
    // Munculkan Bintang Merah di kanan atas
    bintangRaksasa.visible = true;
    bintangRaksasa.material.color.setHex(0xff3300); // Merah membara
    bintangRaksasa.scale.set(1, 1, 1);
    bintangRaksasa.position.set(300, 100, -1000); 

    triggerAI("Mengalihkan daya ke perbaikan mesin utama. Kecepatan diturunkan. Tunggu sebentar, Komandan, radar mendeteksi sesuatu yang mendekat...", 5000);
    adeganTabrakanAsteroid(); 
}

// --- 2. NASKAH NAVIGASI TERGANGGU (Pulsar Biru Misterius) ---
export function jalankanCeritaNavigasi() {
    gamestate.kecepatanWarp = 2; 
    interiorLight.color.setHex(0x00ffff); 
    
    // Munculkan Bintang Biru kecil di kiri bawah
    bintangRaksasa.visible = true;
    bintangRaksasa.material.color.setHex(0x00ffcc); // Cyan / Neon
    bintangRaksasa.scale.set(0.4, 0.4, 0.4);
    bintangRaksasa.position.set(-200, -80, -800);

    triggerAI("Sistem navigasi manual diaktifkan. Kompas kosmik berputar tak terkendali. Kita terbang buta melintasi area yang belum dipetakan.", 5000);
    adeganTabrakanAsteroid(); 
}

// --- 3. NASKAH BENSIN HABIS (Bintang Katai Putih / White Dwarf redup) ---
export function jalankanCeritaBensin() {
    gamestate.kecepatanWarp = 0.1; 
    interiorLight.color.setHex(0x555555); 
    
    // Munculkan Bintang Redup tepat di tengah
    bintangRaksasa.visible = true;
    bintangRaksasa.material.color.setHex(0x444444); // Abu-abu redup (mati suri)
    bintangRaksasa.scale.set(0.6, 0.6, 0.6);
    bintangRaksasa.position.set(0, 0, -600);

    triggerAI("Bahan bakar utama habis. Mengaktifkan reaktor cadangan darurat. Kita terapung bebas di sektor ini. Mengaktifkan pemindai bahaya...", 5000);
    adeganTabrakanAsteroid(); 
}

// --- 4. NASKAH HINDARI BLACKHOLE (Lubang Hitam Raksasa) ---
export function jalankanCeritaBlackhole() {
    gamestate.kecepatanWarp = 15; 
    gamestate.isShaking = true; 
    interiorLight.color.setHex(0x8800ff); 
    
    // Munculkan Blackhole! (Warna Hitam Legam)
    bintangRaksasa.visible = true;
    bintangRaksasa.material.color.setHex(0x000000); // Hitam menyerap cahaya
    bintangRaksasa.scale.set(2.5, 2.5, 2.5); // Sangat raksasa!
    bintangRaksasa.position.set(0, 50, -1200);

    triggerAI("Tarikan gravitasi lubang hitam terdeteksi! Memaksa pendorong ke ambang maksimal. Kita berhasil lolos, tapi lintasan kita bergeser ke...", 5000);
    adeganTabrakanAsteroid(); 
}