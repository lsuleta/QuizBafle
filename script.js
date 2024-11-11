const preguntas = [
    {
        cancion: "adicionales/RelatosSalvajes.mp4",
        respuestas: [
            {text: "Nueve Reinas", correct: false},
            {text: "Relatos Salvajes", correct: true},
            {text: "El Aura", correct: false},
            {text: "Un Cuento Chino", correct: false},
        ]
    },
    {
        cancion: "adicionales/TangoFeroz.mp4",
        respuestas: [
            {text: "Tango Feroz", correct: true},
            { text: "Corazón de León", correct: false},
            {text: "La Historia Oficial", correct: false},
            {text: "Nueve Reinas", correct: false},
        ]
    },
    {
        cancion: "adicionales/EsperandoLaCarroza.mp4",
        respuestas: [
            {text: "La Odisea de los Giles", correct: false},
            {text: "El Hijo de la Novia", correct: false},
            {text: "El Robo del Siglo", correct: false},
            {text: "Esperando la Carroza", correct: true},
        ]
    },
    {
        cancion: "adicionales/Argentina1985.mp4",
        respuestas: [
            {text: "Argentina 1985", correct: true},
            {text: "Blondi", correct: false},
            {text: "Nueve Reinas", correct: false},
            { text: "Dos más Dos", correct: false},
        ]
    },
    {
        cancion: "adicionales/ElAngel.mp4",
        respuestas: [
            {text: "La Patagonia Rebelde", correct: false},
            {text: "La Odisea de los Giles", correct: false},
            {text: "Me Case con un Boludo", correct: false},
            { text: "El Ángel", correct: true},
        ]
    },
    {
        cancion: "adicionales/NueveReinas.mp4",
        respuestas: [
            {text: "El Secreto de sus Ojos", correct: false},
            {text: "El Robo del Siglo", correct: false},
            {text: "Nueve Reinas", correct: true},
            {text: "Metegol", correct: false},
        ]
    },
    {
        cancion: "adicionales/Puan.mp4",
        respuestas: [
            {text: "Esperando la Carroza", correct: false},
            {text: "Puan", correct: true},
            {text: "Mi Obra Maestra", correct: false},
            {text: "El Clan", correct: false},
        ]
    },
    {
        cancion: "adicionales/LaCienaga.mp4",
        respuestas: [
            { text: "La Ciénaga", correct: true},
            {text: "La Historia Oficial", correct: false},
            {text: "Tango Feroz", correct: false},
            {text: "La Patagonia Rebelde", correct: false},
        ]
    },
    {
        cancion: "adicionales/ElJockey.mp4",
        respuestas: [
            {text: "Puan", correct: false},
            {text: "El Cuidadano Ilustre", correct: false},
            {text: "El Jockey", correct: true},
            {text: "Blondi", correct: false},
        ]
    },
    {
        cancion: "adicionales/ElRoboDelSiglo.mp4",
        respuestas: [
            {text: "Tiempo de Valientes", correct: false},
            {text: "Relatos Salvajes", correct: false},
            {text: "El Robo del Siglo", correct: true},
            {text: "El Aura", correct: false},
        ]
    },
];

const reproductor = document.getElementById("reproductor");
const respuestaBotones = document.getElementById("answer-buttons");
const botonSiguiente = document.getElementById("next-btn");
const resultado = document.getElementById("resultado");
const imagen = document.getElementById("imagen");

let preguntaActualIndex = 0;
let marcador = 0;

function empezarQuiz() {
    botonSiguiente.style.display = "none";
    reproductor.style.display = "block";
    imagen.style.display = "block";
    resultado.style.display = "none";
    preguntaActualIndex = 0;
    marcador = 0;
    botonSiguiente.innerHTML = "Siguiente";
    mostrarAudio();
}

function mostrarAudio() {
    restaurarEstado();
    let preguntaActual = preguntas[preguntaActualIndex];
    reproductor.src = preguntaActual.cancion; 

    preguntaActual.respuestas.forEach(respuesta => {
        const boton = document.createElement("button");
        boton.innerHTML = respuesta.text;
        boton.classList.add("btn");
        respuestaBotones.appendChild(boton);
        if (respuesta.correct) {
            boton.dataset.correct = respuesta.correct;
        }
        boton.addEventListener("click", elegirRespuesta);
    })
}

function restaurarEstado() {
    botonSiguiente.style.display = "none";
    while (respuestaBotones.firstChild) {
        respuestaBotones.removeChild(respuestaBotones.firstChild);
    }
}

function elegirRespuesta(e) {
    const botonElegido = e.target;
    const esCorrecto = botonElegido.dataset.correct === "true";
    if (esCorrecto) {
        botonElegido.classList.add("correct");
        marcador++;
    }else{
        botonElegido.classList.add("incorrect");
    }
    Array.from(respuestaBotones.children).forEach(boton => {
        if (boton.dataset.correct === "true") {
            boton.classList.add("correct");
        }
        boton.disabled = true;
    })
    botonSiguiente.style.display = "block";
}

function mostrarResultado() {
    restaurarEstado();
    resultado.style.display = "block";
    resultado.innerHTML = `¡HICISTE ${marcador} DE ${preguntas.length}!`;
    botonSiguiente.innerHTML = "Jugar Otra Vez";
    botonSiguiente.style.display = "block";
    reproductor.style.display = "none";
    imagen.style.display = "none";
}

function manejarSiguienteBoton() {
    preguntaActualIndex++;
    if (preguntaActualIndex < preguntas.length) {
        mostrarAudio();
    }else{
        mostrarResultado();
    }
}

botonSiguiente.addEventListener("click", ()=>{
    if (preguntaActualIndex < preguntas.length) {
        manejarSiguienteBoton();
    }else{
        empezarQuiz();
    }
})

empezarQuiz();
