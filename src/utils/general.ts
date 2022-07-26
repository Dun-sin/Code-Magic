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

export function downloadJPG(outputImage: HTMLElement): void {
	domtoimage.toJpeg(outputImage, { quality: 0.95 }).then((dataUrl) => {
		const link = createDownloadLink('pic-text.jpeg', dataUrl);
		link.click();
	});
}

export function downloadSVG(outputImage: HTMLElement): void {
	domtoimage.toSvg(outputImage).then((dataUrl) => {
		const link = createDownloadLink('pic-text.svg', dataUrl);
		link.click();
	});
}

export function getCopyCodeButton(attribute: string): HTMLElement {
	const buttonElement = <HTMLElement>(
		document.querySelector(`[data-download = ${attribute}-code]`)
	);

	return buttonElement;
}

export function getJPGButton(attribute: string): HTMLElement {
	const getDownloadJPG = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-jpg]`)
	);

	return getDownloadJPG;
}

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
