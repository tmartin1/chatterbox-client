// Set default url for $.ajax calls to https://api.parse.com/1/classes/chatterbox
$.ajaxSetup({
  url: 'https://api.parse.com/1/classes/chatterbox'
});

// Fetches messages from the server.
var getMessages = function() {
  $.ajax({
    type: 'GET',
    url: 'https://api.parse.com/1/classes/users',
    data: 'data',
    contentType: 'application/json',
    success: function (data) {
      displayMessages(data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to retrieve messages');
    }
  });
};

// Displays messages retrieved from server.
var displayMessages = function(data) {
  console.log(data);
  // for (var obj in data) {
  //  console.log(data[obj]);
  // }
};

// Refreshes messages based on time interval.
var refreshRate = 3000;
setInterval(function() {
  getMessages();
},refreshRate);


// Allows users to post messages to the server.
// Messages must be in the following format:
//    var message = {
//      'username': 'shawndrost',
//      'text': 'trololo',
//      'roomname': '4chan'
//    };
/*
$.ajax({
  // always use this url
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
*/
