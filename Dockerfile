# Stage 1: Build Frontend
FROM node:18-alpine as build

WORKDIR /app

# Copy only necessary files for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy application files
COPY . .

# Build app
RUN yarn run build


# Stage 2: Serve Frontend
FROM nginx:stable-alpine

# Use a more descriptive name for the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port and set the default command
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
