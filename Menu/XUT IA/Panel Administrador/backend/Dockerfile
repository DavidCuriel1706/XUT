# Usa una imagen base de Node.js v16
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app/backend

# Copia los archivos de tu proyecto al contenedor
COPY package.json package-lock.json ./
COPY index.js ./
COPY index2.js ./
COPY models/user.js ./models/

# Instala las dependencias del proyecto
RUN npm install

# Ejecuta los comandos npm start y npm start2 simultáneamente al iniciar el contenedor
CMD ["npm", "start", "&&", "npm", "start2"]