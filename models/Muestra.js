import mongoose from "mongoose";

const MuestraSchema = new mongoose.Schema({
    id_muestra: { type: String, unique: true },
    fecha_hora: { type: Date, default: Date.now },
    tipo_muestreo: { type: String, required: true },
    analisis_realizar: { type: [String], required: true }
});

// Generar código único automáticamente antes de guardar
MuestraSchema.pre('save', async function (next) {
    try {
        if (!this.id_muestra) {
            const count = await mongoose.model('Muestra').countDocuments();
            this.id_muestra = `MUESTRA-H${String(count + 1).padStart(2, '0')}`;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Muestra = mongoose.model('Muestra', MuestraSchema);
export default Muestra;
