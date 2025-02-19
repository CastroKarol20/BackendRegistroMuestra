import mongoose from "mongoose";

const opcionesAnalisis = [
    "Aluminio", "Arsénico", "Bromo", "Cadmio", "Carbono Orgánico Total", 
    "Cloro Residual", "Cloro Total", "Cloruros", "Cobalto", "Cobre", 
    "Color Aparente", "Color Real", "Conductividad", "Cromo", 
    "Demanda Química De Oxígeno", "Dureza Cálcica", "Dureza Magnésica", "Dureza Total",
    "pH", "OTRO" // Se permite "OTRO"
];

const MuestraSchema = new mongoose.Schema({
    id_muestra: { type: String, unique: true },
    documento_usuario: { type: String, required: true, match: /^\d{5,15}$/ },
    fecha_hora: { type: Date, required: true },
    tipo_muestreo: { type: String, required: true },
    analisis_realizar: { 
        type: [String], 
        required: true,
        validate: {
            validator: function(val) {
                return val.every(a => opcionesAnalisis.includes(a) || a.startsWith("OTRO:"));
            },
            message: "Uno o más valores de análisis no son válidos."
        }
    }
});

// 📌 🔥 Nueva forma de generar `id_muestra` evitando duplicados
MuestraSchema.pre('save', async function(next) {
    try {
        if (!this.id_muestra) {
            let nuevoId;
            let existe;
            let contador = 1;

            // Generar un ID hasta encontrar uno que no esté duplicado
            do {
                nuevoId = `MUESTRA-H${String(contador).padStart(2, '0')}`;
                existe = await mongoose.model('Muestra').findOne({ id_muestra: nuevoId });
                contador++;
            } while (existe);

            this.id_muestra = nuevoId;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export default mongoose.model("Muestra", MuestraSchema);
