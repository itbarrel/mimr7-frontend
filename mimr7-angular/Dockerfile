FROM node:14 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build
# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/mimr7-angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80