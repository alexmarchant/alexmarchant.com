FROM node:lts

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]