var app = {
  'friendList': {},
  'chatrooms': {},
  'currentuser': undefined
};

app.init = function(){
  this.fetch();
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
  this.send(message);
  this.fetch();
};

app.loadMessages = function(results) {
  for (var i=0; i<results.length; i++) {
    var username = results[i]['username'];
    var text = results[i]['text'];
    var room = results[i]['roomname'];
    this.addRoom(room);

    var newMsg = $('<li/>');
    var user = $('<div/>')
      .text(username)
      .addClass('username');

    if (this.friendList[username]) {
      user.css('font-weight','bold');
    } else {
      user.attr('onclick','app.addFriend(this)');
    }

    var msgBody = $('<div/>').text(text).addClass('msgText');

    user.appendTo(newMsg);
    msgBody.appendTo(newMsg);
    newMsg.appendTo('#chats');
  }
};

app.addRoom = function(room){
  if(this.chatrooms[room] === undefined) {
    this.chatrooms[room] = true;
    var newRoom = $('<option/>').text(room).appendTo('#roomSelect');
  }
  this.sortElements('#roomSelect', 'option');
};

app.addFriend = function(target){
  var user = $(target).text();
  this.friendList[user] = true;
  var newFriend = $('<li/>')
    .html(user)
    .appendTo('#friendList');
  $(target).attr('onclick','');
  this.sortElements('#friendList', 'li');
};

app.sortElements = function(target, type) {
  var targetOptions = $(target+" "+type);
  var selected = $(target).val();
  if (type==='li') selected = $(target).innerText;

  targetOptions.sort(function(a,b) {
    var atext = (type==='option' ? a.text : a.innerText).toLowerCase();
    var btext = (type==='option' ? b.text : b.innerText).toLowerCase();
    if (atext > btext) return 1;
    else if (atext < btext) return -1;
    else return 0
  });

  $(target).empty().append(targetOptions);
  $(target).val(selected);
};

app.handleSubmit = function(input){
  var message = {
    'username': document.URL.split('username=')[1],
    'text': $(input).val(),
    'roomname': $('#roomSelect').val()
  };
  this.send(message);
  $('#newChat').val('');
};

app.init();



