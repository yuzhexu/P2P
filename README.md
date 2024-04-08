# Node.js Chat Server

This chat server is built on Node.js, utilizing the `net` module to establish a TCP server. It is designed to handle connections from multiple clients simultaneously, supporting a simple chat application that includes user registration, broadcasting messages to all users, and sending messages directly between users (peer-to-peer).

## Features

- **Multi-client support**: The server can handle multiple client connections simultaneously.
- **User registration**: New users can register with a unique username.
- **Broadcast messages**: Users can send messages to all connected users.
- **Peer-to-peer messages**: Allows for direct messaging between users.
- **Persistent storage**: Stores user information and messages using a lightweight SQLite database.

## Modules

The server's functionality is divided into the following modules:

- **Database**: Manages interactions with the SQLite database, storing user information and messages.
- **Broadcast**: Handles the logic for sending messages to all connected users.
- **Peer-to-Peer (P2P)**: Manages direct messaging between users.
- **Signup**: Processes user registration, including adding new users to the database.
- **Config**: Contains server configuration information such as port number and host address, making it easy to manage and modify.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) must be installed on your system.
- [SQLite3](https://www.npmjs.com/package/sqlite3) for the database.

### Installation

1. Clone the repository:

`git clone https://github.com/yuzhexu/P2P.git`

2. Navigate to the project directory:

`cd P2P`

3. Install dependencies:

`npm install`

### Running the Server

Start the server by running:

`node server.js`

### Running the Client

Start the Client by running:

`node Client.js`


The server will start listening for connections on the configured port. Clients can now connect to the server using any TCP client.

## Usage

### Client Connection

Clients can connect to the server using any TCP client. Upon connection, the server will prompt for user registration. After registration, users can send broadcast or peer-to-peer messages using specific command formats described below.

### Commands

- **User Registration**: Automatically prompted upon connecting to the server.
- **Sending Broadcast Messages**: Simply type the message and press enter to broadcast it to all users.
- **Sending Peer-to-Peer Messages**: Use the format `username:message` to send a message directly to `username`.

## Configuration

Server settings such as port number and host address can be found and modified in the `config.js` file.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss proposed changes or additions.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.





