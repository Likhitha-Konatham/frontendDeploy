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

# Expose the port that your app will run on (default for React is 3000, but you're mapping it to 7004)
EXPOSE 7004

# Serve the React app using a simple HTTP server
# You can use a lightweight HTTP server like serve to serve the build directory
RUN npm install -g serve

# Set the CMD to run the app using 'serve'
CMD ["serve", "-s", "build", "-l", "7004"]


