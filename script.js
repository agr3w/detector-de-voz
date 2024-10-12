const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const output = document.getElementById('output');
const wordInput = document.getElementById('word-input');
const trackedWordDisplay = document.getElementById('tracked-word');
const wordCountDisplay = document.getElementById('word-count');

let recognition;
let wordToTrack = '';
let wordCount = 0;
let recognizing = false; // Variável para verificar se está reconhecendo
const previousResults = new Set(); // Usado para armazenar resultados já exibidos

if (!('webkitSpeechRecognition' in window)) {
    alert('Desculpe, seu navegador não suporta reconhecimento de voz.');
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Reconhecimento contínuo
    recognition.interimResults = false; // Resultados intermediários desativados

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase(); // Texto reconhecido, convertendo para minúsculas
        if (!previousResults.has(transcript)) {
            previousResults.add(transcript);
            const paragraph = document.createElement('p');
            paragraph.textContent = transcript;
            output.appendChild(paragraph);
            output.scrollTop = output.scrollHeight;

            // Verifica se a palavra monitorada está no texto reconhecido
            if (wordToTrack && transcript.includes(wordToTrack.toLowerCase())) {
                wordCount++;
                wordCountDisplay.textContent = wordCount;
            }
        }
    };

    recognition.onerror = (event) => {
        console.error('Erro de reconhecimento:', event.error);
    };

    recognition.onend = () => {
        recognizing = false;
        console.log('Reconhecimento de voz encerrado.');
    };

    startButton.onclick = () => {
        wordToTrack = wordInput.value.trim();
        if (wordToTrack === '') {
            alert('Por favor, insira uma palavra para monitorar.');
            return;
        }
        trackedWordDisplay.textContent = wordToTrack;
        wordCount = 0;
        wordCountDisplay.textContent = wordCount;
        output.innerHTML = ''; // Limpa o texto anterior
        previousResults.clear(); // Limpa os resultados anteriores
        recognition.start(); // Inicia o reconhecimento
        recognizing = true;
    };

    stopButton.onclick = () => {
        if (recognizing) {
            recognition.stop(); // Para o reconhecimento
            recognizing = false;
        }
    };
}
