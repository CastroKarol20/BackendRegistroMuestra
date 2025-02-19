import express from 'express';
import { 
    obtenerMuestras, 
    obtenerMuestraPorId,
    registrarMuestra, 
    actualizarMuestra, 
    eliminarMuestra
} from '../controllers/muestrasController.js';

const router = express.Router();

// 📌 Registrar una nueva muestra
router.post('/registrar', registrarMuestra);

// 📌 Obtener todas las muestras
router.get('/', obtenerMuestras);

// 📌 Obtener una muestra por ID
router.get('/:id', obtenerMuestraPorId);

// 📌 Actualizar una muestra
router.put('/:id', actualizarMuestra);

// 📌 Eliminar una muestra
router.delete('/:id', eliminarMuestra);

export default router;
