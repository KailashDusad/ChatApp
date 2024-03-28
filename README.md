## Live Now on: https://chat-app-vc9l.onrender.com/
# ChatApp

ChatApp is a real-time chat application built with Node.js, Express, and Socket.IO. It uses Pug and CSS for the frontend and JavaScript for the backend.

## Features

- Real-time communication: Users can send and receive messages in real-time.
- User authentication: Users can create an account and log in.
- Responsive design: The application is responsive and works well on both desktop and mobile devices.

## Getting Started

To get started with the ChatApp, follow these steps:

1. Clone the repository:
  ```sh
  git clone <repository-url>
  ```
2. Navigate to the project directory:
  ```sh
  cd chatapp
  ```
3. Install the dependencies:
  ```sh
  npm install
  ```
4. Start the server:
  ```sh
  node index.js 
  ```
or
```sh
  nodemon index.js 
  ```

The application will be running at `http://localhost:5001`.


#### Remember to chage the cors origin to your local IP

## File Structure

- `app.js`: The entry point of the application.
- `socket/index.js`: Contains the server-side logic for the chat application.
- `socket/static/js/client.js`: Contains the client-side logic for the chat application.
- `socket/static/pug/`: Contains the Pug templates for the application views.
- `socket/static/style/`: Contains the CSS files for styling the application.

## Contributing

Contributions are welcome! Please read the contributing guidelines first.
