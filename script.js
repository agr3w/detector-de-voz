const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const output = document.getElementById('output');

let recognition;
const previousResults = new Set(); // Usado para armazenar resultados já exibidos

if (!('webkitSpeechRecognition' in window)) {
    alert('Desculpe, seu navegador não suporta reconhecimento de voz.');
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Reconhecimento contínuo
    recognition.interimResults = false; // Resultados intermediários desativados

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript; // Obtém o texto reconhecido

        // Verifica se a frase já foi exibida
        if (!previousResults.has(transcript)) {
            previousResults.add(transcript); // Adiciona a nova frase ao conjunto
            const paragraph = document.createElement('p'); // Cria um novo parágrafo
            paragraph.textContent = transcript; // Define o texto do parágrafo
            output.appendChild(paragraph); // Adiciona o novo parágrafo ao output
            output.scrollTop = output.scrollHeight; // Rolagem automática para o final
        }
    };

    recognition.onerror = (event) => {
        alert.error('Erro de reconhecimento:', event.error); // Log de erros de reconhecimento
    };

    recognition.onend = () => {
        alert('Reconhecimento de voz encerrado.'); // Mensagem de encerramento
    };

    startButton.onclick = () => {
        output.innerHTML = ''; // Limpa a saída ao iniciar
        previousResults.clear(); // Limpa os resultados anteriores
        recognition.start(); // Inicia o reconhecimento
    };

    stopButton.onclick = () => {
        recognition.stop(); // Para o reconhecimento
    };
}
