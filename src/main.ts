import domtoimage from 'dom-to-image';
import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';

// File Pond Plugins
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

FilePond.registerPlugin(
	FilePondPluginImagePreview,
	FilePondPluginImageResize,
	FilePondPluginImageTransform
);

/**
 * All Variables
 */
let attributeValue: string | null = null;
let isOpen: boolean;
// File Pond Element & Options
let imageSRC: string;
// Elements
const generators = document.querySelectorAll('[data-gen]');
const closeModalElement = document.getElementById('close-modal');
const modalContainerElement = <HTMLElement>(
	document.querySelector('.modal-container')
);

/**
 * All types
 */
type Display = 'grid' | 'flex' | 'none';

// Close button for modals
closeModalElement?.addEventListener('click', (): void => {
	isOpen = false;

	isVisible(isOpen);

	const getImageEntryElement = <HTMLInputElement>(
		document.getElementById(`pic-text-file`)
	);
	getImageEntryElement.setAttribute('value', '');
	getImageEntryElement.setAttribute('src', '');
	FilePond.destroy(getImageEntryElement);

	if (attributeValue === null) return;
	removeOrAddGeneratorContent(attributeValue, 'none');
});

// adding an event listeners to all generators card
generators.forEach(generator => {
	generator?.addEventListener('click', (): void => {
		isOpen = true;
		isVisible(isOpen);
		const checking = generator.getAttribute('data-gen');
		if (checking === null) return;

		attributeValue = checking;
		checkingIfGeneratorExists(attributeValue);
	});
});

/**
 * @function checkingIfGeneratorExists
 * @summary Check if the attribute value exists
 * @param {string | null} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function checkingIfGeneratorExists(attribute: string | null): void {
	if (attribute === null) return;

	generatorsFunction(attribute);
	getImageFile(attribute);
	downloadImage(attribute);
	changeHeaderText(attribute);
}

/**
 * @function changeHeaderText
 * @summary Change the header text of the generator based on the attribute value
 * @param {string} attribute - The attribute name of the generator element
 * @return {void} nothing
 */
function changeHeaderText(attribute: string): void {
	const modalHeaderTextElement = <HTMLElement>(
		document.getElementById('heading-text-modal')
	);

	attribute = attribute.charAt(0).toUpperCase() + attribute.slice(1);
	modalHeaderTextElement.innerText = `${attribute} Generator`;
}

/**
 * @function isVisible
 * @summary uses the value of isOpen to change the visibility of the modal
 * @param isOpen {boolean} - the variable for if the modal is open or closed
 * @return {void} nothing
 */
function isVisible(isOpen: boolean): void {
	if (isOpen) {
		modalContainerElement.style.display = 'grid';
	} else {
		modalContainerElement.style.display = 'none';
	}
}

/**
 * @function generatorsFunction
 * @summary a function with the collection of functions for generators
 * @param {string} attribute - The attribute name of the generator element
 */
function generatorsFunction(attribute: string): void {
	removeOrAddGeneratorContent(attribute, 'flex');
	switch (attribute) {
		case 'pic-text':
			picTextGenerator(attribute);
			break;
		case 'gradient-text':
			gradientTextGenerator(attribute);
			break;
	}
}

/**
 * @function removeOrAddGeneratorContent
 * @summary use to toggle visibilty of content in generators
 * @param {string} attribute - The attribute name of the generator element
 * @param {Display} display - display type
 * @return {void} Nothing
 */
function removeOrAddGeneratorContent(
	attribute: string,
	display: Display,
): void {
	const generator = <HTMLElement>(
		document.querySelector(`[data-modal = ${attribute}]`)
	);
	generator.style.display = `${display}`;
}

/**
 * @function picTextGenerator
 * @summary function for all the functions of the pic-text generator
 * @param attribute - The attribute name of the generator element
 * @return {void} Nothing
 */
function picTextGenerator(attribute: string): void {
	const getTextInputElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-text`)
	);

	const getOutputElement = <HTMLElement>(
		document.querySelector(`[data-modal=${attribute}]  .output`)
	);

	countForText(getTextInputElement);
	getPicTextResult(attribute, getOutputElement, getTextInputElement.value);
}

/**
 * @function gradientTextGenerator
 * @summary handles functionality of the gradient text generator
 * @param attribute - The attribute name of the generator element
 * @return {void} Nothing
 */
function gradientTextGenerator(attribute: string): void {
	const getInputElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-text`)
	);
	const getOutputElement = <HTMLElement>(
		document.querySelector(`[data-modal = ${attribute}] .output`)
	);
	getOutputElement.style.display = 'grid';
	getOutputElement.style.height = 'fit-content';
	getOutputElement.style.placeItems = 'center';

	const getOutputButton = document.querySelector(
		`[data-button = ${attribute}]`,
	);

	getOutputButton?.addEventListener('click', () => {
		if (getInputElement.value.length === 0) return;

		getGradientTextResult(getInputElement.value, getOutputElement);
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
function getGradientTextResult(text: string, outputElement: HTMLElement): void {
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

	if (outputElement.childElementCount >= 1) {
		outputElement.innerHTML = '';
		createTextElement();
	} else {
		createTextElement();
	}
}

/**
 * @function getPicTextResult
 * @summary Sets the image and the text(if any) to the output element
 * @param attribute - The attribute name of the generator element
 * @param outputNode - The output element to display
 * @param text - The text to display on the image
 * @return {void} nothing
 */
function getPicTextResult(
	attribute: string,
	outputNode: HTMLElement,
	text: string
): void {
	let imageText: string = `########################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################`;

	const getImageButtonElement = <HTMLInputElement>(
		document.querySelector(`[data-button = ${attribute}]`)
	);

	getImageButtonElement.addEventListener('click', (): void => {
		generatorsFunction(attribute);
		copyCodeToClipboard(attribute, outputNode);
	});

	if (outputNode === null) {
		return;
	}
	outputNode.style.background = `url(${imageSRC}) center no-repeat`;
	outputNode.style.backgroundSize = 'var(--output-width)';
	outputNode.style.backgroundClip = 'text';
	outputNode.style.webkitBackgroundClip = 'text';
	outputNode.style.webkitTextFillColor = 'rgba(255, 255, 255, 0.1)';
	if (text !== '') {
		imageText = text;
	}
	outputNode.innerText = imageText;
}

/**
 * @function getImageFile
 * @summary Gets the image file and set the image to the imageSRC
 * @param attribute {string} The attribute name of the generator element
 * @return {void} nothing
 */
function getImageFile(attribute: string): void {
	const getImageEntryElement = <HTMLInputElement>(
		document.getElementById(`${attribute}-file`)
	);

	FilePond.create(getImageEntryElement, {
		imagePreviewMaxHeight: 200,

		onpreparefile: (fileItem, output): void => {
			// create a new image object
			const img = new Image();

			// set the image source to the output of the Image Transform plugin
			img.src = URL.createObjectURL(output);
			imageSRC = img.src;
			console.log(fileItem);
		},
	});
}

function downloadImage(attribute: string): void {
	const outputImage = <HTMLElement>document.querySelector('.output');
	const getDownloadJpg = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-jpg]`)
	);
	const getDownloadSvg = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-svg]`)
	);

	getDownloadJpg.addEventListener('click', () => {
		domtoimage.toJpeg(outputImage, { quality: 0.95 }).then(dataUrl => {
			const link = createDownloadLink('pic-text.jpeg', dataUrl);
			link.click();
		});
	});

	getDownloadSvg.addEventListener('click', () => {
		domtoimage.toSvg(outputImage).then(dataUrl => {
			const link = createDownloadLink('pic-text.svg', dataUrl);
			link.click();
		});
	});
}

function createDownloadLink(fileName: string, url: string) {
	const link = document.createElement('a');
	link.download = fileName;
	link.href = url;
	return link;
}

/**
 * @function countForText
 * @summary Counts the number of text in the input element
 * @param inputElement {HTMLInputElement} - The input element that holds the text
 * @return {void} Nothing
 */
function countForText(inputElement: HTMLInputElement): void {
	const countElement = <HTMLElement>document.querySelector('.count > span');
	inputElement.addEventListener('keydown', (): void => {
		countElement.innerText = `${inputElement.value.length + 1}`;
	});
}

/**
 * @function copyCodeToClipboard
 * @summary Allows you to copy to clipboard
 * @param {string} attribute - The attribute name of the generator element
 * @param {HTMLElement} outputElement - Element to copy the element from
 * @return {void} Nothing
 */
function copyCodeToClipboard(
	attribute: string,
	outputElement: HTMLElement
): void {
	const copyCodeButton = <HTMLElement>(
		document.querySelector(`[data-download=${attribute}-code]`)
	);
	copyCodeButton.addEventListener('click', (): void => {
		actOnGenerator();
	});

	function actOnGenerator() {
		switch (attribute) {
			case 'pic-text':
				let codeToCopy: string = `
      div {
        background-position: ${outputElement.style.backgroundPosition};
        background-size: ${outputElement.style.backgroundSize};
        background-repeat: ${outputElement.style.backgroundRepeat};
        background-clip: ${outputElement.style.backgroundClip};
        -webkit-background-clip: ${outputElement.style.webkitBackgroundClip};
        -webkit-text-fill-color: ${outputElement.style.webkitTextFillColor};
      }
    `;
				const permissionName = 'clipboard-write' as PermissionName;
				navigator.permissions.query({ name: permissionName }).then((result) => {
					if (result.state === 'granted' || result.state === 'prompt') {
						navigator.clipboard
							.writeText(codeToCopy)
							.then(() => {
								alert('copied to clipboard');
							})
							.catch(() => alert('error copying to clipboard'));
					}
				});
				break;
			case 'gradient-text':
				break;
		}
	}
}
