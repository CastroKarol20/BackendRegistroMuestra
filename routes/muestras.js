import express from'express';
const router = express.Router();
import Muestra from'../models/Muestra.js';

router.post('/registrar', async (req, res) => {
    try {
        const { tipo_muestreo, analisis_realizar } = req.body;

        if (!tipo_muestreo || !analisis_realizar || !Array.isArray(analisis_realizar)) {
            return res.status(400).json({ message: "Todos los campos son obligatorios y 'analisis_realizar' debe ser un array." });
        }

        const nuevaMuestra = new Muestra({ tipo_muestreo, analisis_realizar });

        await nuevaMuestra.save();
        return res.status(201).json({ message: "Muestra registrada con éxito", muestra: nuevaMuestra });

    } catch (error) {
        console.error("Error al registrar muestra:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
})
export default router;
