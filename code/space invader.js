"use strict";
import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";
let width = context.canvas.width;
let height = context.canvas.height;

drawSignature();

function drawSignature() {
	let x = 100;
	let y = 100;

	Utils.drawRect(x, y, 300, 300, "black");
	Utils.drawRect(x + 75, y + 25, 50, 50, "#339988");
	Utils.drawRect(x + 25, y + 25, 50, 50, "#339988");
	Utils.drawRect(x + 75, y + 75, 50, 50, "#339988");
	Utils.drawRect(x + 75, y + 125, 50, 50, "#339988");
	Utils.drawRect(x + 175, y + 25, 50, 50, "#339988");
	Utils.drawRect(x + 175, y + 75, 50, 50, "#339988");
	Utils.drawRect(x + 125, y + 75, 50, 50, "#339988");
	Utils.drawRect(x + 125, y + 175, 50, 50, "#339988");
	Utils.drawRect(x + 25, y + 225, 50, 50, "#339988");
	Utils.drawRect(x + 125, y + 225, 50, 50, "#339988");
	Utils.drawRect(x + 225, y + 225, 50, 50, "#339988");
	Utils.drawRect(x + 25, y + 125, 50, 50, "#339988");
	Utils.drawRect(x + 225, y + 125, 50, 50, "#339988");
	Utils.drawRect(x + 225, y + 25, 50, 50, "#339988");
	Utils.drawRect(x + 175, y + 125, 50, 50, "#339988");
}
