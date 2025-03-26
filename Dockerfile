# Stage 1: Build Frontend
FROM node:18-alpine as build

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies and build in a single layer to reduce image size
RUN apk add --no-cache python3 make g++ && \
        yarn install && \
        yarn run build && \
        apk del python3 make g++

# Copy appe files
COPY . .

FROM nginx:stable-alpine

# Use a more descriptive name for the Nginx configuration
COPY ngnix.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port and set the default command
EXPOSE 3003

CMD ["nginx", "-g", "daemon off;"]
