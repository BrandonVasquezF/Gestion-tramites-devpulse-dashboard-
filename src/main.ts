// --- 1. IMPORTS (Limpios para evitar advertencias de TS) ---
import './style.css'
import { 
  createIcons, Clock, CheckCircle2, AlertCircle, 
  Search, PlusCircle, ArchiveX, Plus, List, Layers, Bell 
} from 'lucide';

import { buscarTramites } from './logica.ts';
import { listaDeTramites, type Tramite } from './tramites.ts';

// --- 2. ELEMENTOS DEL DOM ---
const inputBusqueda = document.querySelector<HTMLInputElement>('#search-input');
const contenedorTramites = document.querySelector<HTMLElement>('#contenedor-tramites');
const btnNuevoTramite = document.querySelector<HTMLButtonElement>('#btn-nuevo-tramite');

// Referencias del Modal
const modal = document.querySelector('#modal-tramite');
const inputModalNombre = document.querySelector<HTMLInputElement>('#modal-input-nombre');
const checkModalUrgente = document.querySelector<HTMLInputElement>('#modal-input-urgente');
const btnModalCancelar = document.querySelector('#btn-modal-cancelar');
const btnModalGuardar = document.querySelector('#btn-modal-guardar');

// Filtros laterales
const filtroTodos = document.querySelector('#filtro-todos');
const filtroPendientes = document.querySelector('#filtro-pendientes');
const filtroFinalizados = document.querySelector('#filtro-finalizados');

// --- 3. PERSISTENCIA (LocalStorage) ---
const cargarDeLocal = (): Tramite[] => {
    const datos = localStorage.getItem('tramites_db');
    return datos ? JSON.parse(datos) : listaDeTramites;
};

const guardarEnLocal = (tramites: Tramite[]) => {
    localStorage.setItem('tramites_db', JSON.stringify(tramites));
};

// --- 4. RENDERIZADO ---
const renderizarTramites = (lista: Tramite[]) => {
    if (!contenedorTramites) return;
    contenedorTramites.innerHTML = '';

    lista.forEach(tramite => {
        const item = document.createElement('div');
        item.className = "flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 mb-3 hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2";
        
        item.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="p-2 ${tramite.prioridad ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'} rounded-lg">
                    <i data-lucide="${tramite.prioridad ? 'alert-circle' : 'clock'}"></i>
                </div>
                <div>
                    <h3 class="titulo-tramite font-semibold text-slate-800 dark:text-slate-100 cursor-pointer hover:text-blue-500" data-id="${tramite.id}">
                        ${tramite.titulo}
                    </h3>
                    <button class="btn-estado text-xs font-medium px-2 py-0.5 rounded-full ${tramite.estado === 'finalizado' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}" data-id="${tramite.id}">
                        ${tramite.estado.toUpperCase()}
                    </button>
                </div>
            </div>
            <button class="btn-eliminar p-2 text-slate-400 hover:text-red-500 transition-colors" data-id="${tramite.id}">
                <i data-lucide="archive-x"></i>
            </button>
        `;
        contenedorTramites.appendChild(item);
    });

    createIcons({ icons: { Clock, CheckCircle2, AlertCircle, Search, PlusCircle, ArchiveX, Plus, List, Layers, Bell } });
    conectarEventosDinamicos();
};

// --- 5. EVENTOS DINÁMICOS (Corregidos para Vercel) ---
const conectarEventosDinamicos = () => {
    // Eliminar
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.currentTarget as HTMLButtonElement).dataset.id);
            const nuevos = cargarDeLocal().filter(t => t.id !== id);
            guardarEnLocal(nuevos);
            renderizarTramites(nuevos);
        });
    });

    // Cambiar Estado (Solución al error de tipos)
    document.querySelectorAll('.btn-estado').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = Number((e.currentTarget as HTMLButtonElement).dataset.id);
            const actuales = cargarDeLocal().map(t => {
                if (t.id === id) {
                    const nuevoEstado = t.estado === 'pendiente' ? 'finalizado' as const : 'pendiente' as const;
                    return { ...t, estado: nuevoEstado };
                }
                return t;
            });
            guardarEnLocal(actuales);
            renderizarTramites(actuales);
        });
    });

    // Editar Título
    document.querySelectorAll('.titulo-tramite').forEach(el => {
        el.addEventListener('click', (e) => {
            const id = Number((e.currentTarget as HTMLElement).dataset.id);
            const nuevoTitulo = window.prompt("Nuevo nombre del trámite:");
            if (nuevoTitulo) {
                const actuales = cargarDeLocal().map(t => t.id === id ? { ...t, titulo: nuevoTitulo } : t);
                guardarEnLocal(actuales);
                renderizarTramites(actuales);
            }
        });
    });
};

// --- 6. LÓGICA DEL MODAL ---
const cerrarModal = () => {
    modal?.classList.add('hidden');
    if (inputModalNombre) inputModalNombre.value = '';
    if (checkModalUrgente) checkModalUrgente.checked = false;
};

btnNuevoTramite?.addEventListener('click', () => {
    modal?.classList.remove('hidden');
    inputModalNombre?.focus();
});

btnModalCancelar?.addEventListener('click', cerrarModal);

btnModalGuardar?.addEventListener('click', () => {
    const nombre = inputModalNombre?.value;
    
    if (nombre && nombre.trim() !== "") {
        const nuevo: Tramite = {
            id: Date.now(),
            titulo: nombre,
            estado: 'pendiente' as const, // Corrección para TS
            prioridad: checkModalUrgente?.checked || false
        };

        const actuales = [...cargarDeLocal(), nuevo];
        guardarEnLocal(actuales);
        renderizarTramites(actuales);
        cerrarModal();
    }
});

// --- 7. BUSCADOR Y FILTROS ---
inputBusqueda?.addEventListener('input', (e) => {
    const valor = (e.target as HTMLInputElement).value;
    const filtrados = cargarDeLocal().filter(t => t.titulo.toLowerCase().includes(valor.toLowerCase()));
    renderizarTramites(filtrados);
});

filtroPendientes?.addEventListener('click', () => {
    const filtrados = cargarDeLocal().filter(t => t.estado === 'pendiente');
    renderizarTramites(filtrados);
});

filtroFinalizados?.addEventListener('click', () => {
    const filtrados = cargarDeLocal().filter(t => t.estado === 'finalizado');
    renderizarTramites(filtrados);
});

filtroTodos?.addEventListener('click', () => renderizarTramites(cargarDeLocal()));

// Inicio
renderizarTramites(cargarDeLocal());