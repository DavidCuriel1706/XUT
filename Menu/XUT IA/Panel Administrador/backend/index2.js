// Importar mongoose y establecer la conexión con la base de datos
const mongoose = require('mongoose');

// URL de conexión utilizando el nombre del contenedor de MongoDB
const mongoURL = 'mongodb://localhost:27017/Usuarios';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

// Importar el modelo de usuario
const User = require('./models/user');

// Importar express y configurar el servidor
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Ruta para verificar que el servidor está funcionando
app.get("/", (req, resp) => {
    resp.send("La aplicación está funcionando");
});

// Ruta para el inicio de sesión
app.post("/login", async (req, resp) => {
    try {
        const { name, password } = req.body;

        // Buscar al usuario por su nombre de usuario
        const user = await User.findOne({ name });

        // Si no se encuentra el usuario, enviar un mensaje de error
        if (!user) {
            return resp.status(400).json({ message: "Credenciales incorrectas" });
        }

        // Comparar la contraseña proporcionada con la almacenada
        if (password !== user.password) {
            return resp.status(400).json({ message: "Credenciales incorrectas" });
        }

        // Si las credenciales son correctas, enviar una respuesta exitosa
        resp.status(200).json({ message: "Inicio de sesión exitoso" });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        resp.status(500).json({ message: "Error al iniciar sesión. Por favor, inténtalo de nuevo." });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`App escuchando en el puerto ${PORT}`);
});