// --- 1. IMPORTS ---
import './style.css'
import { 
  createIcons, Home, Briefcase, User, Clock, 
  CheckCircle2, AlertCircle, Bell, Layers, 
  Search, PlusCircle, ArchiveX, Plus 
} from 'lucide';

// --- 2. CONFIGURACIONES INICIALES (Iconos y Modo Oscuro) ---
createIcons({
  icons: { Home, Briefcase, User, Clock, CheckCircle2, AlertCircle, Bell, Layers, Search, PlusCircle, ArchiveX, Plus },
});

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

// --- 3. VARIABLES Y TIPOS  ---
const appNombre: string = "DevPulse Dashboard";
const nombreUsuario: string = "Brandon";
const nombreTramite: string = "Renovación de Matrícula"; // Declarada para el IF
const esUrgente: boolean = true;                        // Declarada para el IF

let busquedaActual: string = "";
let estadoFiltro: string = "todos";
let totalTramites: number = 3;

// --- 4. SELECCIÓN DE ELEMENTOS DEL DOM ---
const inputBusqueda = document.querySelector<HTMLInputElement>('#search-input');
const contenedorTramites = document.querySelector<HTMLElement>('#contenedor-tramites');
const btnNuevoTramite = document.querySelector<HTMLButtonElement>('#btn-nuevo-tramite');
const filtrarPorNombre = (nombre: string, busqueda: string): boolean => {
    return nombre.toLowerCase().includes(busqueda.toLowerCase());
};
const actualizarContador = (nuevoTotal: number): void => {
    totalTramites = nuevoTotal;
};

// Reto 1: Cambiar el estado del filtro
const cambiarEstadoFiltro = (nuevoEstado: string): void => {
    estadoFiltro = nuevoEstado;
    console.log(`Filtro actualizado: ${estadoFiltro}`);
};
// Prueba llamándola así:
cambiarEstadoFiltro("finalizados");

// Reto 2: Limpiar la búsqueda
const limpiarBusqueda = (): void => {
    busquedaActual = ""; // Limpiamos la variable
    
    // Si el input existe en el HTML, le borramos el texto
    if (inputBusqueda) {
        inputBusqueda.value = "";
    }
    
    console.log(" Búsqueda reiniciada");
};
// Esta función nos dirá si un trámite es urgente o no
const esPrioritario = (diasRestantes: number): boolean => {
    return diasRestantes < 3; // Devuelve true si faltan menos de 3 días
};

const pruebaUrgencia = esPrioritario(2);
console.log(`¿Es urgente? ${pruebaUrgencia}`); // Imprimirá: true


// --- 5. LOGS DE CONTROL ---
if (esUrgente) {
   console.log(`¡Atención! El trámite ${nombreTramite} requiere acción inmediata.`);
}

console.log(`¡Hola ${nombreUsuario}! Bienvenido a ${appNombre}.`);
console.log(`Estado actual: Filtrado por "${estadoFiltro}". Tienes ${totalTramites} trámites cargados.`);
// Prueba en consola
console.log(filtrarPorNombre("Pago de servicios", "pago")); // Debería dar true
console.log(`El nuevo total es: ${totalTramites}`);
console.log(`El nuevo estado del filtro es: ${estadoFiltro}`);