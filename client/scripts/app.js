var app = {
  'friendList': {}
};

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
    url: 'https://api.parse.com/1/classes/chatterbox',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  var context = this;
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/chatterbox',
    data: 'data',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Messages recieved');
      context.clearMessages();
      context.loadMessages(data['results']);
    },
    error: function (data) {
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
  for (var i=0; i<results.length; i++) {
    var username = results[i]['username'];
    var text = results[i]['text'];
    var room = results[i]['roomname'];

    var newMsg = $('<li/>');
    var user = $('<div/>')
      .html(username)
      .addClass('username');

    if (this.friendList[username]) {
      user.css('font-weight','bold');
    } else {
      user.attr('onclick','app.addFriend(this)');
    }

    var msgBody = $('<div/>').html(text);

    user.appendTo(newMsg);
    msgBody.appendTo(newMsg);
    newMsg.appendTo('#chats');
  }
};

app.refreshMessages = function() {
  this.fetch();
  console.log('refreshing');
};

app.addRoom = function(room){
  var newRoom = $('<li/>').appendTo('#roomSelect');
};

app.addFriend = function(target){
  console.log(target);
  var user = $(target).text();
  this.friendList[user] = true;
  console.log(user);
  console.log(this.friendList);
  var newFriend = $('<li/>')
    .html(user)
    .appendTo('#friendList');
};

// $('.username').on('click', funciton(){
//   app.addFriend(this.val());
// });

app.handleSubmit = function(){

};

app.init();
