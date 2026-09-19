# Online Interview Preparation Platform

This project is an Online Interview Preparation Platform designed to help users prepare for interviews through various resources and tools.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using React and Vite. It includes the following key files:

- **index.html**: The main HTML entry point for the client application.
- **package.json**: Contains metadata about the client application, including dependencies and scripts.
- **vite.config.js**: Configuration file for Vite, specifying build options and server settings.
- **src/**: Contains the source code for the React application, including components, pages, services, hooks, styles, and utilities.

### Server

The server is built using Node.js and Express. It includes the following key files:

- **package.json**: Contains metadata about the server application, including dependencies and scripts.
- **.env.example**: Provides an example of environment variables needed for the server application.
- **src/**: Contains the source code for the server application, including the main entry point, app configuration, database configuration, controllers, routes, models, middleware, and utilities.

## Features

- User authentication and authorization
- Interview question bank
- Mock interview scheduling
- Performance tracking and analytics
- Resource sharing and community support

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd online-interview-platform
   ```

3. Install dependencies for the client:
   ```
   cd client
   npm install
   ```

4. Install dependencies for the server:
   ```
   cd ../server
   npm install
   ```

5. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

6. Start the server:
   ```
   npm start
   ```

7. Start the client:
   ```
   cd ../client
   npm run dev
   ```

## Usage

Once both the client and server are running, you can access the application in your web browser at `http://localhost:3000` (or the port specified in your server configuration).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.