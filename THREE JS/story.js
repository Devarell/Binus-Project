// File: story.js
import { triggerAI } from './ai.js';
import { gamestate } from './state.js';
import { ambientLight, directionalLight, interiorLight } from './lighting.js';
import { starMaterial, garisWarpMaterial, planetGroup, kabutNebula, sabukAsteroid, gridGroup} from './environments.js';
import { bgm, sfxAlarm, sfxQTEcorrect, sfxQTEwrong, sfxLaser, sfxWarp, sfxVehicleDestroyed, sfxGlitch, suspenseBgm } from './audio.js';
import { aktifkanRadar, matikanRadar, munculkanMusuh, hilangkanMusuh } from './radar.js';

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

// --- NASKAH RUTE ALPHA ---
export function jalankanCeritaAlpha() {
    bgm.pause(); 
    sfxAlarm.pause(); 
    sfxWarp.play(); 
    
    gamestate.isAlarmActive = false;
    gamestate.isShaking = false; 
    kabutNebula.density = 0; // Pastikan kabut dimatikan jika sebelumnya aktif
    planetGroup.visible = false; // Pastikan planet tersembunyi jika sebelumnya terlihat

    // Adegan 1: Ngebut
    triggerAI("Rute Sektor Alpha dikunci. Memaksimalkan pendorong roket. Pegangan yang erat, Pilot!", 7000);
    gamestate.kecepatanWarp = 8; 
    
    ambientLight.color.setHex(0xffffff);
    directionalLight.color.setHex(0xffffff);
    interiorLight.color.setHex(0x00ffff);
    ambientLight.intensity = 1.5;
    directionalLight.intensity = 3;
    interiorLight.intensity = 5;

    starMaterial.opacity = 0; 
    garisWarpMaterial.opacity = 0.8; 

    // Adegan 2: Flashbang (Setelah 4 detik)
    setTimeout(() => {
        triggerAI("Memasuki titik koordinat Alpha. Memulai lompatan cahaya dalam 3... 2... 1...", 7000);
        
        setTimeout(() => {
        const flashOverlay = document.getElementById('flash-overlay');
        flashOverlay.style.opacity = 1; 
        
        // Adegan 3: Santai (Jeda 1.5 detik)
        setTimeout(() => {
            gamestate.kecepatanWarp = 0.05; 
            ambientLight.intensity = 1.0;
            directionalLight.intensity = 1;
            interiorLight.intensity = 2;
            starMaterial.opacity = 0.8; 
            garisWarpMaterial.opacity = 0; 
            flashOverlay.style.opacity = 0;

            planetGroup.position.set(0, 10, 400); // Reset posisi agar jauh lagi
            planetGroup.visible = true;

            aktifkanRadar(); // Nyalakan radar setelah masuk rute Alpha


setTimeout(() => {
                triggerAI("AWAS! Radar mendeteksi misil pengejar dari faksi pemberontak! Lakukan manuver menghindar sekarang!", 9000);
                
                //suspenseBgm.play(); // Ganti BGM ke musik yang lebih tegang saat serangan dimulai

                // Tunggu AI selesai bicara (3 detik), lalu mulai QTE

            }, 3000); // Jeda santai sebelum musuh menyerang

        }, 4000); // Jeda transisi putih 

        }, 4000); 
    },7000);
    }; 

// --- NASKAH RUTE NEBULA ---
export function jalankanCeritaNebula() {
    bgm.pause(); 
    
    gamestate.isAlarmActive = false;
    gamestate.isShaking = false; 

    starMaterial.opacity = 0; 
    garisWarpMaterial.opacity = 0.8; 

    // Adegan 1: Masuk Nebula (Mode Siluman/Stealth)
    triggerAI("Memasuki gugusan Nebula. Mengaktifkan mode siluman. Mematikan lampu kabin agar tidak terdeteksi patroli musuh.", 5000);
    gamestate.kecepatanWarp = 2; // Bergerak sangat pelan dan senyap

    
    setTimeout(() => {
    const flashOverlay = document.getElementById('flash-overlay');
    flashOverlay.style.opacity = 1; 
        
    // Matikan lampu, sisakan cahaya biru/ungu yang sangat redup
    setTimeout(() => {  
    kabutNebula.density = 0.015;
    ambientLight.intensity = 0.4; 
    directionalLight.intensity = 0.2; 
    interiorLight.color.setHex(0x0088ff); // Biru tua gelap
    interiorLight.intensity = 4; 
    flashOverlay.style.opacity = 0;

    starMaterial.opacity = 0.3; // Bintang tertutup kabut tebal
    garisWarpMaterial.opacity = 0; 

    // Adegan 2: Serangan Siber (Jeda 6 detik setelah mengendap-endap)
    setTimeout(() => {
        // Lampu kabin tiba-tiba berubah kuning/oranye berkedip!
        interiorLight.color.setHex(0xffaa00);
        interiorLight.intensity = 3;
        sfxAlarm.play(); // Nyalakan suara alarm bahaya saat serangan siber dimulai
        suspenseBgm.play(); // Ganti BGM ke musik yang lebih tegang saat serangan dimulai
        
        const glitchOverlay = document.getElementById('glitch-overlay');
        glitchOverlay.classList.add('glitching-active');
        sfxGlitch.play(); // Mainkan suara glitch saat serangan siber dimulai
        triggerAI("PERINGATAN! Kita melewati menara komunikasi musuh. Sinyal siluman tak dikenal sedang mencoba menembus database kapal!", 7000);

        // Adegan 3: Mulai Minigame (Jeda 5 detik menunggu AI selesai bicara)
        setTimeout(() => {
            glitchOverlay.classList.remove('glitching-active');
            sfxAlarm.pause(); // Matikan alarm sebelum minigame dimulai
        }, 7000);

    }, 6000);
    }, 1500);
    }, 5000);
}

// --- NASKAH RUTE ASTEROID ---
export function jalankanCeritaAsteroid() {
    bgm.pause(); 
    sfxAlarm.pause(); 
    sfxWarp.play(); 
    
    gamestate.isAlarmActive = false;
    gamestate.isShaking = false; 

    if(kabutNebula) kabutNebula.density = 0; 
    if(planetGroup) planetGroup.visible = false; 

    
    // Adegan 1: Ngebut Masuk Sabuk
    triggerAI("Mengarahkan kapal ke Sabuk Asteroid. Ini adalah rute paling berbahaya. Nyalakan sabuk pengaman Anda!", 4000);
    gamestate.kecepatanWarp = 8; 
    garisWarpMaterial.opacity = 0.8;
    starMaterial.opacity = 0;
    
    setTimeout(() => {
        const flashOverlay = document.getElementById('flash-overlay');
        flashOverlay.style.opacity = 1;
        sabukAsteroid.visible = true; // Tampilkan sabuk asteroid saat memasuki rute ini
        
        // Setting Lampu agak redup dramatis
        ambientLight.color.setHex(0xaaaaaa);
        interiorLight.color.setHex(0xffaa00); // Lampu oranye waspada
        interiorLight.intensity = 3;
        
        // Adegan 2: Tiba di sabuk, Radar Mendeteksi Bahaya
        setTimeout(() => {
        flashOverlay.style.opacity = 0;
        garisWarpMaterial.opacity = 0; // Matikan garis warp saat memasuki sabuk
        starMaterial.opacity = 0.5; // Bintang samar-samar terlihat di balik asteroid
        gamestate.kecepatanWarp = 0.5; // Kecepatan normal
        setTimeout(() => {
            triggerAI("PERINGATAN! Dinding asteroid padat di depan mata! Sistem autopilot gagal menemukan rute. Anda harus memandu secara manual melalui indeks array!", 5000);
        
        sfxAlarm.play();
        gamestate.isAlarmActive = true;
        gamestate.isShaking = true;

        // Adegan 3: Mulai Minigame (Jeda menunggu AI selesai ngomong)
        setTimeout(() => {
        }, 5000);

    }, 4000); // Jeda ngebut awal
    }, 5000); // Jeda transisi putih
    }, 5000)
}

// --- NASKAH RUTE QUANTUM ---
// --- NASKAH RUTE QUANTUM ---
export function jalankanCeritaQuantum() {
    bgm.pause(); 
    sfxAlarm.pause(); 
    sfxWarp.play(); 
    
    // Reset rute lain agar bersih
    if(kabutNebula) kabutNebula.density = 0; 
    if(planetGroup) planetGroup.visible = false; 
    if(sabukAsteroid) sabukAsteroid.visible = false;

    gridGroup.visible = true; // Tampilkan efek lorong matriks untuk rute Quantum

    // Adegan 1: LOMPATAN KECEPATAN CAHAYA
    gamestate.isShaking = true; // Goncangan ekstrem karena ngebut!
    gamestate.kecepatanWarp = 30; // Bintang melesat seperti garis panjang
    
    // Lampu tematik Quantum (Magenta/Cyan pendar)
    ambientLight.color.setHex(0xffffff);
    ambientLight.intensity = 1.0;
    interiorLight.color.setHex(0xff00ff); 
    interiorLight.intensity = 4;

    suspenseBgm.play(); 

    // Narasi diubah karena tidak ada minigame lagi
    triggerAI("KECEPATAN QUANTUM MAKSIMAL! Menstabilkan reaktor untuk lompatan antar dimensi...", 5500);

    // Adegan 2: Reaktor Stabil & Siap Pindah Game (Jeda 6 detik)
    setTimeout(() => {
        gamestate.kecepatanWarp = 5; // Kecepatan kembali stabil
        gamestate.isShaking = false; // Goncangan berhenti
        interiorLight.color.setHex(0x00ffff); // Lampu biru damai
        interiorLight.intensity = 2;
        suspenseBgm.pause(); // Matikan musik tegang
        
        triggerAI("Reaktor stabil. Kita berhasil menembus dimensi ruang dan waktu, Komandan. Mempersiapkan pendaratan di Hub World...", 6000);
        
        // --- TRANISI KE GAME TEMANMU NANTI ADA DI SINI ---
        setTimeout(() => {
            // Kode ini sementara dimatikan dulu sampai link temanmu siap
            // window.location.href = 'link_game_hub_world_temanmu.html';
            console.log("Misi Selesai! Pindah ke Hub World...");
        }, 6000);

    }, 6000);
}