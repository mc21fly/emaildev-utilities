class Pair {
	constructor(fontSize, lineHeight) {
		this.fontSize = fontSize;
		this.lineHeight = lineHeight;
	}

	getValuesString() {
		return `font-size: ${this.fontSize}px; line-height: ${this.lineHeight}px;`;
	}

	getCalculatedValues() {
		const lineHeightUnitless = parseFloat((this.lineHeight / this.fontSize).toFixed(2));
		const lineHeightPercent = Math.floor(((this.lineHeight / this.fontSize - 1) / 2) * 100 + 100);

		return {
			fontSize: this.fontSize,
			lineHeightPercent: lineHeightPercent,
			lineHeightUnitless: lineHeightUnitless,
		};
	}

	getCalculatedValuesString() {
		const { fontSize, lineHeightPercent, lineHeightUnitless } = this.getCalculatedValues();

		return `font-size: ${fontSize}px; line-height: ${lineHeightPercent}%; line-height: ${lineHeightUnitless}!important`;
	}
}

module.exports = Pair;
