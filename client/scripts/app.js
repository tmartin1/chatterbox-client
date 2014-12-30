var app = {};

app.init = function(){
  console.log("running");
  var context = this;
  setInterval(function() {
    context.refreshMessages();
  },1000);
};

$('#newChat').keypress(function(key){
  if(key.witch === 13){
    var message = {
      'username': "",
      'text': this.val(),
      'roomname': ""
    };
    this.send(message);
  }
});

app.send = function(message){
  $.ajax({
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  console.log('running fetch');
  $.ajax({
    type: 'GET',
    data: 'data',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages recieved');
      // this.loadMessages(data['results']);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to recieve messages');
    }
  });
};

app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  // send message to server
  // refresh message display
  this.send(message);
  this.fetch();
};

// populates $('#chats') with most recent messages
app.loadMessages = function(results) {
  // call app.fetch and store as array
  // iterate through array from above
    // display username with class 'username'
      // if username is on friendList, display in bold
      // else onclick=addFriend(this)
    // display chat
  console.log(results);
  for (var i=0; i<results.length; i++) {
    var username = results[i].username;
    var text = results[i].text;
    var room = results[i].roomname;

    var newMsg = $('<li/>');
    var user = $('<div/>')
      .val(username)
      .addClass('username');
    user.attr('onclick',addFriend(username));

    var msgBody = $('<div/>').addClass('msgBody');

    user.appendTo(newMsg);
    msgBody.appendTo(newMsg);
    newMsg.appendTo('#chats');
  }
};

app.refreshMessages = function() {
  this.clearMessages();
  this.fetch();
  console.log('refreshing');
};

app.addRoom = function(room){
  var newRoom = $('<li/>').appendTo('#roomSelect');
};

app.addFriend = function(user){
  var newFriend = $('<li/>')
    .val(user)
    .appendTo('#friendList');
};

// $('.username').on('click', funciton(){
//   app.addFriend(this.val());
// });

app.handleSubmit = function(){

};
