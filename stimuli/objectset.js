// Indexed by object set ID

// TANGRAM OBJECTS
var tangramA = {
	url: 'stimuli/tangram_A.png', name: "tangram_A", width: 246, height: 311.4}
var tangramB = {
	url: 'stimuli/tangram_B.png', name: "tangram_B", width : 264, height: 307.8}
var tangramC = {
	url: 'stimuli/tangram_C.png', name: "tangram_C", width: 287.4, height: 297,}
var tangramD = {
	url: 'stimuli/tangram_D.png', name: "tangram_D", width: 247.2, height: 305.4}
var tangramE = {
	url: 'stimuli/tangram_E.png', name: 'tangram_E', width: 268.2, height: 310.8}
var tangramF = {
	url: 'stimuli/tangram_F.png', name: 'tangram_F', width: 292.2, height: 283.2}
var tangramG = {
	url: 'stimuli/tangram_G.png', name: 'tangram_G', width: 291, height: 296.4}
var tangramH = {
	url: 'stimuli/tangram_H.png', name: 'tangram_H', width: 245.4, height: 310.8}
var tangramI = {
	url: 'stimuli/tangram_I.png', name: 'tangram_I', width: 283.2, height: 318}
var tangramJ = {
	url: 'stimuli/tangram_J.png', name: 'tangram_J', width: 250.2, height: 311.4}
var tangramK = {
	url: 'stimuli/tangram_K.png', name: 'tangram_K', width: 262.8, height: 310.2}
var tangramL = {
	url: 'stimuli/tangram_L.png', name: 'tangram_L', width: 278.4, height: 331.2}

var tangramList = [
	tangramA, tangramB, tangramC, tangramD, tangramE, tangramF, 
	tangramG, tangramH, tangramI, tangramJ, tangramK, tangramL
]

module.exports = tangramList;


// var tangramA = {
// 	url: 'stimuli/tangram_A.png', name: "tangram_A", width: 410, height: 519}
// var tangramB = {
// 	url: 'stimuli/tangram_B.png', name: "tangram_B", width : 440, height: 513}
// var tangramC = {
// 	url: 'stimuli/tangram_C.png', name: "tangram_C", width: 479, height: 495,}
// var tangramD = {
// 	url: 'stimuli/tangram_D.png', name: "tangram_D", width: 412, height: 509}
// var tangramE = {
// 	url: 'stimuli/tangram_E.png', name: 'tangram_E', width: 447, height: 518}
// var tangramF = {
// 	url: 'stimuli/tangram_F.png', name: 'tangram_F', width: 487, height: 472}
// var tangramG = {
// 	url: 'stimuli/tangram_G.png', name: 'tangram_G', width: 485, height: 494}
// var tangramH = {
// 	url: 'stimuli/tangram_H.png', name: 'tangram_H', width: 409, height: 518}
// var tangramI = {
// 	url: 'stimuli/tangram_I.png', name: 'tangram_I', width: 472, height: 530}
// var tangramJ = {
// 	url: 'stimuli/tangram_J.png', name: 'tangram_J', width: 417, height: 519}
// var tangramK = {
// 	url: 'stimuli/tangram_K.png', name: 'tangram_K', width: 438, height: 517}
// var tangramL = {
// 	url: 'stimuli/tangram_L.png', name: 'tangram_L', width: 464, height: 552}




// var criticalItems = [
// 	{
// 		instructions: [airplane.instruction, sunGlasses.instruction, 
// 		               barrel.instruction, saxophone.instruction],
// 		criticalInstruction: "sunGlasses",
// 		objectSet: 1,
// 		target: sunGlasses,
// 		distractor: glassesCase,
// 		alt: soccerBall,
// 		otherObjects: [saxophone, airplane, barrel, watch]
// 	},{
// 		instructions: [binoculars.instruction, wrench.instruction, 
// 		               middleBlock.instruction, coffeeMug.instruction],
// 		criticalInstruction: "middleBlock",
// 		objectSet: 2,
// 		target: middleBlock,
// 		distractor: bottomBlock,
// 		alt: stapler,
// 		otherObjects: [binoculars, wrench, topBlock, coffeeMug]
// 	},{
// 		instructions: [scissors.instruction, knife.instruction,
// 		                barOfSoap.instruction, cassetteTape.instruction],
// 		criticalInstruction: "cassetteTape",
// 		objectSet: 3,
// 		target: cassetteTape,
// 		distractor: rollOfTape,
// 		alt: battery,
// 		otherObjects: [scissors, butterfly, barOfSoap, knife]
// 	},{
// 		instructions: [carrot.instruction, mediumMeasuringCup.instruction,
// 		               waterBottle.instruction, chair.instruction],
// 		criticalInstruction: "mediumMeasuringCup",
// 		objectSet: 4,
// 		target: mediumMeasuringCup,
// 		distractor: largeMeasuringCup,
// 		alt: umbrella,
// 		otherObjects: [chair, smallMeasuringCup, carrot, waterBottle]
// 	},{
// 		instructions: [basketball.instruction, roundBrush.instruction, headphones.instruction, 
// 		                book.instruction], 
// 		criticalInstruction: "roundBrush",
// 		target: roundBrush,
// 		objectSet: 5,
// 		distractor: hairBrush,
// 		alt: skate,
// 		otherObjects: [basketball, dalmatian, headphones, book, ring]
// 	},{
// 		instructions: [banana.instruction, dollar.instruction, 
// 		               boardEraser.instruction, feather.instruction], 		
// 		criticalInstruction: "boardEraser",
// 		objectSet: 6,
// 		target: boardEraser,
// 		distractor: pencilEraser,
// 		alt: brain,
// 		otherObjects: [dollar, feather, tennisBall, banana]
// 	},{
// 		instructions: [magnet.instruction, handcuffs.instruction, 
// 		               pandaToy.instruction, mediumCandle.instruction], 
// 		criticalInstruction: "mediumCandle",
// 		objectSet: 7,
// 		target: mediumCandle,
// 		distractor: smallCandle,
// 		alt: flower,
// 		otherObjects: [pandaToy, largeCandle, handcuffs, magnet]
// 	},{
// 		instructions: [comb.instruction, computerMouse.instruction, 
// 		               castIronPan.instruction, piano.instruction], 
// 		criticalInstruction: "computerMouse",
// 		objectSet: 8,
// 		target: computerMouse,
// 		distractor: toyMouse,
// 		alt: camera,
// 		otherObjects: [piano , comb, key, castIronPan]
// }]





