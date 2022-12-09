FROM node:14

# Set or create one if it does not exist 

WORKDIR /app

COPY package.json  /app

# Bypass NPM SSL

RUN npm config set strict-ssl false

# Install NPM packages for the

RUN npm i


# Copy project files to the current working directory specified above

COPY . /app


# Expose this port from the running container so that the running app is available outside the container
# This is the same port that was set in our application

EXPOSE 80

# Command to run in the container, that is why we use CMD not RUN

CMD ["node", "server.js"]