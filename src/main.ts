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

// --- 5. LOGS DE CONTROL ---
if (esUrgente) {
   console.log(`¡Atención! El trámite ${nombreTramite} requiere acción inmediata.`);
}

console.log(`¡Hola ${nombreUsuario}! Bienvenido a ${appNombre}.`);
console.log(`Estado actual: Filtrado por "${estadoFiltro}". Tienes ${totalTramites} trámites cargados.`);