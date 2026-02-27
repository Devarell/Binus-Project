const aiCompanion = document.getElementById('ai-companion');
const aiTextElement = document.getElementById('ai-text');
let typingInterval; 

// TAMBAHKAN PARAMETER gunakanSuara = true DI SINI
export function triggerAI(message, hideAfterMs = 5000, gunakanSuara = true) {
    aiCompanion.style.display = 'flex';
    aiTextElement.innerHTML = ''; 
    
    if (typingInterval) clearInterval(typingInterval); 
    
    // HANYA BERBICARA JIKA SAKLARNYA MENYALA
    if (gunakanSuara) {
        window.speechSynthesis.cancel(); 
        const ucapanAI = new SpeechSynthesisUtterance(message);
        ucapanAI.lang = 'id-ID';  
        ucapanAI.pitch = 1.3;     
        ucapanAI.rate = 1.1;      
        window.speechSynthesis.speak(ucapanAI);
    }

    let i = 0;
    typingInterval = setInterval(() => {
        if (i < message.length) {
            aiTextElement.innerHTML += message.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval); 
            if (hideAfterMs > 0) {
                setTimeout(() => {
                    aiCompanion.style.display = 'none';
                }, hideAfterMs);
            }
        }
    }, 40); 
}