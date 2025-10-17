FROM node:20 AS build
WORKDIR /app

# Copy all project files
COPY . .

# Install all dependencies
RUN npm ci

# Build frontend
RUN npm run build   # Vite will use root: "frontend"

# Runtime image
FROM node:20
WORKDIR /app

# Copy everything from build stage
COPY --from=build /app ./

EXPOSE 3000
CMD ["npm", "start"]
