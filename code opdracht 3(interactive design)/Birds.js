"use strict";
import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";
let width = context.canvas.width;
let height = context.canvas.height;
let birds = [];
let moveUp = true;
let moveRight = true;
let clouds = [];
let bigClouds = [
	{ x: width * 0.1, y: height * 0.25, size: 90 },
	{ x: width * 0.6, y: height * 0.35, size: 100 },
	{ x: width * 0.8, y: height * 0.8, size: 130 },
	{ x: width * 0.2, y: height * 0.6, size: 120 },
];
setup();
update();
context.canvas.addEventListener("mousemove", function (event) {
	let rect = context.canvas.getBoundingClientRect();
	let mouseX = event.clientX - rect.left; // Positie van de muis ten opzichte van het canvas
	let mouseY = event.clientY - rect.top; // Positie van de muis ten opzichte van het canvas

	moveRight = mouseX > width / 2;
	moveUp = mouseY < height / 2;
});
function setup() {
	for (let i = 0; i < 400; i++) {
		//400 vogels (zelfde code als de ghost demo)
		let bird = {
			x: Utils.randomNumber(0, width), // Random x-coördinaat
			y: Utils.randomNumber(0, width), // Random y-coördinaat
		};
		birds.push(bird);
	}
}
for (let i = 0; i < 50; i++) {
	clouds.push({
		x: Utils.randomNumber(60, width - 60), // Random x-coördinaat
		y: Utils.randomNumber(60, height - 60), // Random y-coördinaat
		size: Utils.randomNumber(10, 60), // willekeurige grootte van kleine wolken
	});
}
function update() {
	context.fillStyle = "lightblue";
	context.fillRect(0, 0, width, height);
	// Draw normal clouds
	for (let i = 0; i < clouds.length; i++) {
		let c = clouds[i];
		drawCloud(c.x, c.y, c.size);
	}
	// Draw normal clouds and move them left
	for (let i = 0; i < clouds.length; i++) {
		let c = clouds[i];
		c.x -= 1; // Move left by 1 pixel per frame
		if (c.x + c.size < 0) {
			c.x = width + c.size; // Respawn at the right
		}
		drawCloud(c.x, c.y, c.size);
	}

	// Teken de vogels
	for (let i = 0; i < birds.length; i++) {
		let bird = birds[i];

		//rechts boven
		if (moveUp && moveRight) {
			// Als de muis rechtsboven is
			bird.x += Utils.randomNumber(0, 7); // Beweeg naar rechts
			bird.y -= Utils.randomNumber(0, 7); // Beweeg naar boven
		}
		//rechts onder
		else if (!moveUp && moveRight) {
			// Als de muis rechtsonder is
			bird.x += Utils.randomNumber(0, 7); // Beweeg naar rechts
			bird.y += Utils.randomNumber(0, 7); // Beweeg naar beneden
		}
		//links onder
		else if (!moveUp && !moveRight) {
			// Als de muis linksonder is
			bird.x -= Utils.randomNumber(0, 7); // Beweeg naar links
			bird.y += Utils.randomNumber(0, 7); // Beweeg naar beneden
		}
		//links boven
		else if (moveUp && !moveRight) {
			// Als de muis linkerboven is
			bird.x -= Utils.randomNumber(0, 7); // Beweeg naar links
			bird.y -= Utils.randomNumber(0, 7); // Beweeg naar boven
		}

		if (bird.x > width) bird.x = 0; // Als de vogel buiten het scherm is
		if (bird.y > height) bird.y = 0; // Als de vogel buiten het scherm is
		if (bird.y < 0) bird.y = height; // Als de vogel buiten het scherm is
		if (bird.x < 0) bird.x = width; // Als de vogel buiten het scherm is
		drawBird(bird.x, bird.y, bird.hue); // Teken de vogel aan de omgekeerde kant van het scherm
	}
	drawName();
	context.globalAlpha = 0.8; // maak grote wolken doorzichtig
	for (let i = 0; i < bigClouds.length; i++) {
		let c = bigClouds[i];
		c.x -= 1.8; // Grote wolken bewegen sneller dan kleine wolken
		if (c.x + c.size < 0) {
			// Als de grote wolk buiten het scherm is
			c.x = width + c.size; // Respawn aan de rechterkant
		}
		drawCloud(c.x, c.y, c.size);
	}
	context.globalAlpha = 1; // Reset doorzichtigheid
	drawSignature();
	requestAnimationFrame(update);
}
function drawCloud(x, y, size) {
	//Standaard template voor elke wolk
	context.fillStyle = "white";
	context.beginPath();
	context.arc(x, y, size, 0, Math.PI * 2); // Midden
	context.arc(x + size, y + size * 0.25, size * 0.8, 0, Math.PI * 2); // Rechts
	context.arc(x - size, y + size * 0.3, size * 0.8, 0, Math.PI * 2); // Links
	context.arc(x + size * 0.6, y - size * 0.5, size * 0.6, 0, Math.PI * 2); // Boven rechts
	context.arc(x - size * 0.4, y - size * 0.6, size * 0.6, 0, Math.PI * 2); // Boven links
	context.closePath();
	context.fill();
}
function drawBird(x, y) {
	//minimalistische vogel
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(x, y);
	context.lineTo(x + 20, y + 10);
	context.lineTo(x + 20, y - 10);
	context.lineTo(x + 20, y);
	context.lineTo(x + 10, y + 10);
	context.fill();
}
function drawName() {
	// naam in het midden van het scherm
	context.font = "bold 60px Arial";
	context.textAlign = "center";
	context.fillStyle = "#227799";
	context.fillText("OSCAR SLOSSE", width / 2, height / 2);
}
function drawSignature() {
	// handtekening opdracht 1 onderaan het scherm
	let x = width - 80;
	let y = height - 80;
	let sX = 0.2;
	let sY = 0.2;
	Utils.drawRect(x + sX, y + sY, sX * 300, sY * 300, "black");
	Utils.drawRect(x + sX * 25, y + sY * 25, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 75, y + sY * 25, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 75, y + sY * 75, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 75, y + sY * 125, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 175, y + sY * 25, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 175, y + sY * 75, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 125, y + sY * 75, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 125, y + sY * 175, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 25, y + sY * 225, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 125, y + sY * 225, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 225, y + sY * 225, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 25, y + sY * 125, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 225, y + sY * 125, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 225, y + sY * 25, sX * 50, sY * 50, "#339988");
	Utils.drawRect(x + sX * 175, y + sY * 125, sX * 50, sY * 50, "#339988");
}
