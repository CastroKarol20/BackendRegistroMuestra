import express from 'express';
import { 
    obtenerMuestras, 
    registrarMuestra, 
    actualizarMuestra, 
    eliminarMuestra 
} from '../controllers/muestrasController.js';

const router = express.Router();

// 1️ Obtener todas las muestras (con filtros opcionales)
router.get('/', obtenerMuestras);

// 2️ Registrar una nueva muestra
router.post('/', registrarMuestra);

// 3️ Actualizar una muestra por `id_muestra`
router.put('/id/:id_muestra', actualizarMuestra);

// 4️ Eliminar una muestra por `id_muestra`
router.delete('/id/:id_muestra', eliminarMuestra);

export default router;
