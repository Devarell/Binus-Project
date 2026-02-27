// File: story.js
import { triggerAI } from './ai.js';
import { gamestate } from './state.js';
import { ambientLight, directionalLight, interiorLight } from './lighting.js';
import { starMaterial, garisWarpMaterial, planetGroup, kabutNebula, sabukAsteroid, gridGroup} from './environments.js';
import { bgm, sfxAlarm, sfxQTEcorrect, sfxQTEwrong, sfxLaser, sfxWarp, sfxVehicleDestroyed, sfxGlitch, suspenseBgm } from './audio.js';
import { aktifkanRadar, matikanRadar, munculkanMusuh, hilangkanMusuh } from './radar.js';
import { mulaiQTE } from './minigame1.js';
import { mulaiLogicMinigame } from './minigame2.js';
import { mulaiArrayMinigame } from './minigame3.js';
import { mulaiBitwiseMinigame } from './minigames4.js';
import { tampilkanGameOver } from './gameover.js';
import { tampilkanMissionSuccess } from './gamewin.js';   

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
                sfxLaser.play(); // Nyalakan suara laser saat musuh muncul
                triggerAI("AWAS! Radar mendeteksi misil pengejar dari faksi pemberontak! Lakukan manuver menghindar sekarang!", 9000);
                
                //suspenseBgm.play(); // Ganti BGM ke musik yang lebih tegang saat serangan dimulai
                sfxAlarm.play(); // Nyalakan sirine!
                gamestate.isAlarmActive = true;
                gamestate.isShaking = true; // Layar bergetar!

                munculkanMusuh(); // Tampilkan titik merah di radar sebagai indikasi musuh mendekat

                // Tunggu AI selesai bicara (3 detik), lalu mulai QTE
                setTimeout(() => {
                    
                    // PANGGIL MESIN QTE
                    mulaiQTE(
                        // --- JIKA PEMAIN BERHASIL (SUCCESS) ---
                        () => {
                            //suspenseBgm.pause(); // Matikan musik tegang
                            sfxLaser.pause(); // Matikan suara laser
                            sfxAlarm.pause();
                            sfxQTEcorrect.play();
                            gamestate.isAlarmActive = false;
                            gamestate.isShaking = false;

                            hilangkanMusuh(); // Hilangkan titik merah di radar karena musuh sudah berhasil dihindari
                            
                            // (Opsional) Tambahkan sfx melesat (sfxWarp.play()) di sini
                            triggerAI("Manuver luar biasa! Misil musuh meledak di belakang kita. Kita aman, Komandan.", 11000);
                            setTimeout(() => {
                                tampilkanMissionSuccess("STATUS: CLEAR. Refleks terminal Anda berhasil menyelamatkan kapal dari kehancuran total.");
                            }, 5000);
                        },
                        
                        // --- JIKA PEMAIN GAGAL / TELAT (FAIL) ---
                        () => {
                            sfxLaser.pause(); // Matikan suara laser
                            sfxQTEwrong.play(); // Mainkan suara salah saat QTE gagal
                            gamestate.isShaking = true; // Getaran makin brutal
                            
                            // Lampu kabin padam jadi merah gelap
                            ambientLight.color.setHex(0xff0000); 
                            interiorLight.color.setHex(0xff0000);
                            
                            // (Opsional) Tambahkan suara ledakan besar di sini
                            triggerAI("PERINGATAN KRITIS! Lambung kapal terkena benturan! Sistem perisai bocor! Evakuasi segera!", 9000);
                            setTimeout(() => {
                                tampilkanGameOver("Sistem tertembus misil musuh akibat kegagalan eksekusi skrip terminal.");
                            }, 4000);
                            //sfxVehicleDestroyed.play(); // Mainkan suara kapal meledak saat QTE gagal
                        }
                    );

                }, 8000); // Jeda sebelum huruf QTE muncul

            }, 3000); // Jeda santai sebelum musuh menyerang

        }, 4000); // Jeda transisi putih 

        }, 4000); 
    },7000);
    }; 

// --- NASKAH RUTE NEBULA ---
export function jalankanCeritaNebula() {
    bgm.pause(); 
    sfxAlarm.pause(); 
    sfxWarp.play();
    
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
            mulaiLogicMinigame(
                // --- JIKA PEMAIN MENANG (Bertahan 3 Ronde) ---
                () => {
                    suspenseBgm.pause(); // Matikan musik tegang setelah menang
                    interiorLight.color.setHex(0x00ffff); // Lampu kembali biru cerah/aman
                    interiorLight.intensity = 2;
                    directionalLight.intensity = 1;
                    ambientLight.intensity = 1;
                    gamestate.kecepatanWarp = 6; // Ngebut keluar dari kabut
                    
                    triggerAI("Evaluasi logika berhasil! Logic Gateway telah memblokir semua paket data anomali. Identitas siluman kita tetap aman. Melompat keluar dari Nebula.", 7000);
                    setTimeout(() => {
                        tampilkanMissionSuccess("STATUS: CLEAR. Anda berhasil menjaga kerahasiaan kapal dari deteksi patroli musuh.");
                    }, 5000);
                },

                // --- JIKA PEMAIN GAGAL (Salah Analisis SQL) ---
                () => {
                    glitchOverlay.classList.add('glitching-active');
                    sfxGlitch.play(); // Mainkan suara glitch saat gagal bertahan   
                    setTimeout(() => glitchOverlay.classList.remove('glitching-active'), 2000);
                    interiorLight.color.setHex(0xff0000); // Merah Darurat!
                    directionalLight.color.setHex(0xff0000);
                    directionalLight.intensity = 2;
                    sfxAlarm.play();
                    gamestate.isAlarmActive = true;
                    gamestate.isShaking = true;
                    
                    triggerAI("FATAL ERROR! Kesalahan evaluasi kondisi! Malware musuh berhasil mem-bypass Firewall dan mengambil alih sistem propulsi!", 6000);

                    // --- PANGGIL LAYAR GAME OVER (Setelah AI selesai bicara) ---
                    setTimeout(() => {
                        tampilkanGameOver("KONEKSI TERPUTUS: Kapal diambil alih oleh peretas tak dikenal akibat kegagalan evaluasi Logic Gateway. Anda lenyap di dalam kegelapan Nebula.");
                    }, 6000);
                }
            );

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
    // ambientLight.color.setHex(0xffffff);
    // directionalLight.color.setHex(0xffffff);
    // interiorLight.color.setHex(0x00ffff);
    // ambientLight.intensity = 1.5;
    // directionalLight.intensity = 3;
    // interiorLight.intensity = 5;

    // starMaterial.opacity = 0; 
    // garisWarpMaterial.opacity = 0.8; 

    // Reset kabut & planet agar bersih
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
            
            mulaiArrayMinigame(
                // --- JIKA SUKSES MENEBAK 3 INDEKS ---
                () => {
                    sfxAlarm.pause();
                    gamestate.isAlarmActive = false;
                    gamestate.isShaking = false;
                    
                    interiorLight.color.setHex(0x00ffff); // Lampu aman
                    gamestate.kecepatanWarp = 4; // Lolos dan ngebut
                    
                    triggerAI("Manuver luar biasa, Komandan! Pemahaman Anda tentang 'Zero-Based Indexing' telah menyelamatkan lambung kapal kita.", 5000);
                    setTimeout(() => {
                        tampilkanMissionSuccess("STATUS: CLEAR. Navigasi array berjalan sempurna. Lambung kapal utuh tanpa goresan.");
                    }, 5000);
                },

                // --- JIKA GAGAL / SALAH INDEKS ---
                () => {
                    interiorLight.color.setHex(0xff0000); // Merah Darurat!
                    gamestate.isShaking = true; // Layar makin bergetar
                    
                    triggerAI("BENTURAN TERJADI! Lambung kapal terkoyak asteroid! Misi Gagal!", 6000);
                    setTimeout(() => {
                        tampilkanGameOver("FATAL ERROR: Index Out of Bounds. Kapal menabrak asteroid raksasa karena kegagalan komputasi array.");
                    }, 4000);
                }
            );

        }, 5000);

    }, 4000); // Jeda ngebut awal
    }, 5000); // Jeda transisi putih
    }, 5000)
}

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

    suspenseBgm.play(); // Ganti BGM ke musik yang lebih tegang saat memasuki rute Quantum

    triggerAI("KECEPATAN QUANTUM MAKSIMAL! Peringatan: Sinkronisasi memori inti gagal. Operasi logika biner manual diperlukan untuk menstabilkan reaktor!", 5500);

    // Adegan 2: Sistem Overload (Jeda menunggu AI selesai bicara)
    setTimeout(() => {
        
        // Panggil Minigame Bitwise
        mulaiBitwiseMinigame(
            // --- JIKA SUKSES (5x Benar) ---
            () => {
                gamestate.kecepatanWarp = 5; // Kecepatan kembali stabil
                gamestate.isShaking = false; // Goncangan berhenti
                interiorLight.color.setHex(0x00ffff); // Lampu biru damai
                interiorLight.intensity = 2;
                suspenseBgm.pause(); // Matikan musik tegang setelah menang
                
                triggerAI("Sinkronisasi bitwise berhasil. Reaktor stabil. Kita berhasil menembus dimensi ruang dan waktu, Komandan.", 5000);
                setTimeout(() => {
                        tampilkanMissionSuccess("STATUS: CLEAR. Sinkronisasi biner stabil. Anda resmi menembus batas kecepatan cahaya.");
                    }, 5000);
            },

            // --- JIKA GAGAL (Salah ketik / Telat) ---
            () => {
                interiorLight.color.setHex(0xff0000); // Merah Kritis!
                gamestate.kecepatanWarp = 50; // Hilang kendali
                sfxAlarm.play();
                gamestate.isAlarmActive = true;
                
                triggerAI("KERNEL PANIC! Logika biner gagal. Reaktor Quantum meledak!", 6000);
                setTimeout(() => {
                    tampilkanGameOver("KERNEL PANIC: Sinkronisasi bitwise gagal. Reaktor Quantum meledak berkeping-keping.");
                }, 4000);
            }
        );

    }, 6000);
}