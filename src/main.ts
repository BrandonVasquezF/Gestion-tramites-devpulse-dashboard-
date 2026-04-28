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

// Definimos cómo luce un Trámite
interface Tramite {
    id: number;
    titulo: string;
    estado: 'pendiente' | 'finalizado';
    prioridad: boolean;
}

// Nuestra lista de datos inicial
const listaDeTramites: Tramite[] = [
    { id: 1, titulo: "Renovación de Licencia", estado: 'pendiente', prioridad: true },
    { id: 2, titulo: "Pago de Servicios", estado: 'finalizado', prioridad: false },
    { id: 3, titulo: "Solicitud de Beca", estado: 'pendiente', prioridad: true },
];

// Queremos solo los trámites pendientes
const pendientes = listaDeTramites.filter(t => t.estado === 'pendiente');
console.log("Solo pendientes:", pendientes);

// Queremos solo los títulos en mayúsculas
const titulosMayusculas = listaDeTramites.map(t => t.titulo.toUpperCase());
console.log(titulosMayusculas);

// Buscar el trámite con ID 2
const tramiteEncontrado = listaDeTramites.find(t => t.id === 2);


// 1. Filtrar por prioridad
const obtenerUrgentes = (): Tramite[] => {
    return listaDeTramites.filter(tramite => tramite.prioridad === true);
};

console.log("Trámites Urgentes:", obtenerUrgentes());

// 2. Contar cuántos están terminados
const contarFinalizados = (): number => {
    const finalizados = listaDeTramites.filter(t => t.estado === 'finalizado');
    return finalizados.length;
};

console.log(`✅ Tienes ${contarFinalizados()} trámites finalizados.`);

// 3. Buscador inteligente
const buscarTramites = (palabra: string): Tramite[] => {
    return listaDeTramites.filter(t => 
        t.titulo.toLowerCase().includes(palabra.toLowerCase())
    );
};

// Prueba: busca "beca" en tu consola
console.log("🔍 Resultado de búsqueda:", buscarTramites("beca"));