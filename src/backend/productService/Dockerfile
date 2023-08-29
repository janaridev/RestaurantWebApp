FROM node:18.16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY . .            

RUN npm install -g typescript && npm ci
RUN npm run build

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://mongodb:27017/product
ENV SECRET_KEY=asudhsahncSDIJHSHCPOASHCVNJB
ENV PORT=3030

EXPOSE ${PORT}

CMD ["npm", "run", "start"]