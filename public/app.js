let socket = io();
let roomName;
window.addEventListener('load', function () {
  socket.on('connect', ()=> {
    console.log('socket connected');
  })

  //on clicking "Join Room" button, send a "joinRoom" message to the server
  // this message will container the room name and the user name
  document.getElementById('room-button').addEventListener('click', () => {
    let roomName = document.getElementById('room-input').value;
    let userName = document.getElementById('user-input').value;
    console.log(roomName);
    socket.emit('joinRoom', {
      'roomName': roomName,
      'userName': userName
    })
  })

  // once a new user has joined the same room as you OR once you have joined the roomName
  // you will receive a "joinedRoom"message from the server
  //change the UI to reflect the room contents
  socket.on('joinedRoom', (data)=> {
    console.log( data.name + " has joined the room");
    roomName = data.room;
    hideInput();
    displayRoom();
  })

  // on pressing the "leader" checkbox, send a message to the server letting it know
  // that THIS room has a leader
  // also when that is turned off, inform the server
  document.getElementById('leader-checkbox').addEventListener('change', ()=> {
    if(document.getElementById('leader-checkbox').checked) {
      console.log('emit leader set')
      socket.emit('leaderSet');
      setDrawBoard();
    }
  })

  //on receiving "leaderSet", we can change the UI for other participants
  // and remove the leader check box for them.
  socket.on("leaderSet", ()=> {
    console.log("leader has been set. its not me :( ");
    hideLeaderCheckbox();
    startGame();
  })

})



/** UTIL UI FUNCTIONS **/
function hideInput() {
  document.getElementById('input-container').style.display = 'none';
}

function displayRoom() {
  document.getElementById('room-container').style.display = 'block';
  document.getElementById('room-name').innerHTML = roomName;
}

function hideLeaderCheckbox() {
  document.getElementById('leader-checkbox').style.display = 'none';
}

function setDrawBoard() {

}

function startGame() {

}
