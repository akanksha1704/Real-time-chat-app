const socket = io('http://localhost:8000');


//get DOM elements in their respective js variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

//audio that will paly on receiving messages
var audio = new Audio('pling.mp3');

//function which will append event info to the conatainer
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position== 'left'){
    audio.play();
    }
}


//ask new user for his/her name and let the server know
const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

//if a new user joins , receive the name from the server
socket.on("user-joined",name=>{

    append(`${name} joined the chat`, 'right');


});

//if server sends a message receive it
socket.on("recieve",data=>{

    append(`${data.name}: ${data.message}`, 'left');


});

//if the user leaves the chat, append  the info to the container
socket.on("left",data=>{

    append(`${name} left the chat`, 'right');

});

//if the form get submitted send server the message
form.addEventListener('submit',(e)=>{
    //preventdefault help to avoid reloading of page automatically
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`, 'right');
    socket.emit("send", message);
    messageInput.value = '';
});
