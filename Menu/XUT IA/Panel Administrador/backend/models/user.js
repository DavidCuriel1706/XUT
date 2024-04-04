// user.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Antes de guardar, hashear la contraseña
userSchema.pre('save', async function(next) {
    // Saltar si la contraseña no ha sido modificada
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generar un salt y hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Definir el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
