var net = require("net");
var config = require("./config");
var broadcast = require("./broadcast");
var p2p = require("./p2p");
var signup = require("./signup");
// Creates an empty object to log socket connections for online users
var users = {};
var server = net.createServer();
server.on("connection", function(socket) {
    socket.on("data", function(data) {
        data = JSON.parse(data);
        switch (data.mstype) {
            case "signup":

                signup.signup(socket, data, users);
                break;
            case "broadcast":
                broadcast.broadcast(data, users);
                break;
            case "p2p":
                p2p.p2p(socket, data, users);
                break;
            default:
                break;
        }
    });
    // When the client connection is interrupted
    socket.on("error", function() {
        console.log("A client exited abnormally.");
    });
});
server.listen(config.port, config.host, function() {
    console.log("The server is Listening on port" + config.port);
});

