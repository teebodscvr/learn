FROM node:14

WORKDIR /app

COPY package.json .

RUN npm config set strict-ssl false && npm install 


COPY . .

# Expose port for which our Node server is running at. Open this port for container so that it is accessible to the (public?)
EXPOSE 3000 


CMD ["node", "app.mjs"]