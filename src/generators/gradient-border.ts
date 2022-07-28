import * as utils from '../general';

type Colors = {
	firstColor: string;
	secondColor: string;
};

export function gradientBorderGenerator(): void {
	const attribute = 'gradient-border';
	const color1 = utils.getColorInput1(attribute);
	const color2 = utils.getColorInput2(attribute);
	const getResultButtonElement = utils.getResultButton(attribute);
	const getOutputElement = utils.getOutput(attribute);

	getResultButtonElement.addEventListener('click', () => {
		const colors = {
			firstColor: color1.value,
			secondColor: color2.value,
		};
		getGradientBorderResult(colors, getOutputElement);
	});
}

function getGradientBorderResult(
	colors: Colors,
	outputElement: HTMLElement,
): void {
	outputElement.style.border = 'solid';
	outputElement.style.borderWidth = '5px';
	outputElement.style.borderImageSlice = '1';
	outputElement.style.borderImageSource = `linear-gradient(100deg, ${colors.firstColor}, ${colors.secondColor})`;
}
