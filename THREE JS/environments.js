import * as THREE from 'three';

// --- MESIN BINTANG KARTUN 3D ---
const starGroup = new THREE.Group(); // Hilangkan kata 'export' di sini

const jumlahBintangKartun = 400; 
const starGeometry = new THREE.IcosahedronGeometry(8, 0); 
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < jumlahBintangKartun; i++) {
    const star = new THREE.Mesh(starGeometry, starMaterial);
    
    const [x, y, z] = Array(3).fill().map(() => (Math.random() - 0.5) * 2000);
    
    if (z > -100 && z < 100) {
        star.position.set(x, y, z + 400); 
    } else {
        star.position.set(x, y, z);
    }

    star.rotation.x = Math.random() * Math.PI;
    star.rotation.y = Math.random() * Math.PI;

    starGroup.add(star);
}

// BARIS scene.add(starGroup) SUDAH DIHAPUS DARI SINI

// --- EFEK GARIS WARP SPEED (MODE QUANTUM) ---
const garisWarpGeometry = new THREE.BufferGeometry();
const garisWarpMaterial = new THREE.LineBasicMaterial({ 
    color: 0xff00ff, 
    transparent: true, 
    opacity: 0 
});

const garisWarpVertices = [];
const jumlahGaris = 1000; 

for(let i = 0; i < jumlahGaris; i++) {
    const x = (Math.random() - 0.5) * 200; 
    const y = (Math.random() - 0.5) * 200;
    const z = (Math.random() - 0.5) * 200;
    const panjangGaris = Math.random() * 20 + 10; 
    
    garisWarpVertices.push(x, y, z);                 
    garisWarpVertices.push(x, y, z + panjangGaris);  
}

garisWarpGeometry.setAttribute('position', new THREE.Float32BufferAttribute(garisWarpVertices, 3));
const garisWarp = new THREE.LineSegments(garisWarpGeometry, garisWarpMaterial);


// ==========================================
// --- EFEK PLANET ALPHA (SEKTOR DAMAI) ---
// ==========================================
const planetGeometry = new THREE.SphereGeometry(40, 32, 32);
const planetMaterial = new THREE.MeshStandardMaterial({
    color: 0x00aaff, 
    emissive: 0x004488, 
    wireframe: true, 
    transparent: true,
    opacity: 0.8
});
const planetAlpha = new THREE.Mesh(planetGeometry, planetMaterial);

const cincinGeometry = new THREE.RingGeometry(55, 80, 64);
const cincinMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide, 
    wireframe: true,
    transparent: true,
    opacity: 0.5
});
const cincinAlpha = new THREE.Mesh(cincinGeometry, cincinMaterial);
cincinAlpha.rotation.x = Math.PI / 2; 

const planetGroup = new THREE.Group();
planetGroup.add(planetAlpha);
planetGroup.add(cincinAlpha);

planetGroup.position.set(0, 10, -400); 
planetGroup.visible = false; 

const kabutNebula = new THREE.FogExp2(0x1a053a, 0);


// ==========================================
// --- EFEK SABUK ASTEROID (LOW-POLY) ---
// ==========================================
const sabukAsteroid = new THREE.Group();
const jumlahBatu = 100; 
const batuGeometry = new THREE.DodecahedronGeometry(1, 0); 
const batuMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xaaaaaa, 
    flatShading: true 
});

for (let i = 0; i < jumlahBatu; i++) {
    const batu = new THREE.Mesh(batuGeometry, batuMaterial);
    const skala = Math.random() * 5 + 1; 
    batu.scale.set(skala, skala, skala);

    const radiusAman = 80; 
    const radiusMaksimal = 350; 
    
    const radius = radiusAman + Math.random() * (radiusMaksimal - radiusAman);
    const sudut = Math.random() * Math.PI * 2; 

    batu.position.x = Math.cos(sudut) * radius;
    batu.position.y = Math.sin(sudut) * radius;
    batu.position.z = (Math.random() * -400);

    batu.rotation.x = Math.random() * Math.PI;
    batu.rotation.y = Math.random() * Math.PI;

    batu.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.01,
        rotSpeedY: (Math.random() - 0.5) * 0.01,
        rotSpeedZ: (Math.random() - 0.5) * 0.01
    };

    sabukAsteroid.add(batu);
}

sabukAsteroid.visible = false; 


// ==========================================
// --- EFEK LORONG MATRIKS (RUTE QUANTUM) ---
// ==========================================
const gridGroup = new THREE.Group();
const ukuranGrid = 2000; 
const jumlahKotak = 100; 

const gridLantai = new THREE.GridHelper(ukuranGrid, jumlahKotak, 0x00ffcc, 0x00aa88);
gridLantai.position.y = -30; 

const gridLangit = new THREE.GridHelper(ukuranGrid, jumlahKotak, 0xff00ff, 0xaa00aa);
gridLangit.position.y = 30; 

gridGroup.add(gridLantai);
gridGroup.add(gridLangit);
gridGroup.visible = false; 

// ==========================================
// --- OBJEK LANDMARK: BINTANG RAKSASA ---
// ==========================================
// Menggunakan bentuk Icosahedron dengan detail 1 agar terlihat bundar tapi tetap low-poly bersudut
const raksasaGeometry = new THREE.IcosahedronGeometry(150, 1); 
const raksasaMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // BasicMaterial agar bersinar tanpa pantulan
const bintangRaksasa = new THREE.Mesh(raksasaGeometry, raksasaMaterial);

bintangRaksasa.visible = false; // Sembunyikan secara default


// --- EXPORT SEMUA YANG DIBUTUHKAN FILE LAIN DI SINI ---
export {
    starGroup,         // <--- INI PENGGANTI 'stars'
    starGeometry,
    starMaterial,
    jumlahBintangKartun,
    garisWarp,         
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
    gridLangit,
    bintangRaksasa
};