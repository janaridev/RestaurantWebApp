FROM node:18.16-alpine

WORKDIR /app    

COPY src/frontend/package.json src/frontend/package-lock.json ./
COPY src/frontend/. .

RUN npm install -g typescript && npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]

