import * as THREE from 'three';
// 1. Import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { triggerAI } from './ai.js';
import { ambientLight, directionalLight, interiorLight } from './lighting.js';
import { 
    starGeometry, starMaterial, jumlahBintangKartun, starGroup, 
    garisWarpMaterial, garisWarpGeometry, jumlahGaris, garisWarp, 
    planetAlpha, cincinAlpha, planetGroup, kabutNebula, sabukAsteroid,
    gridGroup, gridLantai, gridLangit, bintangRaksasa, asteroidRaksasa
} from './environments.js';
import { gamestate } from './state.js';
import './ui.js'; // Pastikan UI diimpor setelah lighting dan environments karena UI memodifikasi state yang digunakan di animasi
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 16, 0);
scene.add(starGroup);
scene.add(garisWarp);
scene.add(interiorLight);
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(planetGroup);
scene.fog = kabutNebula; // Tambahkan efek kabut untuk suasana yang lebih dramatis
scene.add(sabukAsteroid); // Tambahkan sabuk asteroid ke dalam scene
scene.add(gridGroup); // Tambahkan grup grid untuk efek lorong matriks
scene.background = new THREE.Color(0x0a0a2a);
scene.add(bintangRaksasa); // Tambahkan bintang raksasa ke dalam scene
scene.add(asteroidRaksasa); // Tambahkan asteroid raksasa ke dalam scene

// const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer({ antialias: true });
// --- EFEK GARIS KARTUN ---
const effect = new OutlineEffect(renderer, {
    defaultThickness: 0.008, // Ketebalan garis hitam (Bisa kamu besarkan/kecilkan nanti)
    defaultColor: [0, 0, 0], // Warna garis (Hitam)
    defaultAlpha: 1.0,
    defaultKeepAlive: true   // Menjaga performa roket tetap stabil
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
    
// 2. Tambahkan OrbitControls untuk memungkinkan pengguna berinteraksi dengan kamera
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Aktifkan damping agar gerakan kamera lebih halus
controls.target.set(0, 16, 1);

controls.minPolarAngle = Math.PI / 2.2;  // Batas maksimal nunduk (sedikit saja)
controls.maxPolarAngle = Math.PI / 1.8;  // Batas maksimal mendongak (sedikit saja)

// Pusatnya sekarang digeser ke 180 derajat (Math.PI)
controls.minAzimuthAngle = Math.PI - (Math.PI / 4); // Batas tengok kiri
controls.maxAzimuthAngle = Math.PI + (Math.PI / 4); // Batas tengok kanan

controls.enableZoom = false;
controls.enablePan = false;
controls.update();

// 3. Panggil GLTFLoader untuk memuat model Sketchfab
const loader = new GLTFLoader();

loader.load(
    'models/scene.gltf', // PENTING: Pastikan nama folder benar-benar diawali huruf kapital 'M'
    function (gltf) {
        const cockpit = gltf.scene;

        // --- MULAI OPERASI BEDAH MATERIAL KARTUN (VERSI X-RAY) ---
        // --- MULAI OPERASI BEDAH MATERIAL KARTUN (FINAL) ---
        cockpit.traverse((child) => {
            if (child.isMesh) {
                const oldMat = child.material;
                const namaPart = child.name.toLowerCase(); 

                // 1. Ganti semua bagian menjadi material kartun solid
                child.material = new THREE.MeshLambertMaterial({
                    color: 0x888888, 
                    flatShading: true    
                });

                // 2. TARGET PRESISI: HANCURKAN KACANYA SAJA!
                // Karena kita pakai kata 'glass', kerangka besi ('canopyframe') akan aman!
                if (namaPart.includes('glass')) {
                    child.visible = false; 
                }

                // 3. KENDALI KOKPIT (Hitam Elegan)
                // Kita tangkap tuas, tombol, dan alas joystick-nya
                if (namaPart.includes('handle') || namaPart.includes('ball') || namaPart.includes('trigger') || namaPart.includes('button') || namaPart.includes('base')) {
                    // Gunakan Abu-abu sangat gelap (0x222222) BUKAN hitam pekat (0x000000)
                    // Agar garis tepi (outline hitam) dari OutlineEffect tetap terlihat!
                    child.material.color.setHex(0x222222); 
                }

                // 4. LAYAR & LAMPU PANEL (Neon Green / Hijau Matrix)
                // Kita tambahkan kata 'emmissive' sesuai data X-Ray sebelumnya
                if (namaPart.includes('screen') || namaPart.includes('monitor') || namaPart.includes('display') || namaPart.includes('emmissive')) {
                    child.material = new THREE.MeshBasicMaterial({ 
                        color: 0x39ff14 // Kode warna khusus untuk Neon Green yang menyala
                    });
                }
                
                // (OPSIONAL) 5. KURSI PILOT
                // Jika Komandan ingin kursinya juga gelap agar kontras
                if (namaPart.includes('seat') || namaPart.includes('back') || namaPart.includes('headrest') || namaPart.includes('armrest')) {
                    child.material.color.setHex(0x444444); // Abu-abu tua
                }
            }
        });
        // --- SELESAI OPERASI BEDAH ---

        // Masukkan model yang sudah "dicuci otak" ke panggung
        scene.add(cockpit);
        

        // KITA KECILKAN SKALANYA SECARA EKSTREM
        cockpit.scale.set(10, 10, 10); 

        // Posisikan tepat di tengah panggung
        cockpit.position.set(0, 0, 0);
    },
    // Parameter ke-3: onProgress (Jangan dilewatkan!)
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Parameter ke-4: onError (Sekarang error akan benar-benar muncul)
    function (error) {
        console.error('Terjadi kesalahan saat memuat model:', error);
    }
);
directionalLight.position.set(5, 5, 5);
interiorLight.position.set(0, 13, 0); // Letakkan di tengah kokpit
let totalJarak = 0;

// Animasi Render
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update kontrol kamera

    if (gamestate.isShaking) {
        const kekuatanGuncangan = 0.1;
        camera.position.x += (Math.random() - 0.5) * kekuatanGuncangan;
        camera.position.y += (Math.random() - 0.5) * kekuatanGuncangan;
    }

    starGroup.children.forEach(star => {
        // Bintang melesat mendekat ke kamera
        star.position.z -= gamestate.kecepatanWarp;

        // SISTEM DAUR ULANG BINTANG (RESET KE DEPAN)
        // Jika bintang sudah melewati punggung pilot (Z > 200)
        if (star.position.z < -200) {
            // Lempar kembali jauh ke depan (Z negatif besar) agar muncul terus tiada habis
            star.position.z = 1500; 
            
            // Acak ulang X dan Y agar tidak sebaris
            star.position.x = (Math.random() - 0.5) * 2000;
            star.position.y = (Math.random() - 0.5) * 2000;
        }
    });

    if (gamestate.isAlarmActive) {
        // Date.now() * 0.005 menentukan seberapa cepat lampu berkedip
        // Math.abs(Math.sin(...)) membuat gelombang angka yang naik turun dari 0 ke 1
        const kedip = Math.abs(Math.sin(Date.now() * 0.005));
        
        // Intensitas lampu interior akan naik turun antara 5 sampai 25
        interiorLight.intensity = 5 + (kedip * 20); 
        
        // Cahaya ruangan (ambient) ikut berkedip sedikit biar dramatis
        ambientLight.intensity = 1 + (kedip * 2); 
    }

    if (garisWarpMaterial.opacity > 0) {
        const posisiGaris = garisWarpGeometry.attributes.position.array;
        
        for(let i = 0; i < jumlahGaris; i++) {
            // 1 garis terdiri dari 2 titik (X, Y, Z). Jadi butuh 6 index per garis.
            // Index Z Pangkal = (i * 6 + 2) | Index Z Ujung = (i * 6 + 5)
            
            posisiGaris[i * 6 + 2] -= gamestate.kecepatanWarp; 
            posisiGaris[i * 6 + 5] -= gamestate.kecepatanWarp; 
            
            // Zona larangan terbang (Reset jika sampai kaca depan)
            if (posisiGaris[i * 6 + 2] < -5) {
                const newZ = 200; // Lempar jauh ke depan
                const panjangGaris = Math.random() * 20 + 10;
                
                posisiGaris[i * 6 + 2] = newZ; 
                posisiGaris[i * 6 + 5] = newZ + panjangGaris; 
            }
        }
        garisWarpGeometry.attributes.position.needsUpdate = true;
    }
    
    // Taruh di dalam function animate()
    if (bintangRaksasa.visible) {
        bintangRaksasa.rotation.y += 0.002;
        bintangRaksasa.rotation.x += 0.001;
    }
    // Taruh di dalam function animate()
    if (asteroidRaksasa.visible) {
     // Bergerak cepat bagaikan peluru dari Serong Kanan Atas ke Kokpit (0,0,0)
    asteroidRaksasa.position.x -= 1.5;  // Bergeser ke kiri
    asteroidRaksasa.position.y -= 1.2;  // Bergeser ke bawah
    asteroidRaksasa.position.z -= 8.0;  // Mendekat ke kaca depan dengan sangat cepat!

     // Efek putaran batu yang mengerikan
    asteroidRaksasa.rotation.x -= 0.02;
    asteroidRaksasa.rotation.y += 0.03;
}

    totalJarak += (gamestate.kecepatanWarp * 0.1);
    document.getElementById('jarak-tempuh').innerText = Math.floor(totalJarak).toString().padStart(5, '0');

    // 1. Simpan posisi asli kamera SAAT INI
    const posisiAsliX = camera.position.x;
    const posisiAsliY = camera.position.y;

    // 2. Terapkan goncangan sementara
    if (gamestate.isShaking) {
        // Angkanya saya turunkan jadi 0.2 agar lebih realistis di dalam kokpit sempit
        const kekuatanGoncangan = 0.2; 
        camera.position.x += (Math.random() - 0.5) * kekuatanGoncangan;
        camera.position.y += (Math.random() - 0.5) * kekuatanGoncangan;
    }

    // camera.fov = 75 + (gamestate.kecepatanWarp * 0.8);
    // camera.updateProjectionMatrix(); // Efek FOV dinamis saat warp

    effect.render(scene, camera);

    if (gamestate.isShaking) {
        camera.position.x = posisiAsliX;
        camera.position.y = posisiAsliY;
    }
}
animate();

// Sapaan awal dari AI (muncul terus sampai login)
// Tambahkan "false" di belakang agar browser tidak marah
triggerAI("Halo, Calon Kadet.", 0, false);