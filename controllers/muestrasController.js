import Muestra from '../models/Muestra.js';

// 📌 Obtener todas las muestras
export const obtenerMuestras = async (req, res) => {
    try {
        const muestras = await Muestra.find().sort({ fecha_hora: -1 });
        res.status(200).json(muestras);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener muestras", error: err.message });
    }
};

// 📌 Obtener una muestra por ID
export const obtenerMuestraPorId = async (req, res) => {
    try {
        const muestra = await Muestra.findById(req.params.id);
        if (!muestra) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }
        res.status(200).json(muestra);
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// 📌 Registrar una nueva muestra
export const registrarMuestra = async (req, res) => {
    try {
        const { documento_usuario, fecha_hora, tipo_muestreo, analisis_realizar, otro_analisis } = req.body;

        if (!documento_usuario || !fecha_hora || !tipo_muestreo || !analisis_realizar || !Array.isArray(analisis_realizar)) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios y 'analisis_realizar' debe ser un array." });
        }

        if (analisis_realizar.includes("OTRO") && !otro_analisis) {
            return res.status(400).json({ mensaje: "Debe proporcionar un análisis si selecciona 'OTRO'." });
        }

        const nuevaMuestra = new Muestra({ documento_usuario, fecha_hora, tipo_muestreo, analisis_realizar, otro_analisis });
        await nuevaMuestra.save();

        res.status(201).json({ mensaje: "Muestra registrada con éxito", muestra: nuevaMuestra });

    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
};

// 📌 Actualizar una muestra
export const actualizarMuestra = async (req, res) => {
    try {
        const muestra = await Muestra.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!muestra) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.json({ mensaje: "Muestra actualizada con éxito", muestra });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la muestra", error: error.message });
    }
};

// 📌 Eliminar una muestra
export const eliminarMuestra = async (req, res) => {
    try {
        const muestra = await Muestra.findByIdAndDelete(req.params.id);
        if (!muestra) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.json({ mensaje: "Muestra eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la muestra", error: error.message });
    }
};
