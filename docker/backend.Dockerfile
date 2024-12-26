FROM node:18-alpine

WORKDIR /index

COPY ../backend/package*.json ./
RUN npm install

COPY ../backend .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/index.js"]
