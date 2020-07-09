//node server which will handle socket io connections
//socket.io is http instance which connect to it
const io = require("socket.io")(8000)

const users ={};
//io.on is socket instance
io.on('connection',socket=>{
    //socket.on is accepting an event means if he recieves a particular event he will run the provided callback
    //if any new user joins,let other users connected to the server know!
    socket.on('new-user-joined',name=>{
        console.log("New User",name)
        users[socket.id] = name;
        //brodcast.emit emit to all the users except the one who has committed the event
        socket.broadcast.emit('user-joined',name)

    });
    //new-user-joined and send are our arguments we can replace it with any other name
    //if someone send the messae broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    });

    //when someone lleave the chat let others know!!
    //disconnect is built-in 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });

    
});

