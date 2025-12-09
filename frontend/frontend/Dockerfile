# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build React app
RUN npm run build

# Production stage (serve static files)
FROM nginx:alpine

# Copy build output to nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80

# No CMD required (nginx already has one)
