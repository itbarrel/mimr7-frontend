# Use an official Node runtime as a parent image
FROM node:18.12.1 as build

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build 

# Use an official nginx image as a parent image
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx container
COPY --from=build /app/dist/spire /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx when the container starts
# CMD ["nginx", "-g", "daemon off;"]
