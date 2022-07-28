import * as utils from '../general';

/**
 * @function gradientTextGenerator
 * @summary handles functionality of the gradient text generator
 * @param attribute - The attribute name of the generator element
 * @return {void} Nothing
 */
export function gradientTextGenerator(): void {
	const attribute = 'gradient-text';
	const getInputElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-text`)
	);
	const getOutputElement = utils.getOutput(attribute);
	getOutputElement.style.display = 'grid';
	getOutputElement.style.height = 'fit-content';
	getOutputElement.style.placeItems = 'center';

	const getTextButtonElement = utils.getResultButton(attribute);

	getTextButtonElement?.addEventListener('click', () => {
		if (getInputElement.value.length === 0) return;

		getGradientTextResult(attribute, getInputElement.value, getOutputElement);
		getInputElement.value = '';
	});
}

/**
 * @function getGradientTextResult
 * @summary creates the text, adds styling and shows the new text
 * @param {string} text - Text to add the gradient
 * @param {HTMLElement} outputElement - Elements that shows the result
 * @return {void} nothing
 */
function getGradientTextResult(
	attribute: string,
	text: string,
	outputElement: HTMLElement,
): void {
	const createTextElement = () => {
		const wordElement = document.createElement('p');
		wordElement.innerText = text;
		wordElement.style.fontSize = '2rem';
		wordElement.style.background =
			'linear-gradient(to bottom, rgb(119, 118, 248) 50%, rgb(94, 238, 94))';
		wordElement.style.webkitBackgroundClip = 'text';
		wordElement.style.backgroundClip = 'text';
		wordElement.style.webkitTextFillColor = 'transparent';
		outputElement.appendChild(wordElement);
	};

	const getCodeButtonElement = utils.getCopyCodeButton(attribute);
	const getPNGButtonElement = utils.getPNGButton(attribute);
	const getSVGButtonElement = utils.getSVGButton(attribute);

	if (outputElement.childElementCount >= 1) {
		outputElement.innerHTML = '';
		createTextElement();
	} else {
		createTextElement();
	}

	getPNGButtonElement.addEventListener('click', () => {
		utils.downloadPNG(attribute, outputElement);
	});

	getSVGButtonElement.addEventListener('click', () => {
		utils.downloadSVG(attribute, outputElement);
	});

	getCodeButtonElement.addEventListener('click', () => {
		utils.copyCodeToClipboard(attribute, outputElement);
	});
}
