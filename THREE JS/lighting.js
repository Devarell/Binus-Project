import * as THREE from 'three';
// 2. Tambahkan Cahaya (PENTING!)
// Kalau tidak ada cahaya, model 3D dari Sketchfab akan berwarna hitam pekat.
export const ambientLight = new THREE.AmbientLight(0xffffff, 0.1); // Cahaya merata ke semua arah
export const directionalLight = new THREE.DirectionalLight(0xffffff,0.2); // Cahaya seperti matahari
export const interiorLight = new THREE.PointLight(0x00ffff, 0, 50); 

// const lightHelper = new THREE.PointLightHelper(interiorLight, 1);
// scene.add(lightHelper);