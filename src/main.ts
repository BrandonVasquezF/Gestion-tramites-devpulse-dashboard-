// --- 1. IMPORTS DE LIBRERÍAS EXTERNAS ---
import './style.css'
import { 
  createIcons, Home, Briefcase, User, Clock, 
  CheckCircle2, AlertCircle, Bell, Layers, 
  Search, PlusCircle, ArchiveX, Plus 
} from 'lucide';

// --- 2. IMPORTS DE TUS PROPIOS MÓDULOS (Lo nuevo del Día 19) ---
// Traemos los datos y la lógica desde sus respectivos archivos
import { listaDeTramites } from './tramites';
import { 
    obtenerUrgentes, 
    contarFinalizados, 
    buscarTramites, 
    mostrarDetalle 
} from './logica.ts';

// --- 3. CONFIGURACIONES (Iconos y Modo Oscuro) ---
createIcons({
  icons: { Home, Briefcase, User, Clock, CheckCircle2, AlertCircle, Bell, Layers, Search, PlusCircle, ArchiveX, Plus },
});

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}

// --- 4. VARIABLES GLOBALES Y ELEMENTOS DEL DOM ---
const appNombre: string = "DevPulse Dashboard";
const nombreUsuario: string = "Brandon";

const inputBusqueda = document.querySelector<HTMLInputElement>('#search-input');
const contenedorTramites = document.querySelector<HTMLElement>('#contenedor-tramites');
const btnNuevoTramite = document.querySelector<HTMLButtonElement>('#btn-nuevo-tramite');

// --- 5. EJECUCIÓN DE LA LÓGICA ---

// Mensajes de bienvenida
console.log(`¡Hola ${nombreUsuario}! Bienvenido a ${appNombre}.`);
console.log(`Tienes un total de ${listaDeTramites.length} trámites cargados.`);

// Usamos nuestras funciones importadas de logica.ts
const urgentes = obtenerUrgentes();
console.log("🔥 Trámites que requieren atención:", urgentes);

const finalizadosCount = contarFinalizados();
console.log(`✅ Has completado ${finalizadosCount} trámites.`);

// Probamos la desestructuración con el primer trámite de la lista
mostrarDetalle(listaDeTramites[0]);

// Ejemplo de búsqueda dinámica
const resultados = buscarTramites("Licencia");
console.log("🔍 Resultado de búsqueda para 'Licencia':", resultados);

// --- 6. EVENTOS (Día 20) ---

// Escuchamos cuando el usuario escribe en el input
inputBusqueda?.addEventListener('input', (event) => {
    // 1. Capturamos el valor del input (lo que el usuario escribió)
    const elemento = event.target as HTMLInputElement;
    const valorBusqueda = elemento.value;

    // 2. Usamos nuestra función lógica para filtrar
    const resultados = buscarTramites(valorBusqueda);

    // 3. Por ahora, mostramos los resultados en consola
    console.log(`🔎 Buscando: "${valorBusqueda}"...`);
    console.table(resultados); 
});

btnNuevoTramite?.addEventListener('click', () => {
    alert("¡Pronto podrás añadir trámites desde aquí! 🚀");
    // Aquí es donde en el futuro abrirías un modal o formulario
});