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

// --- LOGIKA UI INTERAKTIF (VERSI DATA PULLING LENGKAP) ---
const callsignInput = document.getElementById('callsign-input');
const phoneInput = document.getElementById('phone-input');
const schoolInput = document.getElementById('school-input'); // Tambahan Baru
const majorInput = document.getElementById('major-input');   // Tambahan Baru
const statusText = document.getElementById('status-text');
const uiLayer = document.getElementById('ui-layer');

// Siapkan "Wadah" untuk menyimpan data pengunjung
let userPhoneData = "";
let userSchoolData = "";
let userMajorData = "";

// Fungsi untuk mengecek saat tombol keyboard ditekan
function jalankanVerifikasi(event) {
    if (event.key === 'Enter') {
        const callsign = callsignInput.value.toUpperCase();
        const phone = phoneInput.value;
        const school = schoolInput.value.toUpperCase(); // Ambil Asal Sekolah
        const major = majorInput.value.toUpperCase();   // Ambil Jurusan
        
        // Pastikan KEEMPAT kotak sudah diisi
        if(callsign.trim() !== "" && phone.trim() !== "" && school.trim() !== "" && major.trim() !== "") {
            
            bgm.play(); // Mulai BGM saat login berhasil
            sfxEngine.play(); // Mainkan suara mesin menyala

            // Simpan datanya ke variabel global
            userPhoneData = phone;
            userSchoolData = school;
            userMajorData = major;
            
            // 1. Sukses Login: Tampilkan efek loading sci-fi menggunakan data mereka!
            statusText.innerHTML = `> ACCESS GRANTED. COMMANDER ${callsign}.<br>> SYNCING ACADEMY DATA: [ ${school} ]... OK<br>> LOADING [ ${major} ] DIVISION PROTOCOLS... OK`;
            statusText.style.color = '#00ff00';
            statusText.style.textShadow = '0 0 10px #00ff00'; 
            
            // Sembunyikan semua kotak ketik
            callsignInput.style.display = 'none'; 
            phoneInput.style.display = 'none';
            schoolInput.style.display = 'none';
            majorInput.style.display = 'none';
            document.querySelector('.terminal-box p:last-child').style.display = 'none'; // Sembunyikan instruksi
            
            // 2. Animasi Memudar & Mesin Menyala
            setTimeout(() => {
                uiLayer.classList.add('fade-out'); 
                
                setTimeout(() => {
                    uiLayer.style.display = 'none';
                    
                    ambientLight.intensity = 1.5; 
                    directionalLight.intensity = 3; 
                    interiorLight.intensity = 5; 
                    gamestate.kecepatanWarp = 4; 
                    starMaterial.opacity = 1;

                    // AI Berbicara saat mesin menyala!
                        triggerAI(`Kalibrasi selesai, Commander ${callsign}. Sistem navigasi mendeteksi kita melaju dengan Warp Speed. Menerima transmisi dari markas dalam 3 detik...`, 4000);
                    
                    // 3. MUNCULKAN TELEPON
                    setTimeout(() => {
                        const commsLayer = document.getElementById('comms-layer');
                        commsLayer.style.display = 'block';
                        document.querySelector('.comms-box h3').innerText = `ROUTING TO DEVICE: ${userPhoneData}`;

                        sfxRingtone.play(); // Mainkan ringtone saat telepon muncul
                    }, 3000); 
                    
                }, 1500); 
            }, 2500); // Jeda diperlama sedikit agar pengunjung bisa membaca tulisan loading sci-fi nya
        } else {
            statusText.innerText = "> ERROR: HARAP LENGKAPI MANIFES PENERBANGAN!";
            statusText.style.color = '#ff3333';
        }
    }
}

// Pasang pendeteksi tombol 'Enter' di KEEMPAT kotak input
callsignInput.addEventListener('keydown', jalankanVerifikasi);
phoneInput.addEventListener('keydown', jalankanVerifikasi);
schoolInput.addEventListener('keydown', jalankanVerifikasi);
majorInput.addEventListener('keydown', jalankanVerifikasi);

// --- LOGIKA TOMBOL TELEPON ---
const acceptBtn = document.getElementById('accept-btn');
const declineBtn = document.getElementById('decline-btn');

acceptBtn.addEventListener('click', () => {
    sfxRingtone.pause(); // Hentikan ringtone saat panggilan diangkat
    sfxRingtone.currentTime = 0; // Reset posisi ringtone agar bisa diputar lagi nanti jika perlu

    const commsLayer = document.getElementById('comms-layer');
    
    // Tarik dan tampilkan data Asal Sekolah dan Jurusan saat panggilan diangkat!
    commsLayer.innerHTML = `
        <div class="comms-box" style="border-color: #00ff00; box-shadow: 0 0 15px #00ff00; width: 350px;">
            <p style="color: #00ff00;">[ ENCRYPTED CONNECTION ESTABLISHED ]</p>
            <h3 style="font-size: 14px; text-align: left;">
                "Laporan diterima, Pilot. Radar kami melacak kapalmu berasal dari Sektor <strong>${userSchoolData}</strong>.<br><br>
                Sistem senjata dan modul divisi <strong>${userMajorData}</strong> telah diaktifkan.<br><br>
                Kami akan mengirimkan data rute navigasi ke planet Beken!"
            </h3>
        </div>
    `;
    
    setTimeout(() => { 
        commsLayer.style.display = 'none'; 
        
        // 1. AI Berbicara
        triggerAI("Peringatan: Transmisi terputus akibat badai matahari. Autopilot gagal berfungsi. Pilot, silakan ambil alih kemudi dan pilih rute manual di layar dasbor.", 0);
        gamestate.isShaking = true; // Aktifkan guncangan kamera saat badai matahari
        sfxExplosion.play(); // Mainkan suara ledakan saat transmisi terputus
        sfxAlarm.play(); // Mainkan suara alarm bahaya saat badai matahari
        bgm.pause(); // Hentikan BGM biasa saat badai matahari
        // 2. Munculkan UI 4 Pilihan Navigasi setelah AI selesai bicara (sekitar 3 detik kemudian)
        setTimeout(() => {
            document.getElementById('nav-layer').style.display = 'block';
        }, 3000);

    }, 6000); 
});

declineBtn.addEventListener('click', () => {
    document.getElementById('comms-layer').style.display = 'none'; 
});

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