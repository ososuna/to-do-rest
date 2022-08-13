FROM node:16
ENV MOGODB_URI=mongodb://host.docker.internal:27017/to-do
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/app.js"]