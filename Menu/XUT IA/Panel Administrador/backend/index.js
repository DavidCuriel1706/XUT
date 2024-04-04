// Para conectar con tu base de datos mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

// Schema para los usuarios de la aplicación
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,  
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// Para backend y express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App escuchando en el puerto 5001");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
    resp.send("La aplicación está funcionando");
    // Puedes verificar si el backend está funcionando ingresando a http://localhost:5000
    // Si ves "La aplicación está funcionando" significa que
    // el backend está funcionando correctamente
});

app.post("/register", async (req, resp) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("El usuario ya está registrado");
        }
    } catch (e) {
        resp.send("Algo salió mal");
    }
});
app.listen(5001);

