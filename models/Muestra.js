import mongoose from "mongoose";

const opcionesAnalisis = [
    "Aluminio", "Arsénico", "Bromo", "Cadmio", "Carbono Orgánico Total", 
    "Cloro Residual", "Cloro Total", "Cloruros", "Cobalto", "Cobre", 
    "Color Aparente", "Color Real", "Conductividad", "Cromo", 
    "Demanda Química De Oxígeno", "Dureza Cálcica", "Dureza Magnésica", "Dureza Total",
    "pH", "OTRO"
];

const MuestraSchema = new mongoose.Schema({
    id_muestra: { type: String, unique: true },
    documento: { type: String, required: true, match: /^\d{5,15}$/ },  // 🔹 Cambio de documento_cliente → documento
    fechaHora: { type: Date, required: true },  // 🔹 Cambio de fecha_hora → fechaHora
    tipoMuestreo: { type: String, required: true },  // 🔹 Cambio de tipo_muestreo → tipoMuestreo
    analisisSeleccionados: {  // 🔹 Cambio de analisis_realizar → analisisSeleccionados
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

// 📌 Generar ID único automáticamente antes de guardar
MuestraSchema.pre('save', async function(next) {
    try {
        if (!this.id_muestra) {
            let nuevoId;
            let existe;
            let contador = 1;

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
