let source = null;
document.getElementById("audio").addEventListener("change", (event) => {
        const file = event.target.files[0];

        const reader = new FileReader(); 

        reader.addEventListener("load", (event) => {
             const arrayBuffer = event.target.result;

             const audioContext = new (window.AudioContext || window.webkitAudioContext)();

             audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
                visualise(audioBuffer, audioContext)
            })
        })
            
        reader.readAsArrayBuffer(file);
    }); 
function visualise(audioBuffer, audioContext) {
   
    if (source) {
        source.stop();
    }
    const canvas = document.getElementById("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const frequencyBufferLength = analyser.frequencyBinCount;
    const frequencyData = new Uint8Array(frequencyBufferLength);
 
    source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    source.start();

    const canvasContext = canvas.getContext("2d");

 
    const barWidth = canvas.width / frequencyBufferLength 


function draw() { 
    requestAnimationFrame(draw)
    

  
    canvasContext.clearRect( 0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(frequencyData);
const gradient = canvasContext.createLinearGradient(
    0, canvas.height,  // bottom
    0, canvas.height/2               // top
);

gradient.addColorStop(0, "#4facfe");   // bottom
gradient.addColorStop(0.5, "#b58bf5"); // middle
gradient.addColorStop(1, "#f38cfa");   // top


    
    for(let i = 0; i < frequencyBufferLength; i++) {
        canvasContext.fillStyle = gradient;
        canvasContext.fillRect(
            i * barWidth, 
            canvas.height - frequencyData[i], 
            barWidth -1,
            frequencyData[i]
            )
        }
    }

        draw()
}