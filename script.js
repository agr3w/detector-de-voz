const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const outputDiv = document.getElementById('output');
const wordInput = document.getElementById('word-input');
const trackedWordDisplay = document.getElementById('tracked-word');
const wordCountDisplay = document.getElementById('word-count');

let isRecognizing = false;
let wordCount = 0;
let trackedWord = '';
let recognition; // Variável para o reconhecimento contínuo

// Função para iniciar o reconhecimento contínuo
function startRecognition() {
    recognition = new webkitSpeechRecognition(); // Instância de reconhecimento de voz
    recognition.lang = 'pt-BR'; // Defina o idioma
    recognition.continuous = true; // Definir para reconhecimento contínuo
    recognition.interimResults = false; // Somente pegar frases completas

    // Sempre que uma palavra é detectada
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        console.log("Texto reconhecido: ", transcript);
        outputDiv.innerHTML += `<p>${transcript}</p>`; // Exibir o texto reconhecido no output

        // Verifica se o texto reconhecido contém a palavra monitorada
        if (transcript.toLowerCase().includes(trackedWord.toLowerCase())) {
            wordCount++;
            wordCountDisplay.textContent = wordCount;
        }
    };

    recognition.start(); // Inicia o reconhecimento de voz
    isRecognizing = true;
}

// Função para parar o reconhecimento
function stopRecognition() {
    if (recognition && isRecognizing) {
        recognition.stop();
        isRecognizing = false;
    }
}

// Manipuladores dos botões de iniciar e parar
startButton.addEventListener('click', () => {
    trackedWord = wordInput.value.trim(); // Palavra a ser monitorada
    if (trackedWord) {
        trackedWordDisplay.textContent = trackedWord; // Exibir a palavra monitorada
        wordCount = 0; // Reinicia a contagem de palavras
        wordCountDisplay.textContent = wordCount; // Reinicia a exibição da contagem
        startRecognition();
    } else {
        alert('Por favor, insira uma palavra para monitorar.');
    }
});

stopButton.addEventListener('click', stopRecognition);
