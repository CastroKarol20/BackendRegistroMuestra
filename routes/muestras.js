import express from 'express';
import { 
    registrarMuestra, 
    obtenerMuestras, 
    obtenerMuestraPorId, 
    actualizarMuestra, 
    eliminarMuestra 
} from '../controllers/muestrasController.js';

const router = express.Router();

// 📌 ✅ Registrar una nueva muestra (POST)
router.post('/registrar', registrarMuestra);

// 📌 ✅ Obtener todas las muestras (GET)
router.get('/', obtenerMuestras);

// 📌 ✅ Obtener una muestra por ID (GET)
router.get('/:id', obtenerMuestraPorId);

// 📌 ✅ Actualizar una muestra por ID (PUT)
router.put('/:id', actualizarMuestra);

// 📌 ✅ Eliminar una muestra por ID (DELETE)
router.delete('/:id', eliminarMuestra);

export default router;
