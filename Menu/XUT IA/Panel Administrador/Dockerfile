# Usa una imagen base de Node.js
FROM node:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
