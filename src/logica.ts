// 1. Importamos el tipo de dato para que TS no se queje
import type { Tramite } from './tramites'; // Añadimos la palabra 'type'
import { listaDeTramites } from './tramites';

// --- FUNCIONES DEL DÍA 17 (Arrays) ---

/**
 * Filtra los trámites que tienen prioridad alta
 */
export const obtenerUrgentes = (): Tramite[] => {
    return listaDeTramites.filter(tramite => tramite.prioridad === true);
};

/**
 * Cuenta cuántos trámites han sido completados
 */
export const contarFinalizados = (): number => {
    return listaDeTramites.filter(t => t.estado === 'finalizado').length;
};

/**
 * Busca trámites por coincidencia de texto en el título
 */
export const buscarTramites = (palabra: string): Tramite[] => {
    return listaDeTramites.filter(t => 
        t.titulo.toLowerCase().includes(palabra.toLowerCase())
    );
};

// --- FUNCIONES DEL DÍA 18 (Desestructuración) ---

/**
 * Muestra un log limpio usando desestructuración de objetos
 */
export const mostrarDetalle = ({ titulo, estado }: Tramite): void => {
    console.log(`📋 Procesando: ${titulo} | Estado: ${estado}`);
};