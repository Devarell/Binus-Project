// --- SISTEM AUDIO (BGM & SFX) ---
export const bgm = new Audio('audio/space_bgm.wav');
bgm.loop = true; // BGM akan diputar berulang-ulang
bgm.volume = 0.2; // Volume 40% agar tidak menutupi suara AI
export const suspenseBgm = new Audio ('audio/suspense_bgm.mp3');
suspenseBgm.loop = true;
suspenseBgm.volume = 0.3; // Volume 30% agar tetap terasa menegangkan tapi tidak berlebihan

export const sfxEngine = new Audio('audio/engine_start.wav');
sfxEngine.volume = 0.5; // Volume 30% untuk suara mesin
export const sfxRingtone = new Audio('audio/phone_ringtone.wav');
sfxRingtone.loop = true; // Ringtone berbunyi terus sampai diangkat

export const sfxAlarm = new Audio('audio/danger_alarm.wav');
sfxAlarm.loop = true;
sfxAlarm.volume = 0.5;

export const sfxWarp = new Audio('audio/space_warp.wav');
sfxWarp.volume = 0.2;
export const sfxExplosion = new Audio('audio/explosion_sfx.wav');  
export const sfxQTEcorrect = new Audio('audio/correct_sfx.wav');
export const sfxQTEwrong = new Audio('audio/wrong_sfx.mp3');
export const sfxLaser = new Audio('audio/laser_shot.wav');
sfxLaser.loop = true;
export const sfxVehicleDestroyed = new Audio('audio/vehicle_explosion_sfx.wav');
sfxVehicleDestroyed.volume = 0.5;
export const sfxMissionSuccess = new Audio('audio/success_sfx.wav');
export const sfxMissionFailure = new Audio('audio/gameover_sfx.wav');
export const sfxGlitch = new Audio('audio/glitch_sfx.wav');
export const sfxTyping = new Audio('audio/typing_sfx.mp3');
sfxTyping.loop = true;
sfxTyping.volume = 0.1;
