# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "serve"]
EXPOSE 3000