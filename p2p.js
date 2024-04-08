const db = require('./database.js');

exports.p2p = function(socket, data, users) {
    var from = data.from;
    var to = data.to;
    var message = data.message; 

    // Check if the recipient exists
    var receiver = users[to];
    if (!receiver) {
        var send = {
            mstype: "p2p",
            code: 2001,
            message: "User " + to + " does not exist."
        };
        // Sends a message to the sender informing the receiver that it does not exist
        socket.write(JSON.stringify(send));
    } else {
        // Constructing the content of messages saved to the database
        var fullMessage = from + " to " + to + ": " + message;

        // Save peer-to-peer messages to the database
        db.run(`INSERT INTO messages(username, message) VALUES(?, ?)`, [from, fullMessage], function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`A p2p message has been inserted with rowid ${this.lastID}`);
        });

        var send = {
            mstype: "p2p",
            code: 2000,
            message: from + " to you: " + message
        };
        // Sending a message to a recipient
        receiver.write(JSON.stringify(send));

    }
};
