// //returns the box number of a tangram given it's x,y location on the grid
game_core.prototype.getBoxLoc = function(loc) {
  var box = 0;
  if (loc[1] == 1) { 
    console.log("y val is: " + loc[1] );
    boxLoc = loc[0]; //
    return boxLoc;
  }
  else {
    boxLoc = loc[0] + 6;
    return boxLoc;
  }
};

//given a list of tangram grid locations, returns a list of box locations
boxLocList = function(locList) {
  return _.map(locList, function(x) {
    boxLoc = getBoxLoc(x);
    return boxLoc;
  });
};

