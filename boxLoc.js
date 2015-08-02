var has_require = typeof require !== 'undefined'

if( typeof _ === 'undefined' ) {
    if( has_require ) {
        _ = require('underscore')
    }
    else throw new ('mymodule requires underscore, see http://underscorejs.org');
}

//returns names of tangrams from single round tangramlist
getNames = function(trialList) {
  return _.pluck(trialList, 'name');
}

//returns list of director [x,y] coords for each tangram (only for 1 round)
getGridLocs = function(trialList, role) {
  if (role == 'director') {
    var directorCoords = _.pluck(trialList, 'directorCoords');
    var gridX = _.pluck(directorCoords, 'gridX');
    var gridY = _.pluck(directorCoords, 'gridY');
    return _.zip(gridX, gridY);
}
  else {
    var matcherCoords = _.pluck(trialList, 'matcherCoords');
    var gridX = _.pluck(matcherCoords, 'gridX');
    var gridY = _.pluck(matcherCoords, 'gridY');
    return _.zip(gridX, gridY);
  }
};

//returns box location range(1,12) of tangram given [x,y] loc pair
boxLoc = function(loc) {
  var box = 0;
  var x = loc[0];
  var y = loc[1];
  if (y == 1) { 
    box = x; 
    return box;
  }
  else {
    box = x + 6;
    return box;
  }
};

// //returns list of boxes for each tangram 
getBoxLocs = function(trialList, role) {
  var tangramGridLocs = getGridLocs(trialList, role);
  return _.map(tangramGridLocs, function(pair) {
    return boxLoc(pair);
  });
};

//returns list of name and box for all tangrams (1 round only)
nameAndBox = function(trialList, role) {
    var boxLocs = getBoxLocs(trialList, role);
    var names = getNames(trialList);
    return _.zip(names, boxLocs);
};

// //returns list of name and box for all tangrams in all rounds
nameAndBoxAll = function(totalTrialList, role) {
  return _.map(totalTrialList, function(x) {
    return nameAndBox(x, role);
  });
};



// var trialListMulti = [[{"name":"tangram_A","directorCoords":{"gridX":4,"gridY":1,"trueX":933.95,"trueY":37.44999999999999},"matcherCoords:{"gridX":3,"gridY":2 "}],[{"name":"tangram_B","directorCoords":{"gridX":6,"gridY":2,"trueX":1557.4,"trueY":363},"matcherCoords":{"gridX":4,"gridY":1,"trueX":1557.4,"trueY":363}]];
// var trialListMultiBothPlayers = 
var trialListTest1 = [[{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":4,"gridY":1,"trueX":933.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":4,"gridY":2,"trueX":933.95,"trueY":337.45}}],[{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":6,"gridY":2,"trueX":1557.4,"trueY":363},"matcherCoords":{"gridX":2,"gridY":2,"trueX":357.4,"trueY":363}}]]
var trialListTest2 = [[{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":4,"gridY":1,"trueX":933.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":4,"gridY":2,"trueX":933.95,"trueY":337.45}},{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":6,"gridY":2,"trueX":1557.4,"trueY":363},"matcherCoords":{"gridX":2,"gridY":2,"trueX":357.4,"trueY":363}},{"url":"stimuli/tangram_C.png","name":"tangram_C","width":293.3,"height":228.9,"directorCoords":{"gridX":2,"gridY":2,"trueX":328.35,"trueY":360.55},"matcherCoords":{"gridX":4,"gridY":1,"trueX":928.35,"trueY":60.55}},{"url":"stimuli/tangram_D.png","name":"tangram_D","width":189,"height":271.6,"directorCoords":{"gridX":3,"gridY":2,"trueX":680.5,"trueY":339.2},"matcherCoords":{"gridX":1,"gridY":1,"trueX":80.5,"trueY":39.19999999999999}},{"url":"stimuli/tangram_E.png","name":"tangram_E","width":204.5,"height":250,"directorCoords":{"gridX":1,"gridY":2,"trueX":72.75,"trueY":350},"matcherCoords":{"gridX":2,"gridY":1,"trueX":372.75,"trueY":50}},{"url":"stimuli/tangram_F.png","name":"tangram_F","width":261.8,"height":219.8,"directorCoords":{"gridX":1,"gridY":1,"trueX":44.099999999999994,"trueY":65.1},"matcherCoords":{"gridX":5,"gridY":1,"trueX":1244.1,"trueY":65.1}},{"url":"stimuli/tangram_G.png","name":"tangram_G","width":284.9,"height":237.3,"directorCoords":{"gridX":5,"gridY":1,"trueX":1232.55,"trueY":56.349999999999994},"matcherCoords":{"gridX":6,"gridY":1,"trueX":1532.55,"trueY":56.349999999999994}},{"url":"stimuli/tangram_H.png","name":"tangram_H","width":175,"height":273.7,"directorCoords":{"gridX":6,"gridY":1,"trueX":1587.5,"trueY":38.150000000000006},"matcherCoords":{"gridX":6,"gridY":2,"trueX":1587.5,"trueY":338.15}},{"url":"stimuli/tangram_I.png","name":"tangram_I","width":222.5,"height":247,"directorCoords":{"gridX":3,"gridY":1,"trueX":663.75,"trueY":51.5},"matcherCoords":{"gridX":5,"gridY":2,"trueX":1263.75,"trueY":351.5}},{"url":"stimuli/tangram_J.png","name":"tangram_J","width":151.8,"height":249.2,"directorCoords":{"gridX":2,"gridY":1,"trueX":399.1,"trueY":50.400000000000006},"matcherCoords":{"gridX":3,"gridY":2,"trueX":699.1,"trueY":350.4}},{"url":"stimuli/tangram_K.png","name":"tangram_K","width":184.8,"height":280,"directorCoords":{"gridX":4,"gridY":2,"trueX":982.6,"trueY":335},"matcherCoords":{"gridX":3,"gridY":1,"trueX":682.6,"trueY":35}},{"url":"stimuli/tangram_L.png","name":"tangram_L","width":182.7,"height":280.7,"directorCoords":{"gridX":5,"gridY":2,"trueX":1283.65,"trueY":334.65},"matcherCoords":{"gridX":1,"gridY":2,"trueX":83.65,"trueY":334.65}}],[{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":6,"gridY":1,"trueX":1533.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":4,"gridY":2,"trueX":933.95,"trueY":337.45}},{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":6,"gridY":2,"trueX":1557.4,"trueY":363},"matcherCoords":{"gridX":1,"gridY":1,"trueX":57.400000000000006,"trueY":63}},{"url":"stimuli/tangram_C.png","name":"tangram_C","width":293.3,"height":228.9,"directorCoords":{"gridX":4,"gridY":2,"trueX":928.35,"trueY":360.55},"matcherCoords":{"gridX":2,"gridY":2,"trueX":328.35,"trueY":360.55}},{"url":"stimuli/tangram_D.png","name":"tangram_D","width":189,"height":271.6,"directorCoords":{"gridX":3,"gridY":2,"trueX":680.5,"trueY":339.2},"matcherCoords":{"gridX":5,"gridY":2,"trueX":1280.5,"trueY":339.2}},{"url":"stimuli/tangram_E.png","name":"tangram_E","width":204.5,"height":250,"directorCoords":{"gridX":3,"gridY":1,"trueX":672.75,"trueY":50},"matcherCoords":{"gridX":4,"gridY":1,"trueX":972.75,"trueY":50}},{"url":"stimuli/tangram_F.png","name":"tangram_F","width":261.8,"height":219.8,"directorCoords":{"gridX":2,"gridY":2,"trueX":344.1,"trueY":365.1},"matcherCoords":{"gridX":3,"gridY":2,"trueX":644.1,"trueY":365.1}},{"url":"stimuli/tangram_G.png","name":"tangram_G","width":284.9,"height":237.3,"directorCoords":{"gridX":1,"gridY":1,"trueX":32.55000000000001,"trueY":56.349999999999994},"matcherCoords":{"gridX":3,"gridY":1,"trueX":632.55,"trueY":56.349999999999994}},{"url":"stimuli/tangram_H.png","name":"tangram_H","width":175,"height":273.7,"directorCoords":{"gridX":2,"gridY":1,"trueX":387.5,"trueY":38.150000000000006},"matcherCoords":{"gridX":6,"gridY":1,"trueX":1587.5,"trueY":38.150000000000006}},{"url":"stimuli/tangram_I.png","name":"tangram_I","width":222.5,"height":247,"directorCoords":{"gridX":1,"gridY":2,"trueX":63.75,"trueY":351.5},"matcherCoords":{"gridX":5,"gridY":1,"trueX":1263.75,"trueY":51.5}},{"url":"stimuli/tangram_J.png","name":"tangram_J","width":151.8,"height":249.2,"directorCoords":{"gridX":4,"gridY":1,"trueX":999.1,"trueY":50.400000000000006},"matcherCoords":{"gridX":6,"gridY":2,"trueX":1599.1,"trueY":350.4}},{"url":"stimuli/tangram_K.png","name":"tangram_K","width":184.8,"height":280,"directorCoords":{"gridX":5,"gridY":2,"trueX":1282.6,"trueY":335},"matcherCoords":{"gridX":1,"gridY":2,"trueX":82.6,"trueY":335}},{"url":"stimuli/tangram_L.png","name":"tangram_L","width":182.7,"height":280.7,"directorCoords":{"gridX":5,"gridY":1,"trueX":1283.65,"trueY":34.650000000000006},"matcherCoords":{"gridX":2,"gridY":1,"trueX":383.65,"trueY":34.650000000000006}}],[{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":2,"gridY":1,"trueX":333.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":6,"gridY":1,"trueX":1533.95,"trueY":37.44999999999999}},{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":1,"gridY":1,"trueX":57.400000000000006,"trueY":63},"matcherCoords":{"gridX":1,"gridY":2,"trueX":57.400000000000006,"trueY":363}},{"url":"stimuli/tangram_C.png","name":"tangram_C","width":293.3,"height":228.9,"directorCoords":{"gridX":3,"gridY":1,"trueX":628.35,"trueY":60.55},"matcherCoords":{"gridX":6,"gridY":2,"trueX":1528.35,"trueY":360.55}},{"url":"stimuli/tangram_D.png","name":"tangram_D","width":189,"height":271.6,"directorCoords":{"gridX":5,"gridY":1,"trueX":1280.5,"trueY":39.19999999999999},"matcherCoords":{"gridX":3,"gridY":2,"trueX":680.5,"trueY":339.2}},{"url":"stimuli/tangram_E.png","name":"tangram_E","width":204.5,"height":250,"directorCoords":{"gridX":5,"gridY":2,"trueX":1272.75,"trueY":350},"matcherCoords":{"gridX":2,"gridY":1,"trueX":372.75,"trueY":50}},{"url":"stimuli/tangram_F.png","name":"tangram_F","width":261.8,"height":219.8,"directorCoords":{"gridX":4,"gridY":2,"trueX":944.1,"trueY":365.1},"matcherCoords":{"gridX":2,"gridY":2,"trueX":344.1,"trueY":365.1}},{"url":"stimuli/tangram_G.png","name":"tangram_G","width":284.9,"height":237.3,"directorCoords":{"gridX":3,"gridY":2,"trueX":632.55,"trueY":356.35},"matcherCoords":{"gridX":5,"gridY":2,"trueX":1232.55,"trueY":356.35}},{"url":"stimuli/tangram_H.png","name":"tangram_H","width":175,"height":273.7,"directorCoords":{"gridX":6,"gridY":2,"trueX":1587.5,"trueY":338.15},"matcherCoords":{"gridX":1,"gridY":1,"trueX":87.5,"trueY":38.150000000000006}},{"url":"stimuli/tangram_I.png","name":"tangram_I","width":222.5,"height":247,"directorCoords":{"gridX":4,"gridY":1,"trueX":963.75,"trueY":51.5},"matcherCoords":{"gridX":3,"gridY":1,"trueX":663.75,"trueY":51.5}},{"url":"stimuli/tangram_J.png","name":"tangram_J","width":151.8,"height":249.2,"directorCoords":{"gridX":2,"gridY":2,"trueX":399.1,"trueY":350.4},"matcherCoords":{"gridX":4,"gridY":2,"trueX":999.1,"trueY":350.4}},{"url":"stimuli/tangram_K.png","name":"tangram_K","width":184.8,"height":280,"directorCoords":{"gridX":6,"gridY":1,"trueX":1582.6,"trueY":35},"matcherCoords":{"gridX":5,"gridY":1,"trueX":1282.6,"trueY":35}},{"url":"stimuli/tangram_L.png","name":"tangram_L","width":182.7,"height":280.7,"directorCoords":{"gridX":1,"gridY":2,"trueX":83.65,"trueY":334.65},"matcherCoords":{"gridX":4,"gridY":1,"trueX":983.65,"trueY":34.650000000000006}}],[{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":5,"gridY":1,"trueX":1233.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":4,"gridY":1,"trueX":933.95,"trueY":37.44999999999999}},{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":3,"gridY":1,"trueX":657.4,"trueY":63},"matcherCoords":{"gridX":5,"gridY":2,"trueX":1257.4,"trueY":363}},{"url":"stimuli/tangram_C.png","name":"tangram_C","width":293.3,"height":228.9,"directorCoords":{"gridX":6,"gridY":1,"trueX":1528.35,"trueY":60.55},"matcherCoords":{"gridX":3,"gridY":1,"trueX":628.35,"trueY":60.55}},{"url":"stimuli/tangram_D.png","name":"tangram_D","width":189,"height":271.6,"directorCoords":{"gridX":6,"gridY":2,"trueX":1580.5,"trueY":339.2},"matcherCoords":{"gridX":1,"gridY":1,"trueX":80.5,"trueY":39.19999999999999}},{"url":"stimuli/tangram_E.png","name":"tangram_E","width":204.5,"height":250,"directorCoords":{"gridX":2,"gridY":1,"trueX":372.75,"trueY":50},"matcherCoords":{"gridX":1,"gridY":2,"trueX":72.75,"trueY":350}},{"url":"stimuli/tangram_F.png","name":"tangram_F","width":261.8,"height":219.8,"directorCoords":{"gridX":3,"gridY":2,"trueX":644.1,"trueY":365.1},"matcherCoords":{"gridX":2,"gridY":2,"trueX":344.1,"trueY":365.1}},{"url":"stimuli/tangram_G.png","name":"tangram_G","width":284.9,"height":237.3,"directorCoords":{"gridX":4,"gridY":1,"trueX":932.55,"trueY":56.349999999999994},"matcherCoords":{"gridX":2,"gridY":1,"trueX":332.55,"trueY":56.349999999999994}},{"url":"stimuli/tangram_H.png","name":"tangram_H","width":175,"height":273.7,"directorCoords":{"gridX":1,"gridY":1,"trueX":87.5,"trueY":38.150000000000006},"matcherCoords":{"gridX":5,"gridY":1,"trueX":1287.5,"trueY":38.150000000000006}},{"url":"stimuli/tangram_I.png","name":"tangram_I","width":222.5,"height":247,"directorCoords":{"gridX":1,"gridY":2,"trueX":63.75,"trueY":351.5},"matcherCoords":{"gridX":6,"gridY":2,"trueX":1563.75,"trueY":351.5}},{"url":"stimuli/tangram_J.png","name":"tangram_J","width":151.8,"height":249.2,"directorCoords":{"gridX":5,"gridY":2,"trueX":1299.1,"trueY":350.4},"matcherCoords":{"gridX":3,"gridY":2,"trueX":699.1,"trueY":350.4}},{"url":"stimuli/tangram_K.png","name":"tangram_K","width":184.8,"height":280,"directorCoords":{"gridX":4,"gridY":2,"trueX":982.6,"trueY":335},"matcherCoords":{"gridX":6,"gridY":1,"trueX":1582.6,"trueY":35}},{"url":"stimuli/tangram_L.png","name":"tangram_L","width":182.7,"height":280.7,"directorCoords":{"gridX":2,"gridY":2,"trueX":383.65,"trueY":334.65},"matcherCoords":{"gridX":4,"gridY":2,"trueX":983.65,"trueY":334.65}}]]
var trialListTestMedium = [{"url":"stimuli/tangram_A.png","name":"tangram_A","width":282.1,"height":275.1,"directorCoords":{"gridX":4,"gridY":1,"trueX":933.95,"trueY":37.44999999999999},"matcherCoords":{"gridX":4,"gridY":2,"trueX":933.95,"trueY":337.45}},{"url":"stimuli/tangram_B.png","name":"tangram_B","width":235.2,"height":224,"directorCoords":{"gridX":6,"gridY":2,"trueX":1557.4,"trueY":363},"matcherCoords":{"gridX":2,"gridY":2,"trueX":357.4,"trueY":363}},{"url":"stimuli/tangram_C.png","name":"tangram_C","width":293.3,"height":228.9,"directorCoords":{"gridX":2,"gridY":2,"trueX":328.35,"trueY":360.55},"matcherCoords":{"gridX":4,"gridY":1,"trueX":928.35,"trueY":60.55}},{"url":"stimuli/tangram_D.png","name":"tangram_D","width":189,"height":271.6,"directorCoords":{"gridX":3,"gridY":2,"trueX":680.5,"trueY":339.2},"matcherCoords":{"gridX":1,"gridY":1,"trueX":80.5,"trueY":39.19999999999999}},{"url":"stimuli/tangram_E.png","name":"tangram_E","width":204.5,"height":250,"directorCoords":{"gridX":1,"gridY":2,"trueX":72.75,"trueY":350},"matcherCoords":{"gridX":2,"gridY":1,"trueX":372.75,"trueY":50}},{"url":"stimuli/tangram_F.png","name":"tangram_F","width":261.8,"height":219.8,"directorCoords":{"gridX":1,"gridY":1,"trueX":44.099999999999994,"trueY":65.1},"matcherCoords":{"gridX":5,"gridY":1,"trueX":1244.1,"trueY":65.1}},{"url":"stimuli/tangram_G.png","name":"tangram_G","width":284.9,"height":237.3,"directorCoords":{"gridX":5,"gridY":1,"trueX":1232.55,"trueY":56.349999999999994},"matcherCoords":{"gridX":6,"gridY":1,"trueX":1532.55,"trueY":56.349999999999994}},{"url":"stimuli/tangram_H.png","name":"tangram_H","width":175,"height":273.7,"directorCoords":{"gridX":6,"gridY":1,"trueX":1587.5,"trueY":38.150000000000006},"matcherCoords":{"gridX":6,"gridY":2,"trueX":1587.5,"trueY":338.15}},{"url":"stimuli/tangram_I.png","name":"tangram_I","width":222.5,"height":247,"directorCoords":{"gridX":3,"gridY":1,"trueX":663.75,"trueY":51.5},"matcherCoords":{"gridX":5,"gridY":2,"trueX":1263.75,"trueY":351.5}},{"url":"stimuli/tangram_J.png","name":"tangram_J","width":151.8,"height":249.2,"directorCoords":{"gridX":2,"gridY":1,"trueX":399.1,"trueY":50.400000000000006},"matcherCoords":{"gridX":3,"gridY":2,"trueX":699.1,"trueY":350.4}},{"url":"stimuli/tangram_K.png","name":"tangram_K","width":184.8,"height":280,"directorCoords":{"gridX":4,"gridY":2,"trueX":982.6,"trueY":335},"matcherCoords":{"gridX":3,"gridY":1,"trueX":682.6,"trueY":35}},{"url":"stimuli/tangram_L.png","name":"tangram_L","width":182.7,"height":280.7,"directorCoords":{"gridX":5,"gridY":2,"trueX":1283.65,"trueY":334.65},"matcherCoords":{"gridX":1,"gridY":2,"trueX":83.65,"trueY":334.65}}]
// console.log(getDirectorBoxLocs(trialListTest));
// console.log(nameAndBoxAll(trialListTest2));
console.log(nameAndBoxAll((trialListTest1), 'director'));



  

