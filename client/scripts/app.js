var app = {
  'friendList': {}
};

app.init = function(){
  console.log("running");
  var context = this;
  setInterval(function() {
    context.fetch();
  },1000);
};


app.send = function(message){
  $.ajax({
    type: 'POST',
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
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
    url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
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

app.loadMessages = function(results) {
  for (var i=0; i<results.length; i++) {
    var username = results[i]['username'];
    var text = results[i]['text'];
    var room = results[i]['roomname'];

    var newMsg = $('<li/>');
    var user = $('<div/>')
      .text(username)
      .addClass('username');

    if (this.friendList[username]) {
      user.css('font-weight','bold');
    } else {
      user.attr('onclick','app.addFriend(this)');
    }

    var msgBody = $('<div/>').text(text);

    user.appendTo(newMsg);
    msgBody.appendTo(newMsg);
    newMsg.appendTo('#chats');
  }
};

app.addRoom = function(room){
  var newRoom = $('<li/>').appendTo('#roomSelect');
};

app.addFriend = function(target){
  var user = $(target).text();
  this.friendList[user] = true;
  var newFriend = $('<li/>')
    .html(user)
    .appendTo('#friendList');
  $(target).attr('onclick','');
};

app.handleSubmit = function(input){
  alert($(input).val());
  var message = {
    'username': "tim adrian",
    'text': $(input).val(),
    'roomname': "lobby"
  };
  this.send(message);
  $('#newChat').val('');
};

app.init();
