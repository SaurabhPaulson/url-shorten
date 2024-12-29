# Base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Expose the application port
EXPOSE 4000

# Run the application
CMD ["npm", "start"]
