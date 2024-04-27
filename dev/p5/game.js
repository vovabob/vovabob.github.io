// --------------------
// /projects/p5/game.js
// --------------------

var guessItem = null;
var solution = null;

// frequency of generating a new "item"
var interval = 100;

function setup() {
	createCanvas(600, 400);
}

function draw() {
	background(220);
	if (frameCount === 1 || frameCount % interval === 0) {
		solution = null;
		guessItem = new GuessItem(width/2, height/2, 1);
	}
	
	if (guessItem) {
		guessItem.render();
	}
	
	if (solution === true) {
		background(255);
	} else if (solution == false) {
		background(0);
	}
}

// The key event handler in p5js:
// ------------------------------
// Check if key matches to "item" and, if so, set global "solution" to that value
function keyPressed() {
	if (guessItem !== null) {
		console.log("You pressed: ", key);
		solution = guessItem.solve(key);
		console.log(solution);
		guessItem = null;
	} else {
		console.log("Nothing to be solved.");
	}
	
}

// GuessItem class
function GuessItem(x, y, scl) {
	this.x = x;
	this.y = y;
	this.scale = scl;
	this.scaleIncrement = 0.5;
	this.alpha = 255;
	this.alphaDecrement = 3;
	this.solved = null;
	
	this.content = getContent();
	
	// generate a random INT between 0 and 9
	function getContent() {
		return parseInt(random(10), 10);
	}
	
	// check if "input" equals to "content"
	this.solve = function(input) {
		var solved;
		if (input === this.content) {
			solved = true;
		} else {
			solved = false;
		}
		this.solved = solved;
		return solved;
	}
	
	// display the "content" property of the GuessItem objects
	this.render = function() {
		// push & pop: always together!
		// save & restore drawing style settings of the object
		push();
		
		if (this.solved === false) {return;}
		
		fill(0, this.alpha);
		textAlign(CENTER, CENTER);
		translate(this.x, this.y);
		scale(this.scale);
		text(this.content, 0, 0);
		// Update "scale" and "alpha" to use in the next "render" call
		this.scale += this.scaleIncrement;
		this.alpha -= this.alphaDecrement;
		pop();
		
	}
	
}
