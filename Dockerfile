# Node.js base image
FROM node:18-alpine

# Çalışma dizinini belirle
WORKDIR /app

# Bağımlılık dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak kodları kopyala
COPY . .

EXPOSE 3000

ENV HOST=0.0.0.0
CMD ["npm", "start"]
