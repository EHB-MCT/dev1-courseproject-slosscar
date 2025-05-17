//https://github.com/EHB-MCT/DEV1_Solutions_24/blob/main/demos/8-objects/ghostObjects.js line 38
//auteur: Peter Dickx
//datum: 16-05-2025
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
//https://github.com/EHB-MCT/DEV1_Solutions_24/blob/main/demos/8-objects/ghostObjects.js
//auteur: Peter Dickx
//datum: 16-05-2025
/*function setup() {
    for (let i = 0; i < 100; i++) {
        let ghost = {
            x: Utils.randomNumber(0, width),
            y: Utils.randomNumber(0, width),
            hue: Utils.randomNumber(0, 360),
        };
        ghosts.push(ghost);
    }
}*/
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
//ik heb der code van de ghost demo gebruikt om de vogels te laten bewegen maar uiteindelijk heb ik heel de code moeten transformeren
