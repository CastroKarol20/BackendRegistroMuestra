import Muestra from '../models/Muestra.js';

// 1️⃣ Obtener todas las muestras con filtros
export const obtenerMuestras = async (req, res) => {
    try {
        let filtros = {};

        if (req.query.documento) filtros.documento = req.query.documento;  // 🔹 Cambio aquí
        if (req.query.id_muestra) filtros.id_muestra = req.query.id_muestra;
        if (req.query.tipoMuestreo) filtros.tipoMuestreo = req.query.tipoMuestreo;  // 🔹 Cambio aquí

        if (req.query.analisisSeleccionados) {  // 🔹 Cambio aquí
            filtros.analisisSeleccionados = { $in: [req.query.analisisSeleccionados] };
        }

        if (req.query.fechaInicio && req.query.fechaFin) {  // 🔹 Cambio aquí
            filtros.fechaHora = { 
                $gte: new Date(req.query.fechaInicio),  // 🔹 Cambio de fecha_hora → fechaHora
                $lte: new Date(req.query.fechaFin) 
            };
        }

        const muestras = await Muestra.find(filtros).sort({ fechaHora: -1 });  // 🔹 Cambio aquí
        res.status(200).json(muestras);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener muestras", error: err.message });
    }
};

// 2️⃣ Registrar una nueva muestra
export const registrarMuestra = async (req, res) => {
    try {
        const nuevaMuestra = new Muestra(req.body);
        await nuevaMuestra.save();
        res.status(201).json({ mensaje: "Muestra registrada exitosamente", data: nuevaMuestra });
    } catch (err) {
        res.status(400).json({ mensaje: "Error al registrar muestra", error: err.message });
    }
};

// Obtener una muestra por su ID
export const obtenerMuestraPorId = async (req, res) => {
    try {
        const { id_muestra } = req.params; // Obtiene el parámetro de la URL
        const muestra = await Muestra.findOne({ id_muestra });

        if (!muestra) {
            return res.status(404).json({ mensaje: "Muestra no encontrada" });
        }

        res.status(200).json(muestra);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la muestra", error: error.message });
    }
};


// 3️⃣ Actualizar una muestra por `id_muestra`
export const actualizarMuestra = async (req, res) => {
    try {
        const muestra = await Muestra.findOneAndUpdate(
            { id_muestra: req.params.id_muestra },
            req.body,
            { new: true }
        );

        if (!muestra) return res.status(404).json({ mensaje: "Muestra no encontrada" });

        res.json({ mensaje: "Muestra actualizada exitosamente", data: muestra });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4️⃣ Eliminar una muestra por `id_muestra`
export const eliminarMuestra = async (req, res) => {
    try {
        const muestra = await Muestra.findOneAndDelete({ id_muestra: req.params.id_muestra });

        if (!muestra) return res.status(404).json({ mensaje: "Muestra no encontrada" });

        res.json({ mensaje: "Muestra eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
