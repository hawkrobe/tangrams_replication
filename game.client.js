

//   Copyright (c) 2012 Sven "FuzzYspo0N" Bergström, 
//                   2013 Robert XD Hawkins
    
//     written by : http://underscorediscovery.com
//     written for : http://buildnewgames.com/real-time-multiplayer/
    
//     modified for collective behavior experiments on Amazon Mechanical Turk

//     MIT Licensed.


// /* 
//    THE FOLLOWING FUNCTIONS MAY NEED TO BE CHANGED
// */

// A window global for our game root variable.
var game = {};
// A window global for our id, which we can use to look ourselves up
var my_id = null;
var my_role = null;
// Keeps track of whether player is paying attention...
var visible;
var incorrect;
var dragging;
var waiting;
var upperLeftX;
var upperLeftY

client_ondisconnect = function(data) {
  // Redirect to exit survey
  console.log("server booted")
  var URL = 'http://web.stanford.edu/~rxdh/psych254/replication_project/forms/end.html?id=' + my_id;
  window.location.replace(URL);
};


/* 
 Note: If you add some new variable to your game that must be shared
 across server and client, add it both here and the server_send_update
 function in game.core.js to make sure it syncs 

 Explanation: This function is at the center of the problem of
 networking -- everybody has different INSTANCES of the game. The
 server has its own, and both players have theirs too. This can get
 confusing because the server will update a variable, and the variable
 of the same name won't change in the clients (because they have a
 different instance of it). To make sure everybody's on the same page,
 the server regularly sends news about its variables to the clients so
 that they can update their variables to reflect changes.
 */
client_onserverupdate_received = function(data){  

  // Update client versions of variables with data received from
  // server_send_update function in game.core.js
  //data refers to server information
  if(data.players) {
    _.map(_.zip(data.players, game.players),function(z){
      z[1].id = z[0].id;  
    });
  }
  
  var dataNames = _.map(data.objects, function(e)
			{ return e.name;});
  var localNames = _.map(game.objects,function(e)
			 {return e.name;});

  // If your objects are out-of-date (i.e. if there's a new round), set up
  // machinery to draw them
  if (game.objects.length == 0 || !_.isEqual(dataNames, localNames)) { 
    game.objects = _.map(data.objects, function(obj) {
      // Extract the coordinates matching your role
      var customCoords = my_role == "director" ? obj.directorCoords : obj.matcherCoords;
      // remove the directorCoords and matcherCoords properties
      var customObj = _.chain(obj)
	.omit('directorCoords', 'matcherCoords')
	.extend(obj, {trueX : customCoords.trueX, trueY : customCoords.trueY,
		      gridX : customCoords.gridX, gridY : customCoords.gridY})
	.value();
      var imgObj = new Image(); //initialize object as an image (from HTML5)
      imgObj.src = customObj.url; // tell client where to find it
      imgObj.onload = function(){ // Draw image as soon as it loads (this is a callback)
        game.ctx.drawImage(imgObj, parseInt(customObj.trueX), parseInt(customObj.trueY),
			   customObj.width, customObj.height);
      };
      return _.extend(customObj, {img: imgObj});
    });
  };

  // TODO: check if this is necessary
  // _.map(game.objects, function(obj) {
  //   var data_obj = _.find(data.objects, function(o) {return o.name == obj.name;});
  //   obj.trueX = data_obj.trueX;
  //   obj.trueY = data_obj.trueY;
  // });

  // Get rid of "waiting" screen if there are multiple players
  if(data.players.length > 1) 
    game.get_player(my_id).message = "";
  
  game.currentDestination = data.curr_dest;
  game.game_started = data.gs;
  game.players_threshold = data.pt;
  game.player_count = data.pc;
  game.roundNum = data.roundNum
  $('#roundnumber').append(game.roundNum+1);

  // Draw all this new stuff
  drawScreen(game, game.get_player(my_id));
}; 

// This is where clients parse socket.io messages from the server. If
// you want to add another event (labeled 'x', say), just add another
// case here, then call

//          this.instance.player_host.send("s.x. <data>")

// The corresponding function where the server parses messages from
// clients, look for "server_onMessage" in game.server.js.
client_onMessage = function(data) {

  var commands = data.split('.');
  var command = commands[0];
  var subcommand = commands[1] || null;
  var commanddata = commands[2] || null;

  switch(command) {
  case 's': //server message
    switch(subcommand) {    
    case 'end' :
      // Redirect to exit survey
      console.log("received end message...");
      var URL = 'http://web.stanford.edu/~rxdh/psych254/replication_project/forms/end.html?id=' + my_id;
      window.location.replace(URL); break;

    case 'alert' : // Not in database, so you can't play...
      alert('You did not enter an ID'); 
      window.location.replace('http://nodejs.org'); break;

    case 'join' : //join a game requested
      var num_players = commanddata;
      client_onjoingame(num_players, commands[3]); break;

    case 'add_player' : // New player joined... Need to add them to our list.
      console.log("adding player" + commanddata);
      if(hidden === 'hidden') {
        flashTitle("GO!");
      }
      game.players.push({id: commanddata, player: new game_player(game)}); break;

    case 'begin_game' :
      client_newgame(); break;

    }
  } 
}; 

// var sbutton = document.getElementById("submitbutton");

// When loading the page, we store references to our
// drawing canvases, and initiate a game instance.
window.onload = function(){
  //Create our game client instance.
  game = new game_core();
  
  //Connect to the socket.io server!
  client_connect_to_server(game);
  
  //Fetch the viewport
  game.viewport = document.getElementById('viewport');

  
  //Adjust its size
  game.viewport.width = game.world.width;
  game.viewport.height = game.world.height;

  //Fetch the rendering contexts
  game.ctx = game.viewport.getContext('2d');

  //Set the draw style for the font
  game.ctx.font = '11px "Helvetica"';

  //fetch the submit button (sbutton)
  // var sbutton = document.getElementById("submitbutton");

  document.getElementById('chatbox').focus();

};

client_addnewround = function(game) {
  $('#roundnumber').append(game.roundNum);
}

// Associates callback functions corresponding to different socket messages
client_connect_to_server = function(game) {
  //Store a local reference to our connection to the server
  game.socket = io.connect();

  // Tell server when client types something in the chatbox
  $('form').submit(function(){
    console.log("submitting message to server");
    var msg = 'chatMessage.' + Date.now() + '.' + $('#chatbox').val();
    if($('#chatbox').val() != '') {
      game.socket.send(msg);
      $('#chatbox').val('');
    }
    return false;   
  });



  // Update messages log when other players send chat
  game.socket.on('chatMessage', function(data){
    var otherRole = my_role === "director" ? "Matcher" : "Director";
    var source = data.user === my_id ? "You" : otherRole;
    var col = source === "You" ? "#363636" : "#707070";
    $('#messages').append($('<li style="padding: 5px 10px; background: ' + col + '">').text(source + ": " + data.msg));
    $('#messages').stop().animate({
      scrollTop: $("#messages")[0].scrollHeight
    }, 800);
  });

  console.log("submitbutton area")
  // Advance round by 1 each time matcher presses the submitbutton
  $(document).ready(function() {
    $("#submitbutton").click(function(){
      console.log("submitbutton clicked!")
      var msg = 'advanceRound';
      game.socket.send(msg);
      // $(".hide_div").hide();
    })
  });


  
  //When we connect, we are not 'connected' until we have an id
  //and are placed in a game by the server. The server sends us a message for that.
  game.socket.on('connect', function(){}.bind(game));
  //Sent when we are disconnected (network, server down, etc)
  game.socket.on('disconnect', client_ondisconnect.bind(game));
  //Sent each tick of the server simulation. This is our authoritive update
  game.socket.on('onserverupdate', client_onserverupdate_received);
  //Handle when we connect to the server, showing state and storing id's.
  game.socket.on('onconnected', client_onconnected.bind(game));
  //On message from the server, we parse the commands and send it to the handlers
  game.socket.on('message', client_onMessage.bind(game));
}; 

client_onconnected = function(data) {
  //The server responded that we are now in a game. Remember who we are
  my_id = data.id;
  game.players[0].id = my_id;
};

client_onjoingame = function(num_players, role) {
  // Need client to know how many players there are, so they can set up the appropriate data structure
  _.map(_.range(num_players - 1), function(i){
    game.players.unshift({id: null, player: new game_player(game)})});

  // Update w/ role (can only move stuff if agent)
  // $('#roundnumber').append("Hello");
  $('#header').append(role + '.');
  if(role === "director") {
    $('#instructs').append("Type instructions for the matcher to move the object in the direction of the arrow!")
  } else {
    $('#instructs').append("Click and drag objects to follow the director's instructions.")
  }


  // Only give Submit board button to agent (matcher)
  if(role === "director") {
  $('#submitbutton').remove();
  }

  // set role locally
  my_role = role;
  game.get_player(my_id).role = my_role;

  if(num_players == 1)
    game.get_player(my_id).message = 'Waiting for other player to connect...'; //why does this need to be on?

  //     set mouse-tracking event handler
  if(role === "matcher") {
    game.viewport.addEventListener("mousedown", mouseDownListener, false);
  }
};    


// Click submit button! //

  //Fetch the submit button
// sbutton = document.getElementById("submitbutton");
// if (sbutton) {
  // sbutton.addEventListener("click", submitButtonClick, false);
// }
// console.log("submitbutton!");
// sbutton.addEventListener("click", submitButtonClick, false);


// //why is it null?
// function submitButtonClick(evt){
//   // sbutton = document.getElementById('submitbutton');
//   sbutton.addEventListener("click", submitButtonClick, false);
//   var msg = 'advanceRound';
//   game.socket.send(msg);
//   // game.submitButton.removeEventListener("click", submitButtonClick, data, false);
//   console.log("client submit button!");
// }

// window.addEventListener("click", submitButtonClick, false);
/*
 MOUSE EVENT LISTENERS
 */

function mouseDownListener(evt) {
  var i;
  //We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
  //only the topmost one will be dragged.
  var highestIndex = -1;

  //getting mouse position correctly, being mindful of resizing that may have occured in the browser:
  var bRect = game.viewport.getBoundingClientRect();
  mouseX = (evt.clientX - bRect.left)*(game.viewport.width/bRect.width);
  mouseY = (evt.clientY - bRect.top)*(game.viewport.height/bRect.height);
  

  //find which shape was clicked
  for (i=0; i < game.objects.length; i++) {
    if (hitTest(game.objects[i], mouseX, mouseY)) {
      dragging = true;
      if (i > highestIndex) {
        //We will pay attention to the point on the object where the mouse is "holding" the object:
        dragHoldX = mouseX - game.objects[i].trueX;
        dragHoldY = mouseY - game.objects[i].trueY;
        highestIndex = i;
        game.dragIndex = i;
      }
    }
  }
  if (dragging) {
    window.addEventListener("mousemove", mouseMoveListener, false);

  }
  game.viewport.removeEventListener("mousedown", mouseDownListener, false);
  window.addEventListener("mouseup", mouseUpListener, false);


  //code below prevents the mouse down from having an effect on the main browser window:
  if (evt.preventDefault) {
    evt.preventDefault();
  } //standard
  else if (evt.returnValue) {
    evt.returnValue = false;
  } //older IE
  return false;
}


function mouseUpListener(evt) {    
  game.viewport.addEventListener("mousedown", mouseDownListener, false);
  window.removeEventListener("mouseup", mouseUpListener, false);
  if (dragging) {
    // Set up the right variables
    var bRect = game.viewport.getBoundingClientRect();
    var dropX = (evt.clientX - bRect.left)*(game.viewport.width/bRect.width);
    var dropY = (evt.clientY - bRect.top)*(game.viewport.height/bRect.height);
    var obj = game.objects[game.dragIndex];
    var cell = game.getCellFromPixel(dropX, dropY);
    //get info on the tangram your dragged tangram will replace (swapObj)
    var swapIndex = game.getTangramFromCell(cell[0], cell[1]);
    var swapObj =  game.objects[swapIndex];
    
    // If you didn't drag it beyond cell bounds, snap it back w/o comment
    if (obj.gridX == cell[0] && obj.gridY == cell[1]) {
      obj.trueX = game.getTrueCoords("xCoord", obj, obj);
      obj.trueY = game.getTrueCoords("yCoord", obj, obj);

    
    } 
    else {
      // move tangram in dropped cell (swapObj) to original cell of dragged tangram (obj)
      swapObj.gridX = obj.gridX;
      swapObj.gridY = obj.gridY;
      swapObj.trueX = game.getTrueCoords("xCoord", obj, swapObj);
      swapObj.trueY = game.getTrueCoords("yCoord", obj, swapObj);


      // center dragged tangram (obj) in its new cell
      obj.gridX = cell[0]
      obj.gridY = cell[1]
      obj.trueX = game.getPixelFromCell(cell[0], cell[1]).centerX - obj.width/2;
      obj.trueY = game.getPixelFromCell(cell[0], cell[1]).centerY - obj.height/2;
    }

    // Tell server where you dropped it
    drawScreen(game, game.get_player(my_id));
    dragging = false;
    window.removeEventListener("mousemove", mouseMoveListener, false);
  }


}


function mouseMoveListener(evt) {
    // console.log("I am mouseMoveListener!");
    // prevent from dragging offscreen
    var minX = 25;
    var maxX = game.viewport.width - game.objects[game.dragIndex].width - 25;
    var minY = 25;
    var maxY = game.viewport.height - game.objects[game.dragIndex].height - 25;

    //getting mouse position correctly 
    var bRect = game.viewport.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(game.viewport.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(game.viewport.height/bRect.height);

    //highlighting cell that is moused over
    cell = game.getCellFromPixel(mouseX, mouseY);
    upperLeftX = game.getPixelFromCell(cell[0], cell[1]).upperLeftX;
    upperLeftY = game.getPixelFromCell(cell[0], cell[1]).upperLeftY;
    highlightCell(game, game.get_player(my_id), upperLeftX, upperLeftY);
    drawScreen(game, game.get_player(my_id));

    // game.ctx.beginPath();
    // game.ctx.lineWidth="6";
    // game.ctx.strokeStyle="red";
    // game.ctx.rect(upperLeftX, upperLeftY,300,300); 
    // game.ctx.stroke();

    //clamp x and y positions to prevent object from dragging outside of canvas
    var posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    var posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);

    // Update object locally
    var obj = game.objects[game.dragIndex]
    obj.trueX = Math.round(posX);
    obj.trueY = Math.round(posY);

    // Draw it
    drawScreen(game, game.get_player(my_id));
}

function hitTest(shape,mx,my) {
    var dx = mx - shape.trueX;
    var dy = my - shape.trueY;
    return (0 < dx) && (dx < shape.width) && (0 < dy) && (dy < shape.height)
}

// // Automatically registers whether user has switched tabs...
(function() {
  document.hidden = hidden = "hidden";

  // Standards:
  if (hidden in document)
    document.addEventListener("visibilitychange", onchange);
  else if ((hidden = "mozHidden") in document)
    document.addEventListener("mozvisibilitychange", onchange);
  else if ((hidden = "webkitHidden") in document)
    document.addEventListener("webkitvisibilitychange", onchange);
  else if ((hidden = "msHidden") in document)
    document.addEventListener("msvisibilitychange", onchange);
  // IE 9 and lower:
  else if ('onfocusin' in document)
    document.onfocusin = document.onfocusout = onchange;
  // All others:
  else
    window.onpageshow = window.onpagehide = window.onfocus 
    = window.onblur = onchange;
})();

function onchange (evt) {
  var v = 'visible', h = 'hidden',
      evtMap = { 
        focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
      };
  evt = evt || window.event;
  if (evt.type in evtMap) {
    document.body.className = evtMap[evt.type];
  } else {
    document.body.className = evt.target.hidden ? "hidden" : "visible";
  }
  visible = document.body.className;
  game.socket.send("h." + document.body.className);
};

(function () {

  var original = document.title;
  var timeout;

  window.flashTitle = function (newMsg, howManyTimes) {
    function step() {
      document.title = (document.title == original) ? newMsg : original;
      if (visible === "hidden") {
        timeout = setTimeout(step, 500);
      } else {
        document.title = original;
      }
    };
    cancelFlashTitle(timeout);
    step();
  };

  window.cancelFlashTitle = function (timeout) {
    clearTimeout(timeout);
    document.title = original;
  };

}());
