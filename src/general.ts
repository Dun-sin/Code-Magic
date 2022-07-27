import domtoimage from 'dom-to-image';
import copy from 'copy-to-clipboard';

/**
 * @function copyCodeToClipboard
 * @summary Allows you to copy to clipboard
 * @param {string} attribute - The attribute name of the generator element
 * @param {HTMLElement} outputElement - Element to copy the element from
 * @return {void} Nothing
 */
export function copyCodeToClipboard(
	attribute: string,
	outputElement: HTMLElement,
): void {
	const copyCodeButton = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-code]`)
	);
	copyCodeButton.addEventListener('click', (): void => {
		actOnGenerator();
	});

	function actOnGenerator() {
		let codeToCopy: string = '';
		switch (attribute) {
			case 'pic-text':
				codeToCopy = `
      div {
        background-position: ${outputElement.style.backgroundPosition};
        background-size: ${outputElement.style.backgroundSize};
        background-repeat: ${outputElement.style.backgroundRepeat};
        background-clip: ${outputElement.style.backgroundClip};
        -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
        -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
      }
    `;
				break;
			case 'gradient-text':
				codeToCopy = `
        p{
          ${outputElement.children[0].attributes[0].value}
        }
        `;

				break;
		}
		copy(codeToCopy);
	}
}

/**
 * @function countForText
 * @summary Counts the number of text in the input element
 * @param inputElement {HTMLInputElement} - The input element that holds the text
 * @return {void} Nothing
 */
export function countForText(inputElement: HTMLInputElement): void {
	const countElement = <HTMLElement>document.querySelector('.count > span');
	inputElement.addEventListener('keydown', (): void => {
		countElement.innerText = `${inputElement.value.length + 1}`;
	});
}

/**
 * @function downloadPNG
 * @summary Download the element in image type extension of png
 * @param outputImage {HTMLElement} - element to convert to an image
 * @return {void} Nothing
 */
export function downloadPNG(attribute: string, outputImage: HTMLElement): void {
	domtoimage.toPng(outputImage, { quality: 0.95 }).then((dataUrl) => {
		const link = createDownloadLink(`${attribute}.png`, dataUrl);
		link.click();
	});
}

/**
 * @function downloadSVG
 * @summary Download the element in image type extension of svg
 * @param outputImage {HTMLElement} - element to convert to an svg
 * @return {void} Nothing
 */
export function downloadSVG(attribute: string, outputImage: HTMLElement): void {
	domtoimage.toSvg(outputImage).then((dataUrl) => {
		const link = createDownloadLink(`${attribute}.svg`, dataUrl);
		link.click();
	});
}

/**
 * @function getCopyCodeButton
 * @summary Get the button element for copying code to clipboard
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export function getCopyCodeButton(attribute: string): HTMLElement {
	const buttonElement = <HTMLElement>(
		document.querySelector(`[data-download = ${attribute}-code]`)
	);

	return buttonElement;
}

/**
 * @function getPNGButton
 * @summary Get the button element for downloading in image form
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export function getPNGButton(attribute: string): HTMLElement {
	const getDownloadPNG = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-PNG]`)
	);

	return getDownloadPNG;
}

/**
 * @function getSVGButton
 * @summary Get the button element for downloading in svg format
 * @param attribute {string} - The attribute name of the generator element
 * @return {HTMLElement} The type of the button Element
 */
export function getSVGButton(attribute: string): HTMLElement {
	const getDownloadSVG = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-svg]`)
	);

	return getDownloadSVG;
}

function createDownloadLink(fileName: string, url: string) {
	const link = document.createElement('a');
	link.download = fileName;
	link.href = url;
	return link;
}
