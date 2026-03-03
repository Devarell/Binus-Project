import * as THREE from 'three';
// --- EFEK BINTANG ANGKASA (STARFIELD) ---
// 1. Siapkan material (bentuk dan warna bintang)
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Warna putih
    size: 0.3,       // Ukuran bintang
    transparent: true,
    opacity: 0.8     // Sedikit transparan agar lebih realistis
});

// 2. Buat ribuan koordinat acak
const starVertices = [];
const jumlahBintang = 3000; // Kita buat 3000 bintang

for(let i = 0; i < jumlahBintang; i++) {
    // Sebar bintang di koordinat acak antara -100 sampai 100
    const x = (Math.random() - 0.5) * 200; 
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    
    starVertices.push(x, y, z);
}

// 3. Masukkan koordinat ke dalam geometri
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

// 4. Jadikan objek bintang dan masukkan ke panggung
const stars = new THREE.Points(starGeometry, starMaterial);


// --- EFEK GARIS WARP SPEED (MODE QUANTUM) ---
const garisWarpGeometry = new THREE.BufferGeometry();
const garisWarpMaterial = new THREE.LineBasicMaterial({ 
    color: 0xff00ff, // Warna magenta/ungu khas portal dimensi
    transparent: true, 
    opacity: 0 // KITA SEMBUNYIKAN DULU SAAT AWAL
});

const garisWarpVertices = [];
const jumlahGaris = 1000; // Buat 1000 garis cahaya

for(let i = 0; i < jumlahGaris; i++) {
    const x = (Math.random() - 0.5) * 200; 
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    const panjangGaris = Math.random() * 20 + 10; // Panjang garis bervariasi
    
    // 1 Garis butuh 2 titik: Titik Pangkal dan Titik Ujung
    garisWarpVertices.push(x, y, z);                 // Titik Pangkal
    garisWarpVertices.push(x, y, z + panjangGaris);  // Titik Ujung (memanjang ke belakang)
}

garisWarpGeometry.setAttribute('position', new THREE.Float32BufferAttribute(garisWarpVertices, 3));
const garisWarp = new THREE.LineSegments(garisWarpGeometry, garisWarpMaterial);

// ==========================================
// --- EFEK PLANET ALPHA (SEKTOR DAMAI) ---
// ==========================================

// 1. Buat Inti Planet (Bentuk Bola)
const planetGeometry = new THREE.SphereGeometry(40, 32, 32);
const planetMaterial = new THREE.MeshStandardMaterial({
    color: 0x00aaff, // Biru cerah cyan
    emissive: 0x004488, // Memancarkan sedikit cahaya sendiri
    wireframe: true, // Bergaya hologram garis-garis!
    transparent: true,
    opacity: 0.8
});
const planetAlpha = new THREE.Mesh(planetGeometry, planetMaterial);

// 2. Buat Cincin Planet
const cincinGeometry = new THREE.RingGeometry(55, 80, 64);
const cincinMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide, // Terlihat dari atas dan bawah
    wireframe: true,
    transparent: true,
    opacity: 0.5
});
const cincinAlpha = new THREE.Mesh(cincinGeometry, cincinMaterial);
cincinAlpha.rotation.x = Math.PI / 2; // Rebahkan cincinnya agar mendatar

// 3. Gabungkan Inti dan Cincin ke dalam satu Grup
const planetGroup = new THREE.Group();
planetGroup.add(planetAlpha);
planetGroup.add(cincinAlpha);

// 4. Posisikan jauh di depan kaca pesawat
planetGroup.position.set(0, 10, -400); // Z negatif = di depan kamera
planetGroup.visible = false; // SEMBUNYIKAN SECARA DEFAULT

const kabutNebula = new THREE.FogExp2(0x1a053a, 0);

// ==========================================
// --- EFEK SABUK ASTEROID (LOW-POLY) ---
// ==========================================
const sabukAsteroid = new THREE.Group();
const jumlahBatu = 100; // Jumlah batu yang meramaikan layar

// Gunakan bentuk Dodecahedron (12 sisi) dengan detail 0 agar terlihat kotak-kotak/kasar
const batuGeometry = new THREE.DodecahedronGeometry(1, 0); 
const batuMaterial = new THREE.MeshStandardMaterial({
    color: 0x93928c, // Warna abu-abu batu gelap
    roughness: 0.9,  // Sangat kasar, tidak memantulkan cahaya dengan mulus
    metalness: 0.1,  
    flatShading: true // PENTING: Ini yang membuat efek lekukan patah-patah (Low-Poly)!
});

for (let i = 0; i < jumlahBatu; i++) {
    const batu = new THREE.Mesh(batuGeometry, batuMaterial);

    // 1. Acak Ukuran (Skala 1 sampai 6)
    const skala = Math.random() * 5 + 1; 
    batu.scale.set(skala, skala, skala);

    const radiusAman = 80; // Jarak minimal dari tengah layar (Besarkan angkanya jika masih menabrak lambung/kaca)
    const radiusMaksimal = 350; // Jarak maksimal sebaran batu
    
    // Acak jarak dan sudut (membuat bentuk donat)
    const radius = radiusAman + Math.random() * (radiusMaksimal - radiusAman);
    const sudut = Math.random() * Math.PI * 2; // 0 sampai 360 derajat

    batu.position.x = Math.cos(sudut) * radius;
    batu.position.y = Math.sin(sudut) * radius;
    batu.position.z = (Math.random() * -400);// Sebar di depan dan belakang sedikit

    // 3. Acak Rotasi Awal
    batu.rotation.x = Math.random() * Math.PI;
    batu.rotation.y = Math.random() * Math.PI;

    // 4. Simpan Kecepatan Putar Unik untuk setiap batu (agar tidak seragam)
    batu.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.01
    };

    sabukAsteroid.add(batu);
}

sabukAsteroid.visible = false; // Sembunyikan secara default

// ==========================================
// --- EFEK LORONG MATRIKS (RUTE QUANTUM) ---
// ==========================================
const gridGroup = new THREE.Group();

// Parameter Grid: (Ukuran Total, Jumlah Kotak, Warna Garis Tengah, Warna Garis Lainnya)
const ukuranGrid = 2000; // Buat sangat panjang ke belakang
const jumlahKotak = 100; // Semakin banyak kotak, semakin rapat garisnya

// 1. Lantai Matriks (Warna Cyan)
const gridLantai = new THREE.GridHelper(ukuranGrid, jumlahKotak, 0x00ffcc, 0x00aa88);
gridLantai.position.y = -30; // Taruh di bawah lambung kapal

// 2. Langit-langit Matriks (Warna Magenta)
const gridLangit = new THREE.GridHelper(ukuranGrid, jumlahKotak, 0xff00ff, 0xaa00aa);
gridLangit.position.y = 30; // Taruh di atas atap kokpit

gridGroup.add(gridLantai);
gridGroup.add(gridLangit);

gridGroup.visible = false; // Sembunyikan secara default

    // --- EXPORT SEMUA YANG DIBUTUHKAN FILE LAIN DI SINI ---
export {
    stars,
    starGeometry,
    starMaterial,
    jumlahBintang,
    garisWarp,         // Pastikan variabel ini ada di kodemu bagian baswah
    garisWarpGeometry,
    garisWarpMaterial,
    jumlahGaris,
    planetGroup, 
    planetAlpha, 
    cincinAlpha,
    kabutNebula,
    sabukAsteroid,
    gridGroup, 
    gridLantai, 
    gridLangit
};
