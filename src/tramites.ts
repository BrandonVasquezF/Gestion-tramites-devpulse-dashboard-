// Exportamos la interfaz
export interface Tramite {
    id: number;
    titulo: string;
    estado: 'pendiente' | 'finalizado';
    prioridad: boolean;
}

// Exportamos la lista inicial
export const listaDeTramites: Tramite[] = [
    { id: 1, titulo: "Renovación de Licencia", estado: 'pendiente', prioridad: true },
    { id: 2, titulo: "Pago de Servicios", estado: 'finalizado', prioridad: false },
    { id: 3, titulo: "Solicitud de Beca", estado: 'pendiente', prioridad: true },
];