# Establece la imagen base para el contenedor
FROM node:21

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /src

# Copia el archivo package.json y el lock file al contenedor
COPY . .

# Instala las dependencias de Node.js
RUN npm install

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["npm", "run", "dev"]
