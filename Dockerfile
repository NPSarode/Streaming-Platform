# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose the port Vite runs on (default is 3000)
EXPOSE 3000

# Set the environment variable for Vite's host
ENV VITE_PORT=3000ode 

# Run the development server
CMD ["npm", "run", "dev", "--", "--host"]
