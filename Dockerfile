### STAGE 1: Build ###
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:ngssc

### STAGE 2: Run ###
FROM nginx:1.23-alpine

# Install ngssc binary
ADD https://github.com/kyubisation/angular-server-side-configuration/releases/download/v15.0.2/ngssc_64bit /usr/sbin/ngssc
RUN chmod +x /usr/sbin/ngssc

# Add ngssc init script
COPY ngssc.sh /docker-entrypoint.d/ngssc.sh
RUN chmod +x /docker-entrypoint.d/ngssc.sh

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/home-automation /usr/share/nginx/html