FROM node:18.16-alpine

WORKDIR /app    

COPY package.json package-lock.json ./
COPY . .

RUN npm install -g typescript && npm ci

EXPOSE 3000

CMD ["npm", "run", "start"]

