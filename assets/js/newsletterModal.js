// --- Selección de Elementos ---
const modal = document.getElementById("newsletterModal");
const plane = document.getElementById("paperPlaneAnim");
const closeBtn = document.getElementById("closeModal");
const form = document.getElementById("newsletterForm");

// --- Variables de Estado ---
let flightTimeout = null;
const flightDelay = 10000; // 10 segundos de espera
let isWaitingForNextFlight = false; // <<< NUEVA VARIABLE DE ESTADO

// --- Funciones ---

// Función para iniciar un vuelo
function startFlight() {
  if (!plane.isLoaded) return;

  clearTimeout(flightTimeout); // Limpia cualquier temporizador pendiente
  isWaitingForNextFlight = false; // Ya no estamos esperando, estamos volando

  console.log("INICIANDO VUELO desde el frame 0.");
  plane.classList.remove('idle');
  plane.goToAndStop(0, true); // Va al frame 0
  plane.play(); // Inicia la reproducción
}

// --- Event Listeners ---

// 1. Cuando la animación del avión está lista
plane.addEventListener("ready", () => {
  console.log("Animación lista.");
  startFlight(); // Inicia el primer vuelo
});

// 2. Se dispara en cada frame de la animación
plane.addEventListener('frame', (e) => {
  // Cuando alcanza el frame 62 Y NO estamos ya esperando el próximo vuelo
  if (e.detail.frame >= 62 && !isWaitingForNextFlight) {
    
    // Marcamos que hemos entrado en el estado de espera.
    // Esto previene que este bloque se ejecute de nuevo en los siguientes frames
    isWaitingForNextFlight = true; 
    
    plane.pause(); // Pausa la animación
    plane.classList.add('idle');
    console.log(`AVIÓN ATERRIZADO en el frame ${Math.round(e.detail.frame)}. Esperando ${flightDelay / 1000}s...`);

    // Programa el SIGUIENTE vuelo para que ocurra después del retraso
    flightTimeout = setTimeout(() => {
        // El temporizador se cumplió, llamamos a startFlight
        console.log("TEMPORIZADOR COMPLETADO. Llamando a startFlight.");
        startFlight();
    }, flightDelay);
  }
});

// 3. Click sobre el avión para abrir el modal
plane.addEventListener("click", () => {
  console.log("Click en el avión, abriendo modal.");
  modal.classList.add("active");

  // Pausar el próximo vuelo programado si el modal se abre
  clearTimeout(flightTimeout);
  isWaitingForNextFlight = false; // Resetea el estado de espera
  console.log("Vuelo programado CANCELADO mientras el modal está abierto.");
});

// 4. Función genérica para cerrar el modal y reanudar el ciclo de espera
function closeModalAndResume() {
  modal.classList.remove("active");
  console.log("Modal cerrado. Reiniciando la animación AHORA.");
  
  // En lugar de esperar, reiniciamos el vuelo inmediatamente para dar feedback al usuario
  startFlight();
}

// Eventos para cerrar el modal
closeBtn.addEventListener("click", closeModalAndResume);
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalAndResume();
  }
});

// 5. Manejo del formulario
form.addEventListener("submit", e => {
  e.preventDefault();
  // ... tu lógica de formulario ...
  alert("Gracias por suscribirte :)");
  form.reset();
  closeModalAndResume(); // Cierra el modal y reinicia el vuelo
});