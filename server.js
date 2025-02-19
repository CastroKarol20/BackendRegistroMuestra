import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
import muestrasRoutes from './routes/muestras.js';
app.use('/muestras', muestrasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Inicializar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
