var has_require = typeof require !== 'undefined'

if( typeof _ === 'undefined' ) {
    if( has_require ) {
        _ = require('underscore')
    }
    else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

// //returns the box number of a tangram given it's x,y location on the grid
getBoxLoc = function(loc) {
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

getNames = function(trialList) {
  return _.map(trialList, function(x) {
    var name = trialList[x].name;
    return name;
  });
};

getDirectorLocs = function(trialList) {
  return _.map(trialList, function(x) {
    var directorLocs = trialList[x][4];
    return directorLocs;
    });
  };

getMatcherLocs = function(trialList) {
  return _.map(trialList, function(x) {
    var matcherLocs = trialList[x][5];
    return matcherLocs;
  });
}

makeNameBoxList = function(trialList) {
  var directorGridLocs = getDirectorLocs(trialList);
  var directorBoxLocs = boxLocList(directorGridLocs);
  var directorTangramNames = getNames(trialList);
  _.map(directorTangramNames, function(x) {
    _.map(directorBoxLocs, function(y) {
      _.zip(x, y) 
  });
  });
};

var trialListTest = [ { url: 'stimuli/tangram_A.png',
      name: 'tangram_A',
      width: 282.1,
      height: 275.1,
      directorCoords: [Object],
      matcherCoords: [Object] },
    { url: 'stimuli/tangram_B.png',
      name: 'tangram_B',
      width: 235.2,
      height: 224,
      directorCoords: [Object],
      matcherCoords: [Object] } ];

// console.log(trialListTest);
console.log(trialListTest[1].name);
// console.log(getNames(trialListTest));

