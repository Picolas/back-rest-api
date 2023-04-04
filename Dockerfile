# Utiliser une image Node.js officielle comme image de base
FROM node:14-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans l'image
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les autres fichiers de l'application dans l'image
COPY src ./src
COPY .env ./

# Exposer le port sur lequel l'API sera accessible
EXPOSE ${APP_PORT}

# Lancer l'application
CMD ["npm", "start"]
