# Etapa 1: Build
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Limpiar dependencias de desarrollo para optimizar la imagen final
RUN npm prune --production

# Etapa 2: Producción
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios desde la etapa de build
COPY --from=builder /app ./

# Instalar un servidor HTTP ligero para producción
RUN npm install next@latest

# Exponer el puerto que usa Next.js
EXPOSE 3000

# Comando para ejecutar la aplicación en modo producción
CMD ["npm", "run", "start"]
