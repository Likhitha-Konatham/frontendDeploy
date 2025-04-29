# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /frontend-app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your app will run on
EXPOSE 7004

# Serve the React app using a simple HTTP server
# It is lightweight HTTP server and is perfect for serving static sites
RUN npm install -g serve

# Set the CMD to run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "7004"]


