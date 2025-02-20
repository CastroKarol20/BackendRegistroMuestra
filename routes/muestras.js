import express from 'express';
import { 
    obtenerMuestras, 
    obtenerMuestraPorId,  // 🔹 Se importa la nueva función
    registrarMuestra, 
    actualizarMuestra, 
    eliminarMuestra 
} from '../controllers/muestrasController.js';

const router = express.Router();

router.get('/', obtenerMuestras); // Obtener todas las muestras
router.get('/:id_muestra', obtenerMuestraPorId); // 🔹 Nueva ruta para obtener una muestra por ID
router.post('/registrar', registrarMuestra);
router.put('/id/:id_muestra', actualizarMuestra);
router.delete('/id/:id_muestra', eliminarMuestra);

export default router;
