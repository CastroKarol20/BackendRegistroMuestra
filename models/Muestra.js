import mongoose from 'mongoose';

const MuestraSchema = new mongoose.Schema({
    cedula_cliente: { type: String, required: true },
    tipo_agua: { type: String, required: true },
    especificar_tipo_agua: { type: String },
    fecha_hora: { type: Date, required: true },
    id_muestra: { type: String, required: true, unique: true },
    tipo_muestreo: { type: String, required: true },
    analisis_realizar: { type: [String], required: true }
});

export default mongoose.model('Muestra', MuestraSchema);
