FROM node:18.16-alpine

WORKDIR /app

COPY src/backend/couponService/package.json src/backend/couponService/package-lock.json ./
COPY src/backend/couponService/. .            

RUN npm install -g typescript && npm ci
RUN npm run build

ENV NODE_ENV=production
ENV MONGO_URL=mongodb://mongodb:27017/coupon
ENV PORT=3010

EXPOSE ${PORT}

CMD ["npm", "run", "start"]