Steps:
1. Create a basic express node app and serve a static public folder
1. Include sockets on index.js (SERVER) and public/app.js (CLIENT)
1. In the CLIENT,[ add inputs so that user can enter room name and user name and submit](https://github.com/MathuraMG/Pictionary-sockets/blob/master/public/index.html#L10). Once they submit, emit a "JoinRoom" message to the SERVER with the user name and room name.
1. In the SERVER, [on receiving "JoinRoom"](https://github.com/MathuraMG/Pictionary-sockets/blob/master/index.js#L24), add the room and username details to the socket, add the socket to the room.
1. [Also add the roomname to an object rooms](https://github.com/MathuraMG/Pictionary-sockets/blob/master/index.js#L24). Set the value of room[roomName] = {"leader": null}. This object will be user later if your game needs one person in the room to have a special LEADER role.
1. Emit a message "joinedRoom" to all the CLIENTS in that room.
1. In the CLIENT, [on receiving "joinedRoom](https://github.com/MathuraMG/Pictionary-sockets/blob/master/public/app.js#L23), hide the input on the webpage, and show the room details
1. Once the room details are shown, also show a checkbox that will allow the user to have the LEADER role in the game
1. Once any CLIENT from the room checks the box, [emit a message "leaderSet"](https://github.com/MathuraMG/Pictionary-sockets/blob/master/public/app.js#L36) to the SERVER
1. [On receiving "leaderSet"](https://github.com/MathuraMG/Pictionary-sockets/blob/master/index.js#L42) the SERVER emits a message "leaderSet" to all the clients in the room, *except* the one which emitted "leaderSet" in the first place. This message will let all the other clients know that they are only participating in the game, and can't be the game leader.
1. On the CLIENT end, [on receiving "leaderSet"](https://github.com/MathuraMG/Pictionary-sockets/blob/master/public/app.js#L43), we can change the UI for other participants and remove the leader check box for them. NOTE: this will only ensure that users cannot select the checkbox anymore. We can add an additional layer of scrutiny on the server side, that will check if there is already a leader before assigning one.


Things to think about:
1. What happens when the leader leaves the game?
1. What happens when a new player joins the room after the room leader has been set?
