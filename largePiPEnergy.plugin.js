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
	}

	start() {
		BdApi.injectCSS("largePiPEnergy", [
			":root {",
			`    --largePiPEnergySize: ${this.size}`,
			"}",
			".da-pictureInPicture .da-pictureInPictureVideo {",
			`    width: calc(var(--largePiPEnergySize) * 1px);`,
			"    height: unset;",
			"    padding-bottom: 56.25%;",
			"    transition: width .3s;",
			"}"
		].join("\n"))

		setInterval(() => {
			var element = document.getElementsByClassName("da-pictureInPictureWindow")[0];
			if (!element) return;
			element.onmousewheel = event => {
				this.size -= event.deltaY / 3;
				document.documentElement.style.setProperty("--largePiPEnergySize", `${this.size}`)
				console.log(event.deltaY)
			}
		}, 1e3); // this is a crappy solution but i'll fix this tomorrow or something
	}

	stop() {
		BdApi.clearCSS("largePiPEnergy")
	}
}
