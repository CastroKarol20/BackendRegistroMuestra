import express from 'express';
import { 
    registrarMuestra, 
    obtenerMuestras, 
    obtenerMuestraPorId, 
    actualizarMuestra, 
    eliminarMuestra 
} from '../controllers/muestrasController.js';

const router = express.Router();

// 📌 ✅ Registrar una nueva muestra (POST) - VA PRIMERO PARA EVITAR CONFLICTOS
router.post('/registrar', registrarMuestra);

// 📌 ✅ Obtener todas las muestras (GET)
router.get('/', obtenerMuestras);

// 📌 ✅ Obtener una muestra por ID (GET)
router.get('/muestra/:id', obtenerMuestraPorId); // 👈 ¡Ruta específica para evitar el error!

// 📌 ✅ Actualizar una muestra por ID (PUT)
router.put('/muestra/:id', actualizarMuestra);

// 📌 ✅ Eliminar una muestra por ID (DELETE)
router.delete('/muestra/:id', eliminarMuestra);

export default router;

