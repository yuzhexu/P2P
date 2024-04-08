const db = require('./database.js');

exports.signup = function(socket, data, users) {
    var username = data.username;

    db.run(`INSERT INTO users(username) VALUES(?)`, [username], function(err) {
        if (err) {
            var send = {
                mstype: "signup",
                code: 1001,
                message: "The user name has been taken, please re-enter a new user name:"
            };
            socket.write(JSON.stringify(send));
        } else {
            users[username] = socket;
            var send = {
                mstype: "signup",
                code: 1000,
                username: username,
                message: "Successful registration"
            };
            socket.write(JSON.stringify(send));
        }
    });
};


