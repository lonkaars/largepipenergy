/**
 * @name largePiPEnergy
 * @version 0.0.1
 * @author loekaars
 * @description Enables resizing the screenshare/webcam picture in picture window by scrolling
 * 
 * @website https://github.com/lonkaars
 */

module.exports = class largePiPEnergy {
	constructor() {
		this.size = 320;
		this.resizeStep = 0.3;
		this.resizeTransitionSpeed = 300;
		this.aspectRatio = [16, 9];
	}

	start() {
		BdApi.injectCSS("largePiPEnergy", [
			":root {",
			`    --largePiPEnergySize: ${this.size}`,
			"}",
			".da-pictureInPicture .da-pictureInPictureVideo {",
			`    width: calc(var(--largePiPEnergySize) * 1px);`,
			"    height: unset;",
			`    padding-bottom: calc(${this.aspectRatio[1]} / ${this.aspectRatio[0]} * 100%);`,
			`    transition: width ${this.resizeTransitionSpeed}ms;`,
			"}"
		].join("\n"));

		setInterval(() => {
			var element = document.getElementsByClassName("da-pictureInPictureWindow")[0];
			if (!element) return;
			element.onmousewheel = event => {
				this.size -= event.deltaY * this.resizeStep;
				document.documentElement.style.setProperty("--largePiPEnergySize", `${this.size}`);
				console.log(event.deltaY);
			}
		}, 1e3); // this is a crappy solution but i'll fix this tomorrow or something
	}

	stop() {
		BdApi.clearCSS("largePiPEnergy");
	}
}
