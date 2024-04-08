const db = require('./database.js');

exports.broadcast = function(data, users) {
    var from = data.from;
    var message = data.message;
    message = from + " said: " + message;

    // Save the broadcast message to the database
    db.run(`INSERT INTO messages(username, message) VALUES(?, ?)`, [from, message], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A message has been inserted with rowid ${this.lastID}`);
    });

    var send = {
        mstype: "broadcast",
        message: message
    };
    // Convert the message object into a binary stream (Buffer).
    send = Buffer.from(JSON.stringify(send));
    for (var username in users) {
        if (username != from) {
            users[username].write(send);
        }
    }
};

