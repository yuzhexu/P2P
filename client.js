var net =require("net");
//Import the config module in the same directory to get 
//the address and port number of the chat room.
var config=require("./config");
//Creates a TCP connection to the chat room server 
var client=net.createConnection({
    port:config.port,
    host:config.host,
});
var username;
client.on("connect",function(){
    console.log("Please input User Name");
   
    process.stdin.on("data",function(data){
    	//Converts user input to a string
        data=data.toString().trim();
        if(!username){
            var send={
                mstype:"signup",
                username:data
            };
            client.write(JSON.stringify(send));
            return;
        }
        //Define a regular expression
        var regex=/(.{1,18}):(.+)/;
        //Match user input 
        var matches=regex.exec(data);
        //if macthed
        if(matches){
            var from=username;
            var to=matches[1];
            var message=matches[2];
            var send={
                mstype: "p2p",
                from:username,
                to:to,
                message:message
            };
            client.write(JSON.stringify(send));
        }else{
            var send={
                mstype:"broadcast",
                from:username,
                message:data,
            };
            client.write(JSON.stringify(send));
        }
    });
});
//Executes a callback function when the client receives data from the server
client.on("data",function (data) {
    data=JSON.parse(data);
    switch(data.mstype){
        case "signup":
            var code=data.code;
            switch(code){
                case 1000:
                    username=data.username;
                    console.log(data.message);
                    break;
                case 1001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
        case "broadcast":
            console.log(data.message);
            break;
        case "p2p":
            var code=data.code;
            switch(code){
                case 2000:
                    console.log(data.message);
                    break;
                case 2001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});
client.on("err",function () {
    console.log("Chat Room Closed");
})
